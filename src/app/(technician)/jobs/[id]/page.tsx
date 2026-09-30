import { RoutePage } from "../../../../../components/route-page";

export default async function TechnicianJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RoutePage title="Job details" detail={`Job ${id}`} />;
}