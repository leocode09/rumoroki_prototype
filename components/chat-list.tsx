import { UIState } from '@/actions/chat/actions'
import { LoaderIcon } from 'lucide-react';
import Link from 'next/link'

export interface ChatList {
  messages: UIState
}

export function ChatList({ messages }: ChatList) {
  return messages.length ? (
    <div className="relative mx-auto md:max-w-3xl grid auto-rows-max gap-8 px-4">
      {messages.map((message, index) => (
        <div
          className={`${index % 2 === 0 ? '' : 'tool-preview justify-self-start'}`}
          key={message.id}
        >
          {message.display}
        </div>
      ))}
    </div>
  ) : <div className="flex items-center mt-20 justify-center h-100vh">
    create an tool app that you want
    just type the tool/game below
  </div>
}
