import type { trpc } from "@/utils/trpc";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/sonner";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";

import "../index.css";

import { authClient } from "@/lib/auth-client";

export interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Lunr",
      },
      {
        name: "description",
        content: "A simple, fast project management app inspired by Linear.",
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

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  return (
    <>
      <HeadContent />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {isFetching ? <Loader /> : <Outlet />}
        <Toaster richColors />
      </ThemeProvider>
      {/* <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" /> */}
    </>
  );
}
