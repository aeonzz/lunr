import { Link, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UserMenu() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button variant="outline" asChild>
        <Link to="/login">Sign In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">{session.user.name}</Button>}
      />
      <DropdownMenuContent className="bg-card">
        <DropdownMenuGroup>
          <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{session.user.email}</DropdownMenuItem>
          <DropdownMenuItem
            render={
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        navigate({
                          to: "/",
                        });
                      },
                    },
                  });
                }}
              >
                Sign Out
              </Button>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
