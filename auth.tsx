import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, Sparkles, Zap } from "lucide-react";

const searchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Zora AI" },
      { name: "description", content: "Log in or create your Zora AI account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/chat" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: username || email.split("@")[0] },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Welcome! Your account has been created.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
      navigate({ to: "/chat" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <Link to="/" className="flex flex-col items-center gap-4">
          <BrandLogo size={72} />
        </Link>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tight">
            {isSignup ? "Create account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignup
              ? "Join Zora AI and start getting instant answers"
              : "Log in to continue chatting with Zora AI"}
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full rounded-3xl border bg-card/40 backdrop-blur-sm p-6 space-y-5"
        >
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Pick a username"
                className="h-12 rounded-xl bg-input/50"
                autoComplete="username"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl bg-input/50"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignup ? "At least 6 characters" : "Your password"}
                className="h-12 rounded-xl bg-input/50 pr-10"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl text-base font-semibold primary-gradient border-0 brand-glow"
          >
            {isSignup ? <Sparkles className="mr-2" size={18} /> : <Zap className="mr-2" size={18} />}
            {loading ? "Please wait..." : isSignup ? "Sign up free" : "Log in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <Link
              to="/auth"
              search={{ mode: isSignup ? "login" : "signup" }}
              className="text-primary font-medium hover:underline"
            >
              {isSignup ? "Log in" : "Sign up"}
            </Link>
          </p>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Free forever. No credit card required.
        </p>
      </div>
    </main>
  );
}
