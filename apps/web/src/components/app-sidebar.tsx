import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, SquarePen } from "lucide-react";

import {
  sidebarMenuItems,
  sidebarTeamItems,
  sidebarWorkspaceItems,
} from "@/config/nav";
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
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

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
              {sidebarMenuItems.map((item) => (
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
        </SidebarGroup>
        <Collapsible defaultOpen>
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
        <Collapsible defaultOpen>
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
