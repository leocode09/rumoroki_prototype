import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export const NewButton = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <Link
      href="/tools/new"
      
      className={cn(
        buttonVariants({
          variant: "icon",
          size: "icon",
        }),
        "relative bg-accent w-[60%] pl-[inherit] gap-2 transition-all justify-start overflow-hidden",
        collapsed ? "w-full" : ""
      )}
    >
      <PlusIcon className="size-4 shrink-0" />
      <span
        className={cn(
          "text-sm transition-all",
          collapsed ? "opacity-0" : "opacity-100"
        )}
      >
        New tool
      </span>
    </Link>
  );
};
