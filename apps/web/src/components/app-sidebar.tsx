import * as React from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, SquarePen } from "lucide-react";

import {
  sidebarMenuItems,
  sidebarTeamItems,
  sidebarWorkspaceItems,
} from "@/config/nav";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import UserMenu from "./user-menu";

export function AppSidebar() {
  const { data: session } = authClient.useSession();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  const [sidebarState, setSidebarState] = React.useState(() => {
    try {
      const saved = localStorage.getItem("userSettings");
      return saved
        ? JSON.parse(saved)
        : { workspaceOpen: true, teamsOpen: true };
    } catch {
      return { workspaceOpen: true, teamsOpen: true };
    }
  });

  React.useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(sidebarState));
  }, [sidebarState]);

  const { workspaceOpen, teamsOpen } = sidebarState;
  const setWorkspaceOpen = React.useCallback((open: boolean) => {
    setSidebarState((prev: { workspaceOpen: boolean; teamsOpen: boolean }) => ({
      ...prev,
      workspaceOpen: open,
    }));
  }, []);
  const setTeamsOpen = React.useCallback((open: boolean) => {
    setSidebarState((prev: { workspaceOpen: boolean; teamsOpen: boolean }) => ({
      ...prev,
      teamsOpen: open,
    }));
  }, []);

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex-row">
        <UserMenu />
        <Button className="size-8 rounded-lg" variant="secondary" size="icon">
          <SquarePen />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => {
                const userName = session?.user.name ?? "me";
                const itemUrl = item.url.replace("$userName", userName);
                const decodedPathname = decodeURIComponent(pathname);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={decodedPathname === itemUrl}
                      size="sm"
                    >
                      <Link to={item.url} params={{ userName }}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible open={workspaceOpen} onOpenChange={setWorkspaceOpen}>
          <SidebarGroup>
            <CollapsibleTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sidebar-muted hover:text-sidebar-muted justify-start text-xs [&]:h-auto [&]:py-1 data-[panel-open]:[&>svg]:rotate-0"
                >
                  Workspace
                  <ChevronDown className="size-3 -rotate-90 transition-all ease-out" />
                </Button>
              }
            />
            <CollapsibleContent>
              <SidebarGroupContent className="mt-[2px] transition-[opacity] duration-300 ease-out group-data-[closed]:opacity-0">
                <SidebarMenu>
                  {sidebarWorkspaceItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url === pathname}
                        size="sm"
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible open={teamsOpen} onOpenChange={setTeamsOpen}>
          <SidebarGroup>
            <CollapsibleTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sidebar-muted hover:text-sidebar-muted justify-start text-xs [&]:h-auto [&]:py-1 data-[panel-open]:[&>svg]:rotate-0"
                >
                  Your Teams
                  <ChevronDown className="size-3 -rotate-90 transition-all ease-out" />
                </Button>
              }
            />
            <CollapsibleContent>
              <SidebarGroupContent className="mt-[2px] transition-[opacity] duration-300 ease-out group-data-[closed]:opacity-0">
                <SidebarMenu>
                  {sidebarTeamItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.url === pathname}
                        size="sm"
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
