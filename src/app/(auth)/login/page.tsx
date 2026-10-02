"use client";

import { useForm } from "@tanstack/react-form";

import { useState } from "react";
import { Check, Eye, EyeClosed, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "@/src/components/ui/toast";
import { Input } from "@/src/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/src/components/ui/field";
import { Spinner } from "@/src/components/ui/spinner";
import { useLogin } from "@/src/hooks";
import GoogleLoginComponent from "@/src/modules/google-login/googleLogin";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/src/validation";

const demoAccounts = [
  {
    role: "Admin",
    email: "admin@demo.fieldservice.test",
    password: "DemoPass123!",
  },
  {
    role: "Technician",
    email: "technician@demo.fieldservice.test",
    password: "DemoPass123!",
  },
  {
    role: "Customer",
    email: "rakibulislam161363@gmail.com",
    password: "Rakib@@@1613639100",
  },
] as const;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: () => {
          toast.add({
            title: "Login Success",
            description: "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          const apiError = err as Error & {
            data?: { message?: string };
            statusMessage?: string;
          };

          toast.add({
            title: "Login Failed",
            description:
              apiError.data?.message ||
              apiError.statusMessage ||
              apiError.message ||
              "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <main className="grid min-h-svh bg-[#f2f5f0] lg:grid-cols-[minmax(360px,0.92fr)_minmax(0,1.08fr)]">
      <aside className="relative flex min-h-75 flex-col justify-between overflow-hidden bg-[#163f3b] px-6 py-5 text-[#f8faf4] sm:px-10 sm:py-9 lg:min-h-svh lg:px-14 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <header className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[#d7f27d] text-[#163f3b]">
            <Wrench aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">FIELD SERVICE</p>
            <p className="text-xs text-white/65">Customer workspace</p>
          </div>
        </header>

        <div className="relative z-10 max-w-xl py-6 sm:py-8 lg:py-0">
          <p className="text-xs font-semibold text-[#d7f27d]">
            YOUR SERVICE, IN ONE PLACE
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
            Good service starts with a clear view.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/75">
            Keep track of service requests, appointments, and payments from one
            simple workspace.
          </p>
          <div className="mt-7 hidden flex-wrap gap-x-5 gap-y-3 text-sm text-white/85 sm:flex">
            {["Service requests", "Appointments", "Payments"].map((item) => (
              <span className="flex items-center gap-2" key={item}>
                <Check aria-hidden="true" className="size-4 text-[#d7f27d]" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <footer className="relative z-10 flex items-center gap-3 text-sm text-white/65">
          <span aria-hidden="true" className="h-1 w-8 rounded-full bg-[#f18b65]" />
          Built around the work that matters.
        </footer>
      </aside>

      <section className="flex min-h-140 items-center justify-center px-4 py-10 sm:px-8 lg:min-h-svh lg:px-12">
        <div className="flex w-full max-w-110 flex-col gap-5 rounded-lg border border-[#dce4dc] bg-white p-6 shadow-[0_18px_55px_rgba(21,50,45,0.08)] sm:p-9">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit">
            {loginPending ? (
              <>
                <Spinner /> Logging...
              </>
            ) : (
              "LOGIN"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponent />

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>

      <div className="space-y-3 border-t border-[#dce4dc] pt-4">
        <p className="text-center text-xs font-medium text-muted-foreground">
          Demo accounts
        </p>
        <div className="grid grid-cols-3 gap-2">
          {demoAccounts.map((account) => (
            <button
              className="min-w-0 rounded-md border border-[#dce4dc] bg-white px-2 py-2.5 text-sm font-medium text-[#163f3b] transition-colors hover:border-[#163f3b] hover:bg-[#f2f5f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#163f3b] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loginPending}
              key={account.role}
              onClick={() => {
                form.setFieldValue("email", account.email);
                form.setFieldValue("password", account.password);
              }}
              type="button"
            >
              {account.role}
            </button>
          ))}
        </div>
      </div>
        </div>
      </section>
    </main>
  );
}
