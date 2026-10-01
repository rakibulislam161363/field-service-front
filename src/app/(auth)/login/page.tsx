"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Eye, EyeClosed, LoaderCircle, Wrench } from "lucide-react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getMe, googleOAuth, userLogin } from "@/src/api";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const finishLogin = async () => {
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: getMe,
    });
    router.replace("/");
    router.refresh();
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await userLogin({ email, password });
      await finishLogin();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Login failed. Check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (response: CredentialResponse) => {
    if (!response.credential) {
      setError("Google sign-in could not be completed. Please try again.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await googleOAuth({ idToken: response.credential });
      await finishLogin();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Google sign-in failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-primary">FixItNow</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to manage your field service account.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter the email and password linked to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="pr-11"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? (
                      <EyeClosed className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>

            {googleClientId && (
              <>
                <div className="flex items-center gap-3">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">or continue with</span>
                  <Separator className="flex-1" />
                </div>
                <div className="flex justify-center">
                  <GoogleOAuthProvider clientId={googleClientId}>
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => setError("Google sign-in failed. Please try again.")}
                      useOneTap={false}
                    />
                  </GoogleOAuthProvider>
                </div>
              </>
            )}

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Get started
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}