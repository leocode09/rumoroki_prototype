"use client";

import { AI } from "@/actions/chat/actions";
import { Button } from "@/components/ui/button";
import { useAIState, useUIState } from "ai/rsc";
import { useGetTool, useTools } from "./hooks/use-tools";
import { Hint } from "../hint";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogFooter } from "../ui/dialog";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Input } from "../ui/input";

export default function Savetool() {
  const [aiState] = useAIState<typeof AI>();
  const [messages] = useUIState<typeof AI>();
  const toolId = aiState.id;
  const { toast } = useToast();
  const { tool, isLoading } = useGetTool(toolId);
  const [title, setTitle] = useState(tool?.title);

  const [isSaving, startTransition] = useTransition();

  const { create, update } = useTools(toolId);

  const disabled = isLoading || messages.length <= 1;

  const isSaved = false;
  const onSave = async () => {
    if (disabled) {
      toast({
        title: "This tool is still empty",
        description:
          "try saving this tool after finishing coding the tool",
      });
      return;
    }
    startTransition(async () => {
      if (!tool) {
        await create(aiState, title);
        window.history.replaceState({}, "", `/tools/${aiState.id}`);
      }

      if (tool) {
        await update(aiState, title);
      }
    });
  };

  if (tool) {
    <Button variant="outline" onClick={onSave}>
      Save tool
      {!isLoading && !isSaving && !disabled && (
        <span className="ml-2">
          <Hint label="Not Saved" side="bottom" sideOffset={14}>
            <div className="h-3 w-3 bg-emerald-300 text-white rounded-full" />
          </Hint>
        </span>
      )}
      {isSaving && (
        <Loader2 className="size-4 ml-2 animate-spin text-emerald-300" />
      )}
    </Button>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Save tool
          {!isSaved && !isLoading && !isSaving && !disabled && (
            <span className="ml-2">
              <Hint label="Not Saved" side="bottom" sideOffset={14}>
                <div className="h-3 w-3 bg-emerald-300 text-white rounded-full" />
              </Hint>
            </span>
          )}
          {isSaving && (
            <Loader2 className="size-4 ml-2 animate-spin text-emerald-300" />
          )}
        </Button>
      </DialogTrigger>
              <div className="fixed top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2">
      <DialogContent>
        <DialogTitle className="mb-4">Tool Name</DialogTitle>
        <Input className="mb-4" value={title} onChange={(e) => setTitle(e.target.value)} />
        <DialogFooter>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </div>
    </Dialog>
  );
}
