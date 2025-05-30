import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Cloud,
  Download,
  Share2,
  Upload,
} from "lucide-react";

import { userMenuMenuItems } from "@/config/nav";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubMenuTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

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
            <DropdownMenu>
              <DropdownMenuSubMenuTrigger
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
                <DropdownMenuItem>
                  <span>Current Workspace</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Create Workspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
