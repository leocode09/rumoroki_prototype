"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useActions, useUIState,useAIState } from "ai/rsc";
import { generateId } from "ai";
// import { ClientMessage } from "@/actions/chat-api";
import { useCookies } from "next-client-cookies";
import { Message } from "./message";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import CustomTextarea from "./user-prompt-form";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { ButtonScrollToBottom } from "./button-scroll-to-bottom";
import { AI, UIState } from "@/actions/chat/actions";
import { ChatList } from "./chat-list";
import { ChatPanel } from "./chat-panel";
import { useParams, usePathname,useRouter } from "next/navigation";

export const Chat = ({id}:{id: string}) => {
  const [messages, setMessages] = useUIState<typeof AI>();
  const [aiState] = useAIState<typeof AI>();
  const [input,setInput] = useState("")
  const params = useParams()
  const path = usePathname()
  const router = useRouter()

  // useEffect(()=>{
  //   if (path === "/tools" && messages.length === 1) {
  //     window.history.replaceState({}, '', `/tools/${id}`)
  //   }
  // },[path,id,messages])

  // useEffect(() => {
  //   const messagesLength = aiState.messages?.length
  //   console.log(messagesLength)
  //   if (messagesLength === 2) {
  //     router.refresh()
  //   }
  // }, [aiState.messages, router])

  const {
    isAtBottom,       
    scrollToBottom,   
    scrollRef,
    messagesRef,
    visibilityRef,
  } = useScrollAnchor();
  return (
    <div className="relative h-[calc(100vh_-_theme(spacing.12))] flex flex-1 px-5 flex-col focus-visible:outline-0">
      <div ref={scrollRef} className="flex-1 h-full overflow-y-auto w-full">
        <div ref={messagesRef} className="mx-auto pb-[100px] md:max-w-3xl">
          <ChatList messages={messages} />
          <div className="h-px w-full" ref={visibilityRef} />
        </div>
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>  
  );
};
