"use client";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSideBar } from "@/hooks/use-sidebar";
import { useEffect } from "react";

import { ToolsList } from "@/components/tools/list";
import { PlusIcon } from "lucide-react";
import { SideBarFooter } from "./side-bar-footer";
import { MenuButton } from "./menu-button";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  const {
    isOpen,
    closeSidebar,
    collapsed,
    collapseSidebar,  
    toggleCollapsed,
    toggleSidebar,
    setCollapsed,
    isMobile,
    setIsMobile,
  } = useSideBar();

  useEffect(() => {
    if (!isMobile && isOpen) {
      closeSidebar();
      collapseSidebar();
    }
    if (isMobile) {
      setCollapsed(false);
    }
  }, [isMobile, isOpen, closeSidebar]);

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed top-0 w-full h-full opacity-0 backdrop-blur-sm z-20"
          onClick={closeSidebar}
        />
      )}
      <div
        className={cn(
          "inset-y-0 shrink-0 bg-[#fafbfb] dark:bg-[#080301] backdrop-blur-3xl transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "w-16" : "w-[300px]",
          "md:translate-x-0 z-20 fixed top-0 md:pt-0 md:static"
        )}
      >
        <div className="flex h-full max-h-[100vh] flex-col gap-2 sticky top-0">
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <nav className={cn("flex flex-col gap-3 px-3")}>
              <div className={cn("h-12 flex items-center")}>
                <div className="hidden md:flex">
                  <MenuButton />
                </div>
              </div>
              <NewButton collapsed={collapsed} />
              <ToolsList className="flex-1" />
            </nav>
          </div>
          <div className="flex justify-center"></div>

          <SideBarFooter />
        </div>
      </div>
    </>
  );
};
