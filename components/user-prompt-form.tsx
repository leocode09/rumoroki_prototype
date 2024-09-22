"use client";

import { CornerRightUp, Mic, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useRef } from "react";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { AI } from "@/actions/chat/actions";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { nanoid } from "nanoid";
import { UserMessage } from "./message";
import { toast } from "react-hot-toast";

export default function UserPromptForm({
  setInput,
  input,
  scrollToBottom,
}: {
  setInput: (value: string) => void;
  input: string;
  scrollToBottom: () => void;
}) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const value = input.trim();
    setInput("");
    if (!value) return;
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: nanoid(),
        display: <UserMessage>{value}</UserMessage>
      }
    ])
    try {
      const handle = async ()=>{
        const response = await submitUserMessage(value)
        setMessages(currentMessages => [
          ...currentMessages,
          response
        ])
      }
      toast.promise(handle(),{
        loading: "writing some code",
        success: "here you go",
        error: "something went wrong",
      })
    } catch (error: any) {
      console.log(error)
    }
  };
  return (
    <form
      className="relative flex overflow-hidden rounded-lg border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background w-full  rounded-xl"
      onSubmit={submit}
      ref={formRef}
    >
      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-none p-3 shadow-none outline-none"
        ref={textareaRef}
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
        maxRows={4}
        onKeyDown={onKeyDown}
      />
      <div className="flex items-end p-3">
        <Button
          type="submit"
          size="sm"
          disabled={!input.trim()}
          ref={buttonRef}
          className="ml-auto gap-1.5"
        >
          <span className="sr-only">Send Message</span>
          <CornerRightUp className="size-4.5" />
        </Button>
      </div>
    </form>
  );
}
