import { createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_app/")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session.data === null) {
      throw redirect({
        to: "/login",
      });
    }
    throw redirect({
      to: "/$userName/inbox",
      params: {
        userName: session.data.user.name,
      },
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return null;
}
