import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import Workspaces from "./workspaces";

export default function UserMenu() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: session, isPending } = authClient.useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton className="[&>svg]:text-sidebar-muted w-fit font-medium [&>svg]:size-4">
                {isPending ? (
                  <div className="[&>svg]:text-sidebar-muted flex items-center gap-2 [&>svg]:size-4">
                    <Skeleton className="size-6 rounded-md" />
                    <Skeleton className="h-4 w-20" />
                    <ChevronDown className="ml-auto font-semibold" />
                  </div>
                ) : (
                  <>
                    <Avatar className="size-6 rounded-md">
                      {session?.user?.image ? (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name ?? ""}
                        />
                      ) : (
                        <AvatarFallback className="rounded-md text-xs">
                          {session?.user?.name?.slice(0, 2).toUpperCase() ??
                            "??"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="text-xs-plus max-w-[90px] truncate leading-none font-semibold">
                      {session?.user.name}
                    </span>
                    <ChevronDown className="ml-auto font-semibold" />
                  </>
                )}
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent className="w-[232px]" align="start">
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘?</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                render={
                  <DropdownMenuItem className="data-[popup-open]:[&>span>svg]:text-foreground">
                    Switch workspace
                    <span className="ml-auto flex gap-1">
                      <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                      <ChevronRight />
                    </span>
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuContent className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>
                    {session?.user.email}
                  </DropdownMenuGroupLabel>
                  <Workspaces />
                  <DropdownMenuItem>
                    <Avatar className="size-5 rounded-md">
                      {session?.user?.image ? (
                        <AvatarImage
                          src={session.user.image}
                          alt={session.user.name ?? ""}
                        />
                      ) : (
                        <AvatarFallback className="rounded-md text-xs">
                          {session?.user?.name?.slice(0, 2).toUpperCase() ??
                            "??"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="truncate font-semibold">
                      {session?.user.name}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    render={<Link to="/join">Create Workspace</Link>}
                  />
                  <DropdownMenuItem>
                    <span>Add an account...</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isLoading}
              closeOnClick={false}
              onClick={async () =>
                authClient.signOut({
                  fetchOptions: {
                    onRequest: () => {
                      setIsLoading(true);
                    },
                    onSuccess: () => {
                      navigate({
                        to: "/login",
                      });
                    },
                  },
                })
              }
            >
              Log out
              <DropdownMenuShortcut>⌘⇧L</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
