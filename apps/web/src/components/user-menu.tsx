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
  // const { data: session, isPending } = authClient.useSession();

  // if (isPending) {
  //   return <Skeleton className="h-9 w-24" />;
  // }

  // if (!session) {
  //   return (
  //     <Button variant="outline" asChild>
  //       <Link to="/login">Sign In</Link>
  //     </Button>
  //   );
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton className="[&>svg]:text-sidebar-muted w-fit font-medium [&>svg]:size-4">
                <Avatar className="size-6 rounded-md">
                  <AvatarImage
                    src="https://github.com/aeonzz.png"
                    alt="@aeonz"
                  />
                  <AvatarFallback>AE</AvatarFallback>
                </Avatar>
                Aeonz
                <ChevronDown className="ml-auto font-semibold" />
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
