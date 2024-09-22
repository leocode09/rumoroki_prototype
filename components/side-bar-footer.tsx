import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Settings2 } from "lucide-react";
import { useSideBar } from "@/hooks/use-sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export const SideBarFooter = () => {
    const {
        collapsed
    } = useSideBar()
  return (
    <div className="flex justify-center p-3">
    </div>
  );
};
