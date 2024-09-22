"use client";
import { useCollection } from "react-firebase-hooks/firestore";
import { app, db } from "@/lib/firebase/client-app";
import {
  Firestore,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { nanoid } from "@/lib/utils";
import { useSideBar } from "@/hooks/use-sidebar";
import { Button } from "../ui/button";
import { Loader2, LoaderIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGetTools } from "./hooks/use-tools";
import { useParams, usePathname } from "next/navigation";
export const ToolsList = ({className}:{className?:string}) => {
  const { collapsed } = useSideBar();
  const {
    error,
    isLoading,
    tools
  } = useGetTools();
  const params = useParams();
  const pathName = usePathname();
  return (
    <>
      <div
        className={cn("animate-fade-in", collapsed ? "animate-fade-out" : "", className)}
      >
        {isLoading && (
          <div className="flex items-center justify-center h-24">
            <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
          </div>
        )}
        <div className={cn("flex flex-col gap-2")}>
          {tools?.map((doc) => (
            <Link
              key={doc.id}
              href={`/tools/${doc.id}`}
              className={cn("px-3 py-2 rounded-md hover:bg-secondary transition-all select-none cursor-pointer truncate", (params.id === doc.id || pathName.includes(doc.id)) && "bg-secondary")}
              title={doc.title}
            >
              {doc.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
