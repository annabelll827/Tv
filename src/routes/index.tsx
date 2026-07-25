import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/chat" });
  },
  head: () => ({
    meta: [
      { title: "Zora AI — Your Pocket AI Assistant" },
      { name: "description", content: "Ask anything and get instant answers. Zora AI speaks Kurdish, English, and every language you throw at it." },
      { property: "og:title", content: "Zora AI" },
      { property: "og:description", content: "Your intelligent assistant, right in your pocket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        <BrandLogo size={104} />
        <div className="space-y-3">
          <h1 className="text-5xl font-black tracking-tight">Zora AI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your personal AI assistant.
            <br />
            Ask anything, get instant answers.
          </p>
        </div>
        <div className="w-full space-y-3 pt-4">
          <Button asChild variant="secondary" size="lg" className="w-full h-14 rounded-2xl text-base font-medium">
            <Link to="/auth" search={{ mode: "login" }}>Log in</Link>
          </Button>
          <Button asChild size="lg" className="w-full h-14 rounded-2xl text-base font-semibold primary-gradient border-0 brand-glow">
            <Link to="/auth" search={{ mode: "signup" }}>Sign up free</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground pt-2">
          Powered by Lovable AI — no API key required
        </p>
      </div>
    </main>
  );
}
