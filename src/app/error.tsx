"use client";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground" role="alert">
        The page could not be displayed. {error.digest ? `Reference: ${error.digest}` : null}
      </p>
      <button
        className="mt-6 w-fit rounded-md bg-primary px-4 py-2 text-primary-foreground"
        onClick={retry}
        type="button"
      >
        Try again
      </button>
    </main>
  );
}