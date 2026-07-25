import { createFileRoute } from "@tanstack/react-router";
import {
  streamText,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { createClient } from "@supabase/supabase-js";
import { createLovableAiGateway } from "@/lib/ai-gateway.server";
import type { Database } from "@/integrations/supabase/types";

type Body = { messages: UIMessage[]; conversationId: string };

const SYSTEM_PROMPT = `You are a helpful AI assistant called "Zora".
- Answer any question clearly, kindly, and usefully.
- Reply in the same language the user writes in (Kurdish, English, Arabic, etc.).
- If the user writes in Kurdish, respond in Kurdish Sorani.
- Use markdown for code blocks.
- Be accurate and concise, without going off-topic.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return new Response("Unauthorized", { status: 401 });
        }
        const token = authHeader.slice(7);

        const supabase = createClient<Database>(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          {
            global: { headers: { Authorization: `Bearer ${token}` } },
            auth: { persistSession: false, autoRefreshToken: false },
          },
        );

        const { data: userData, error: userErr } = await supabase.auth.getUser(token);
        if (userErr || !userData?.user) {
          return new Response("Unauthorized", { status: 401 });
        }
        const userId = userData.user.id;

        const body = (await request.json()) as Body;
        const { messages, conversationId } = body;
        if (!Array.isArray(messages) || !conversationId) {
          return new Response("Bad request", { status: 400 });
        }

        // Verify conversation ownership
        const { data: convo } = await supabase
          .from("conversations")
          .select("id")
          .eq("id", conversationId)
          .eq("user_id", userId)
          .maybeSingle();
        if (!convo) return new Response("Not found", { status: 404 });

        // Persist the latest user message (last in array)
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.role === "user") {
          await supabase.from("messages").insert({
            conversation_id: conversationId,
            user_id: userId,
            role: "user",
            content: lastMsg as unknown as Database["public"]["Tables"]["messages"]["Insert"]["content"],
          });

          // Auto-title from first user message if title is default
          const firstText = lastMsg.parts
            ?.map((p) => (p.type === "text" ? p.text : ""))
            .join(" ")
            .trim();
          if (firstText) {
            const { count } = await supabase
              .from("messages")
              .select("id", { count: "exact", head: true })
              .eq("conversation_id", conversationId);
            if ((count ?? 0) <= 1) {
              const title = firstText.slice(0, 60);
              await supabase
                .from("conversations")
                .update({ title, updated_at: new Date().toISOString() })
                .eq("id", conversationId);
            } else {
              await supabase
                .from("conversations")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", conversationId);
            }
          }
        }

        const gateway = createLovableAiGateway();
        const model = gateway("google/gemini-3.6-flash");

        try {
          const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            onFinish: async ({ messages: finalMessages }) => {
              const assistant = finalMessages[finalMessages.length - 1];
              if (assistant?.role === "assistant") {
                await supabase.from("messages").insert({
                  conversation_id: conversationId,
                  user_id: userId,
                  role: "assistant",
                  content: assistant as unknown as Database["public"]["Tables"]["messages"]["Insert"]["content"],
                });
              }
            },
          });
        } catch (err) {
          console.error("[chat] streamText error", err);
          const msg = err instanceof Error ? err.message : "AI error";
          return new Response(msg, { status: 500 });
        }
      },
    },
  },
});
