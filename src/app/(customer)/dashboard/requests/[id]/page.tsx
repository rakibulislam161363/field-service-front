import { RoutePage } from "../../../../../../components/route-page";

export default async function CustomerRequestDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RoutePage title="Request details" detail={`Request ${id}`} />;
}