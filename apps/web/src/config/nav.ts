import { Inbox, ListTodo, FolderKanban, LayoutGrid, MoreHorizontal, Users } from "lucide-react";

export const sidebarMenuItems = [
  {
    title: "Inbox",
    url: "/",
    icon: Inbox,
  },
  {
    title: "My Issues",
    url: "/ai",
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
]

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
]