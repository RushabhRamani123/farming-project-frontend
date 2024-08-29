/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import initials from "initials";
import { Circle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { buttonVariants } from "../../components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../../components/ui/tooltip";
import useVariantBasedOnRoute from "../../hooks/useVariantBasedOnRoute";
import { cn } from "../../lib/utils";
import { sidebarItems } from "../../navigation/sidebar-items";

function SidebarHeading({ heading, isMobileSidebar = false, isCollapsed }) {
  return isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="flex size-12 items-center justify-center rounded-md bg-[white]">
          <span className="text-base uppercase text-black font-semibold">{initials(heading)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4 bg-emerald-800 text-black">
        {heading}
      </TooltipContent>
    </Tooltip>
  ) : (
    <h4 className={cn("px-3 text-black text-lg mt-6 mb-3 uppercase text-left font-semibold", isMobileSidebar && "px-1")}>
      {heading}
    </h4>
  );
}

function SidebarItemWithChildren({ item, isCollapsed = false, getVariant }) {
  const childRoutes = item.children?.map((child) => child.route || "") ?? [];
  const currentPath = useLocation().pathname;
  const isActive = childRoutes.some((route) => currentPath.includes(route));

  return (
    <AccordionItem value={item.title} className="border-none">
      <AccordionTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: isCollapsed ? "icon" : "default" }),
          isCollapsed && "hide-accordion-icon",
          "flex items-center justify-between hover:no-underline py-2 w-full h-12",
          isActive ? "bg-[white] text-black" : "text-black hover:bg-[white] hover:text-black"
        )}
      >
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="flex size-12 items-center justify-center">
                <item.icon className="size-6" />
                <span className="sr-only">{item.title}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4 bg-emerald-800 text-black">
              {item.title}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center text-lg">
            <item.icon className="mr-3 size-6" />
            {item.title}
          </div>
        )}
      </AccordionTrigger>
      <AccordionContent className="mt-1 flex flex-col gap-1 pb-0">
        {item.children?.map((child) =>
          isCollapsed ? (
            <Tooltip key={child.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={child.route || "#"}
                  className={cn(buttonVariants({ variant: getVariant(child.route), size: "icon" }), "h-12 w-12 bg-[white] text-black hover:bg-emerald-500")}
                >
                  <span className="text-base font-semibold">{initials(child.title)}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4 bg-emerald-800 text-black">
                {child.title}
                {child.label && <span className="ml-auto text-emerald-300">{child.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={child.title}
              to={child.route || "#"}
              className={cn(
                buttonVariants({ variant: getVariant(child.route), size: "default" }),
                "flex items-center justify-start py-2 px-6 text-black hover:bg-[white]"
              )}
            >
              <Circle className={cn("mr-3 h-3 w-3")} />
              <div className={cn("text-base duration-200")}>{child.title}</div>
              {child.label && <span className="ml-auto text-emerald-300">{child.label}</span>}
            </Link>
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

function CollapsedSidebar({ item, getVariant }) {
  if (item.children) {
    return <SidebarItemWithChildren item={item} isCollapsed getVariant={getVariant} />;
  }

  const variant = getVariant(item.route ?? "");
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link to={item.route ?? "#"} className={cn(buttonVariants({ variant, size: "icon" }), "h-12 w-12 bg-[white] text-black hover:bg-emerald-500")}>
          <item.icon className="size-6" />
          <span className="sr-only">{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4 bg-emerald-800 text-black">
        {item.title}
        {item.label && <span className="ml-auto text-emerald-300">{item.label}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

function ExpandedSidebar({ item, getVariant }) {
  if (item.children) {
    return <SidebarItemWithChildren item={item} getVariant={getVariant} />;
  }

  const variant = getVariant(item.route ?? "");
  return (
    <Link
      to={item.route ?? "#"}
      className={cn(buttonVariants({ variant, size: "default" }), "flex justify-start items-center text-black hover:bg-[white] h-12 text-lg")}
    >
      <item.icon className="mr-3 size-6" />
      {item.title}
      {item.label && <span className={cn("ml-auto text-emerald-300")}>{item.label}</span>}
    </Link>
  );
}

function isNavItem(item) {
  return item.title !== undefined;
}

export default function Sidebar({ isCollapsed, isMobileSidebar = false }) {
  const getVariant = useVariantBasedOnRoute();
  return (
    <TooltipProvider delayDuration={0}>
      <Accordion type="single" collapsible>
        <div 
          data-collapsed={isCollapsed} 
          className={cn(
            "group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 bg-[white] text-black",
            isCollapsed ? "w-16" : "w-64",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <nav
            className={cn(
              "grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2",
              isMobileSidebar && "p-0"
            )}
          >
            {sidebarItems.map((item) => {
              if (isNavItem(item)) {
                if (isCollapsed) {
                  return <CollapsedSidebar key={item.title} item={item} getVariant={getVariant} />;
                }
                return <ExpandedSidebar key={item.title} item={item} getVariant={getVariant} />;
              }
              return (
                <SidebarHeading
                  isMobileSidebar={isMobileSidebar}
                  key={item.heading}
                  heading={item.heading}
                  isCollapsed={isCollapsed}
                />
              );
            })}
          </nav>
        </div>
      </Accordion>
    </TooltipProvider>
  );
}