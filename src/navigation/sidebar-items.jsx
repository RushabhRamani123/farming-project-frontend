import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
    PanelsTopLeft,
  } from "lucide-react";
  
  const basePath = "/";
  
  export const sidebarItems = [
    {
      title: "Dashboard",
      icon: PanelsTopLeft,
      route: basePath,
    },
    {
      title: "Inbox",
      icon: Inbox,
      route: '/about',
    },
    {
      title: "Drafts",
      icon: File,
      route: "drafts",
    },
    {
      title: "Sent",
      icon: Send,
      route: "sent",
    },
    {
      title: "Junk",
      icon: ArchiveX,
      route: "junk",
    },
    {
      title: "Trash",
      icon: Trash2,
      route: "trash",
    },
    {
      title: "Archive",
      icon: Archive,
      route: "archive",
    },
    {
      title: "Social",
      icon: Users2,
      route: "social",
    },
    {
      title: "Updates",
      icon: AlertCircle,
      route: "updates",
    },
    {
      title: "Forums",
      icon: MessagesSquare,
      route: "forums",
    },
    {
      title: "Shopping",
      icon: ShoppingCart,
      route: "shopping",
    },
    {
      title: "Promotions",
      icon: Archive,
      route: "promotions",
    },
  ];
  