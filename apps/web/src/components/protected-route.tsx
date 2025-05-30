import { useEffect } from "react";
import { Route, useNavigate } from "@tanstack/react-router";

import { authClient } from "../lib/auth-client";
import Loader from "./loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate({
        to: "/login",
      });
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return <Loader />;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
