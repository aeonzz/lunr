import { createFileRoute } from "@tanstack/react-router";

import CreateWorkspaceForm from "@/components/create-workspace-form";

export const Route = createFileRoute("/join")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CreateWorkspaceForm />;
}
