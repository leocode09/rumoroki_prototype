import { AI } from "@/actions/chat/actions";
import { getTool } from "@/actions/chat/firebase";
import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import Link from "next/link";
import { redirect } from "next/navigation";
export interface toolPageProps {
  params: {
    id: string;
  };
}
export default async function tool({ params }: toolPageProps) {
  const tool = await getTool(params.id);
  
  return (
    <AI
      initialAIState={{
        id: params.id,
        messages: tool ? tool.messages : [],
      }}
    >
      <div className="flex w-full flex-col">
        <Header />
        <div className="h-[calc(100vh_-_theme(spacing.12))]">
          <Chat id={params.id} />
        </div>
      </div>
    </AI>
  );
}
