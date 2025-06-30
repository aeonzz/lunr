import { createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import CreateWorkspaceForm from "@/components/create-workspace-form";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session.data === null) {
      throw redirect({
        to: "/login",
      });
    }
    if (session.data.user.ownedWorkspaces.length > 0) {
      throw redirect({
        to: "/$workspace/inbox",
        params: {
          workspace: session.data.user.id,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();
  
  if (isPending || !session) return null

  return <CreateWorkspaceForm userId={session.user.id} />;
}
