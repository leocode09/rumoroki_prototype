import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { AI } from "@/actions/chat/actions";
import UserPromptForm from "./user-prompt-form";

export interface ChatPanelProps {
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

export function ChatPanel({
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
}: ChatPanelProps) {
  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const exampleMessages = [
    {
      heading: "List flights flying from",
      subheading: "San Francisco to Rome today",
      message: `List flights flying from San Francisco to Rome today`,
    },
    {
      heading: "What is the status",
      subheading: "of flight BA142?",
      message: "What is the status of flight BA142?",
    },
  ];

  return (
      <div className="relative mx-auto w-full md:max-w-3xl flex items-center justify-center">
        <ButtonScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
        <div className="w-full space-y-4 mb-10  rounded-xl">
          <UserPromptForm input={input} setInput={setInput} scrollToBottom={scrollToBottom} />
          
        </div>
      </div>
  );
}
