import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createConversation,
  deleteConversation,
  getConversation,
  listConversations,
} from "@/lib/chat.functions";
import { supabase } from "@/integrations/supabase/client";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Plus,
  Send,
  Trash2,
  LogOut,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/chat/$conversationId")({
  ssr: false,
  loader: async ({ params }) => {
    const data = await getConversation({ data: { id: params.conversationId } });
    if (!data) throw new Error("Conversation not found");
    return data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.conversation?.title ?? "Chat"} — Zora AI` },
      { name: "description", content: "Chat with Zora AI." },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <p className="text-lg mb-3">Error: {error.message}</p>
        <Button asChild><Link to="/chat">Go back</Link></Button>
      </div>
    </div>
  ),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Explain quantum entanglement simply",
  "Write a short poem about the night",
  "What are the best TypeScript practices?",
  "Suggest a 30-minute workout for beginners",
];

function ChatPage() {
  const { conversation, messages: initialMessages } = Route.useLoaderData();
  const { conversationId } = Route.useParams();
  const router = useRouter();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const uiInitialMessages: UIMessage[] = initialMessages.map((m: { id: string; role: string; content: unknown; created_at: string }) => {
    // stored content is either the full UIMessage or a plain text fallback
    const c = m.content as unknown;
    if (c && typeof c === "object" && "parts" in (c as Record<string, unknown>)) {
      return c as UIMessage;
    }
    return {
      id: m.id,
      role: m.role as "user" | "assistant",
      parts: [{ type: "text", text: typeof c === "string" ? c : JSON.stringify(c) }],
    } as UIMessage;
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      const { data: prof } = await supabase
        .from("profiles")
        .select("username, email")
        .eq("id", data.user!.id)
        .maybeSingle();
      return prof ?? { username: data.user?.email?.split("@")[0] ?? "you", email: data.user?.email ?? "" };
    },
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => listConversations(),
    initialData: [],
  });

  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: uiInitialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (url, init) => {
        const { data } = await supabase.auth.getSession();
        const headers = new Headers(init?.headers);
        if (data.session?.access_token) {
          headers.set("Authorization", `Bearer ${data.session.access_token}`);
        }
        return fetch(url, { ...init, headers });
      },
      prepareSendMessagesRequest: ({ messages, body }) => ({
        body: { ...body, messages, conversationId },
      }),
    }),
    onError: (err) => toast.error(err.message || "Something went wrong"),
    onFinish: () => {
      qc.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [conversationId, status]);

  const isLoading = status === "submitted" || status === "streaming";

  async function handleSend(text?: string) {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;
    setInput("");
    await sendMessage({ text: value });
  }

  async function handleNewChat() {
    const convo = await createConversation({ data: {} });
    qc.invalidateQueries({ queryKey: ["conversations"] });
    setSidebarOpen(false);
    navigate({ to: "/chat/$conversationId", params: { conversationId: convo.id } });
  }

  async function handleDelete(id: string) {
    await deleteConversation({ data: { id } });
    qc.invalidateQueries({ queryKey: ["conversations"] });
    if (id === conversationId) {
      const rest = conversations.filter((c) => c.id !== id);
      if (rest[0]) {
        navigate({ to: "/chat/$conversationId", params: { conversationId: rest[0].id } });
      } else {
        const convo = await createConversation({ data: {} });
        navigate({ to: "/chat/$conversationId", params: { conversationId: convo.id } });
      }
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    qc.clear();
    router.invalidate();
    navigate({ to: "/" });
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/50 bg-background/60 backdrop-blur-md px-3 py-3">
        <div className="flex items-center gap-2">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-sidebar text-sidebar-foreground border-sidebar-border">
              <SheetHeader className="p-4 border-b border-sidebar-border">
                <SheetTitle className="flex items-center gap-3">
                  <BrandLogo size={36} glow={false} />
                  <span className="text-lg font-bold">Zora AI</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-[calc(100vh-72px)]">
                <div className="p-4">
                  <Button
                    onClick={handleNewChat}
                    className="w-full h-12 rounded-2xl primary-gradient border-0 brand-glow font-medium"
                  >
                    <Plus className="mr-2" size={18} />
                    New chat
                  </Button>
                </div>
                <div className="px-4 pb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Conversations
                </div>
                <ScrollArea className="flex-1 px-2">
                  <div className="space-y-1 pb-4">
                    {conversations.map((c) => (
                      <div
                        key={c.id}
                        className={`group relative flex items-center rounded-xl transition-colors ${
                          c.id === conversationId
                            ? "bg-sidebar-accent border border-primary/40"
                            : "hover:bg-sidebar-accent/60"
                        }`}
                      >
                        <button
                          onClick={() => {
                            setSidebarOpen(false);
                            navigate({ to: "/chat/$conversationId", params: { conversationId: c.id } });
                          }}
                          className="flex flex-1 items-center gap-2 px-3 py-2.5 text-left text-sm truncate"
                        >
                          <MessageSquare size={16} className="shrink-0 text-muted-foreground" />
                          <span className="truncate">{c.title}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(c.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {conversations.length === 0 && (
                      <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                        No conversations yet
                      </p>
                    )}
                  </div>
                </ScrollArea>
                <div className="border-t border-sidebar-border p-3">
                  <div className="flex items-center gap-3 p-2">
                    <div className="h-9 w-9 rounded-full primary-gradient flex items-center justify-center text-sm font-bold uppercase">
                      {profile?.username?.[0] ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{profile?.username}</div>
                      <div className="text-xs text-muted-foreground truncate">{profile?.email}</div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                      <LogOut size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <BrandLogo size={32} glow={false} />
            <span className="font-semibold truncate max-w-[160px]">{conversation.title}</span>
          </div>
        </div>
        <div />
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6">
          {isEmpty ? (
            <div className="flex flex-col items-center gap-6 pt-8">
              <BrandLogo size={96} />
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-black">Hi, {profile?.username ?? "there"}</h1>
                <p className="text-muted-foreground">What's on your mind? Ask anything.</p>
              </div>
              <div className="w-full space-y-2 pt-4">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="w-full text-left rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-4 py-3.5 text-sm hover:bg-card/80 hover:border-primary/40 transition"
                  >
                    <span className="text-muted-foreground mr-2">›</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    {isUser ? (
                      <div className="max-w-[85%] rounded-3xl rounded-br-md primary-gradient text-primary-foreground px-4 py-3 shadow-lg">
                        <p className="whitespace-pre-wrap break-words text-[15px]">{text}</p>
                      </div>
                    ) : (
                      <div className="max-w-[90%] flex gap-3">
                        <BrandLogo size={32} glow={false} className="shrink-0 mt-1" />
                        <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-primary">
                          <ReactMarkdown>{text}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {status === "submitted" && (
                <div className="flex gap-3">
                  <BrandLogo size={32} glow={false} className="shrink-0 mt-1" />
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 rounded-full bg-primary animate-bounce"></span>
                  </div>
                </div>
              )}
              {error && (
                <p className="text-sm text-destructive text-center">{error.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-border/50 bg-background/60 backdrop-blur-md px-4 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative flex items-end gap-2 rounded-3xl border border-border bg-card/60 backdrop-blur-sm px-4 py-2.5 focus-within:border-primary/60 transition">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              placeholder="Ask Zora anything..."
              className="flex-1 resize-none bg-transparent text-[15px] outline-none placeholder:text-muted-foreground max-h-40 py-1.5"
              style={{ minHeight: "24px" }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="shrink-0 h-9 w-9 rounded-full flex items-center justify-center primary-gradient text-primary-foreground disabled:opacity-40 disabled:bg-none disabled:bg-muted transition brand-glow disabled:shadow-none"
              aria-label="Send"
            >
              {isLoading ? (
                <Sparkles size={16} className="animate-pulse" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Zora can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  );
}
