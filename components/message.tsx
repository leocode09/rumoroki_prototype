"use client";
import { ClientMessage } from "@/actions/chat-api";
import { cn } from "@/lib/utils";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import { IconGemini } from "./icons";
import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "@/hooks/use-streamable-text";
import { MemoizedReactMarkdown } from "./markdown";

export const Message = ({ message }: { message: ClientMessage }) => {
  return (
    <div
      className={cn(
        "flex items-start",
        message.role === "user"
          ? "justify-end animate-slide-up-fade"
          : "justify-start"
      )}
    >
      {message.role === "assistant" && (
        <div
          className={cn(
            "flex size-8 shrink-0 select-none items-center justify-center rounded-lg border shadow bg-card text-primary-foreground"
          )}
        >
          <IconGemini />
        </div>
      )}
      <div
        className={cn(
          "flex pt-1 w-[70%] first-line:rounded-lg",
          message.role === "user" ? "justify-end" : "justify-start"
        )}
      >
        {message.display === "loading" ? (
          <Loader2 className="size-5 text-primary animate-spin" />
        ) : (
          <div
            className={cn(
              "rounded-lg",
              message.role === "user"
                ? "bg-card rounded-3xl shadow-lg px-5 py-2.5"
                : "rounded-3xl px-3"
            )}
          >
            {message.display}
          </div>
        )}
      </div>
    </div>
  );
};
export const AiCard = ({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) => {
  return (
    <div className={cn("flex items-start justify-start")}>
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-lg text-primary-foreground",
          showAvatar ? "" : "invisible"
        )}
      >
        <IconGemini />
      </div>
      <div
        className={cn(
          "flex pt-1 w-[70%] first-line:rounded-lg before:justify-start"
        )}
      >
        {children}
      </div>
    </div>
  );
};
export const Spinner = () => {
  return (
    <div className={cn("flex items-start justify-start")}>
      <div
        className={cn( "flex size-8 shrink-0 select-none items-center justify-center rounded-lg text-primary-foreground")}>
        <IconGemini />
      </div>
      <div
        className={cn(
          "flex pt-2 w-[70%] first-line:rounded-lg before:justify-start"
        )}
      >
        <Loader className="size-5 animate-spin text-base text-muted-foreground" />
      </div>
    </div>
  );
};
export const AiMessage = ({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) => {
  const text = useStreamableText(content);

  return (
    <div className={cn("flex items-start justify-start", className)}>
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-lg text-primary-foreground"
        )}
      >
        <IconGemini />
      </div>
      <div
        className={cn(
          "pt-1 w-[70%]"
        )}
      >
        <MemoizedReactMarkdown components={{}}>{text}</MemoizedReactMarkdown>
      </div>
    </div>
  );
};
export const UserMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex items-start justify-end animate-slide-up-fade")}>
      <div
        className={cn(
          "flex pt-1 w-[70%] first-line:rounded-lg justify-end"
        )}
      >
        <div className={cn("bg-secondary rounded-3xl px-5 py-2.5")}>
          {children}
        </div>
      </div>
    </div>
  );
};
