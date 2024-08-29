/* eslint-disable react/prop-types */
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable";
import { Separator } from "../components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import useRouteChange from "../hooks/useRouteChange";
import useScreenSize from "../hooks/useScreenSize";
import { cn } from "../lib/utils";
import Sidebar from "./components/sidebar";
import { UserNav } from "./components/user-nav";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import logo from '../../public/logo.png'
export default function Layout({ children }) {
  const isMediumOrSmaller = useScreenSize();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useRouteChange(() => {
    setIsMobileNavOpen(false);
  });

  return (
    <main>
      <ResizablePanelGroup direction="horizontal" className="min-h-screen items-stretch">
        <ResizablePanel
          defaultSize={15}
          collapsedSize={4}
          collapsible
          minSize={15}
          maxSize={15}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            "hidden lg:block bg-[white] transition-all duration-300 ease-in-out",
            isCollapsed ? "min-w-[50px]" : "min-w-[200px]"
          )}
        >
          <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? "h-[52px]" : "px-2")}>
          <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? "h-[52px]" : "px-2")}>
      <img 
        src={logo} 
        alt="Logo"
        className={cn(
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-8 h-8" : "w-32 h-8"
        )}
      />
    </div>
          </div>
          <Separator  />
          <Sidebar isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle className="hidden lg:flex" withHandle />

        <ResizablePanel defaultSize={!isMediumOrSmaller ? 85 : 100}>
          <div className="flex items-center justify-between px-4 py-2 lg:justify-end bg-[white] shadow-sm">
            <Button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              variant="ghost"
              className="size-9 p-1 md:flex lg:hidden text-black hover:bg-[white]"
            >
              <Menu className="size-6" />
            </Button>

            <div className="flex gap-2">
              <UserNav />
            </div> 
          </div>
          <Separator />
          <div className="p-4 bg-gray-50 min-h-[calc(100vh-60px)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent className="px-2 py-3 bg-[white]" side="left">
          <SheetHeader>
            <SheetTitle className="text-left text-black">Studio Admin</SheetTitle>
          </SheetHeader>
          <Sidebar isMobileSidebar isCollapsed={false} />
        </SheetContent>
      </Sheet>
    </main>
  );
}