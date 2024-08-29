import {
   
    PanelsTopLeft,
  } from "lucide-react";
  import { Bot } from 'lucide-react';
  import { Scan } from 'lucide-react';
  import { Tractor } from 'lucide-react';
  import { SendHorizontal } from 'lucide-react';
  import { Sparkle } from 'lucide-react';
  const basePath = "/";
  
  export const sidebarItems = [
    {
      title: "Dashboard",
      icon: PanelsTopLeft,
      route: basePath,
    },
    {
      title: "Chatbot",
      icon: Bot,
      route: '/bot',
    },
    {
      title: "Scan",
      icon: Scan,
      route: "/diseases",
    },
    {
      title: "Yield",
      icon: Tractor,
      route: "/yield",
    },
    {
      title: "Fertilizers",
      icon: SendHorizontal,
      route: "/fertilizers",
    },
    {
      title: "Crop Prediction",
      icon: Sparkle,
      route: "/prediction",
    },

  ];
  