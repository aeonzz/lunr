import { createFileRoute, Outlet } from "@tanstack/react-router";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/protected-route";

export const Route = createFileRoute("/_app")({
  component: () => {
    const defaultOpen =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar_state="))
        ?.split("=")[1] === "true";

    return <RouteComponent defaultOpen={defaultOpen} />;
  },
});

function RouteComponent({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "14rem",
            "--sidebar-width-mobile": "16rem",
          } as React.CSSProperties
        }
        defaultOpen={defaultOpen}
      >
        <AppSidebar />
        <SidebarInset>
          <main>
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
