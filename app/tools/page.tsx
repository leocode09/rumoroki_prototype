import { AI } from "@/actions/chat/actions";
import { Chat } from "@/components/chat";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { nanoid } from "@/lib/utils";

export const dynamic = 'force-dynamic'

export default async function ToolsPage() {
  const id = nanoid();
  const messages = [] as any;
  const interactions = [] as any;

  return (
    <AI
      initialAIState={{
        id: id,
        messages: [],
      }}
    >
      <div className="flex w-full flex-col">
        <Header />
        <div className="h-[calc(100vh_-_theme(spacing.12))]">
          <Chat id={id} />
        </div>
      </div>
    </AI>
  );
}
