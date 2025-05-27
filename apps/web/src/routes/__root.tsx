import type { trpc } from "@/utils/trpc";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: () => {
    const defaultOpen =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar_state="))
        ?.split("=")[1] === "true";

    return <RootComponent defaultOpen={defaultOpen} />;
  },
  head: () => ({
    meta: [
      {
        title: "My App",
      },
      {
        name: "description",
        content: "My App is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent({ defaultOpen }: { defaultOpen: boolean }) {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
              {isFetching ? <Loader /> : <Outlet />}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
      <HeadContent />
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="grid h-svh grid-rows-[auto_1fr]">
          <Header />
          {isFetching ? <Loader /> : <Outlet />}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" /> */}
    </>
  );
}
