import React from "react";

import type { auth } from "../../../../server/src/lib/auth";
import type { DropdownMenuItem } from "../ui/dropdown-menu";

interface WorkspacesProps
  extends React.ComponentProps<typeof DropdownMenuItem> {
}

export default function Workspaces({ }: WorkspacesProps) {
  return <div>yawa</div>;
}
