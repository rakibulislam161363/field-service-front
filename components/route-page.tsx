type RoutePageProps = {
  title: string;
  detail?: string;
};

export function RoutePage({ title, detail }: RoutePageProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col justify-center px-6 py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Field service
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {detail ? <p className="mt-3 text-muted-foreground">{detail}</p> : null}
    </main>
  );
}