import { Bot } from 'lucide-react';
import { LayoutDashboard } from 'lucide-react';
import { Scan } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
  const basePath = "/";
  
  export const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      route: basePath,
    },
    {
      title: "Chatbot",
      icon: Bot,
      route: '/about',
    },
    {
      title: "ScanPlant",
      icon: Scan,
      route: "drafts",
    },
    {
      title: "New User",
      icon: SquarePlus,
      route: "drafts",
    },
    
  ];
  