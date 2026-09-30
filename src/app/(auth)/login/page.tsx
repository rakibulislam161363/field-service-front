"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  User,
  Wrench,
  Loader2,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type DemoRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

interface DemoAccount {
  role: DemoRole;
  label: string;
  email: string;
  password: string;
  icon: React.ReactNode;
}

const demoAccounts: DemoAccount[] = [
  {
    role: "CUSTOMER",
    label: "Customer",
    email: "customer@example.com",
    password: "123456",
    icon: <User className="h-5 w-5" />,
  },
  {
    role: "TECHNICIAN",
    label: "Technician",
    email: "technician@example.com",
    password: "123456",
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    role: "ADMIN",
    label: "Admin",
    email: "admin@example.com",
    password: "123456",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<DemoRole | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Backend login API ekhane connect korbo
      console.log({
        email,
        password,
      });

      // Temporary
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (account: DemoAccount) => {
    try {
      setDemoLoading(account.role);

      // Backend demo account login API ekhane connect korbo
      console.log({
        email: account.email,
        password: account.password,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (account.role === "CUSTOMER") {
        router.push("/dashboard");
      }

      if (account.role === "TECHNICIAN") {
        router.push("/technician");
      }

      if (account.role === "ADMIN") {
        router.push("/admin");
      }
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LockKeyhole className="h-6 w-6" />
            </div>

            <div>
              <CardTitle className="text-2xl">
                Welcome Back 👋
              </CardTitle>

              <CardDescription className="mt-2">
                Login to your Field Service account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator />

              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            {/* Demo Login */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-semibold">🚀 Quick Demo Login</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Login instantly as a different role
                </p>
              </div>

              <div className="grid gap-3">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.role}
                    type="button"
                    variant="outline"
                    className="h-auto justify-start gap-3 px-4 py-3"
                    disabled={demoLoading !== null}
                    onClick={() => handleDemoLogin(account)}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      {demoLoading === account.role ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        account.icon
                      )}
                    </div>

                    <div className="text-left">
                      <p className="font-medium">
                        {account.label}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Demo Login
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="font-medium text-primary hover:underline"
              >
                Create account
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}