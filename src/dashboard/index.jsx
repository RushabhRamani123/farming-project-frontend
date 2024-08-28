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
const InboxComponent = () => <div>Inbox Component</div>;
const DraftsComponent = () => <div>Drafts Component</div>;
const SentComponent = () => <div>Sent Component</div>;
const JunkComponent = () => <div>Junk Component</div>;
const TrashComponent = () => <div>Trash Component</div>;
const ArchiveComponent = () => <div>Archive Component</div>;
const SocialComponent = () => <div>Social Component</div>;
const UpdatesComponent = () => <div>Updates Component</div>;
const ForumsComponent = () => <div>Forums Component</div>;
const ShoppingComponent = () => <div>Shopping Component</div>;
const PromotionsComponent = () => <div>Promotions Component</div>;
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
          defaultSize={18}
          collapsedSize={4}
          collapsible
          minSize={18}
          maxSize={18}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn("hidden lg:block", isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >
          <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? "h-[52px]" : "px-2")}>
          Logo
          </div>
          <Separator />
          <Sidebar isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizableHandle className="hidden lg:flex" withHandle />

        <ResizablePanel defaultSize={!isMediumOrSmaller ? 82 : 100}>
          <div className="flex items-center justify-between px-4 py-2 lg:justify-end">
            <Button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              variant="default"
              className="size-9 p-1 md:flex lg:hidden"
            >
              <Menu className="size-6" />
            </Button>

            <div className="flex gap-2">
              <UserNav />
            </div> 
          </div>
          <Separator />
          <div className="p-4">
          <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<InboxComponent />} />
      <Route path="/drafts" element={<DraftsComponent />} />
      <Route path="/sent" element={<SentComponent />} />
      <Route path="/junk" element={<JunkComponent />} />
      <Route path="/trash" element={<TrashComponent />} />
      <Route path="/archive" element={<ArchiveComponent />} />
      <Route path="/social" element={<SocialComponent />} />
      <Route path="/updates" element={<UpdatesComponent />} />
      <Route path="/forums" element={<ForumsComponent />} />
      <Route path="/shopping" element={<ShoppingComponent />} />
      <Route path="/promotions" element={<PromotionsComponent />} />
    </Routes>
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetContent className="px-2 py-3" side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Studio Admin</SheetTitle>
          </SheetHeader>
          <Sidebar isMobileSidebar isCollapsed={false} />
        </SheetContent>
      </Sheet>
    </main>
  );
}
