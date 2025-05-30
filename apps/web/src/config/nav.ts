import {
  FolderKanban,
  Inbox,
  LayoutGrid,
  ListTodo,
  MoreHorizontal,
  Users,
} from "lucide-react";
import type { FileRoutesByTo } from "../routeTree.gen";

type RoutePath = keyof FileRoutesByTo;

interface NavItem {
  title: string;
  url: RoutePath;
  icon: React.ComponentType;
}

export const sidebarMenuItems: NavItem[] = [
  {
    title: "Inbox",
    url: "/$userName/inbox",
    icon: Inbox,
  },
  {
    title: "My Issues",
    url: "/$userName/issues",
    icon: ListTodo,
  },
];

export const sidebarTeamItems = [
  {
    title: "Issues",
    url: "/#",
    icon: Inbox,
  },
  {
    title: "Projects",
    url: "/#",
    icon: ListTodo,
  },
  {
    title: "Views",
    url: "/#",
    icon: LayoutGrid,
  },
];

export const sidebarWorkspaceItems = [
  {
    title: "Projects",
    url: "/#",
    icon: FolderKanban,
  },
  {
    title: "Views",
    url: "/#",
    icon: LayoutGrid,
  },
  {
    title: "More",
    url: "/#",
    icon: MoreHorizontal,
  },
];

export const userMenuMenuItems = [
  {
    title: "Settings",
    url: "/#",
    shortcut: "⌘,",
  },
  {
    title: "Switch workspace",
    url: "/#",
    shortcut: "⌘W",
  },
  {
    title: "Log out",
    url: "/#",
    shortcut: "⌘⇧L",
  },
];
