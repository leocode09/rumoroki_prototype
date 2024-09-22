"use client";

import { useSideBar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";

export const MenuButton = () => {
  const { toggleCollapsed, collapsed,setIsMobile, toggleSidebar, isMobile } = useSideBar();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onMenuClick = () => {
    if (isMobile) {
        toggleSidebar();
    } else {
      toggleCollapsed();
    }
  };
  return (
    <Button onClick={onMenuClick} variant="icon" size="icon">
      <MenuIcon className="h-6 w-6" />
    </Button>
  );
};
