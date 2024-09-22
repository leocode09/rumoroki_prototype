import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { google } from '@ai-sdk/google'

import { z } from 'zod'
import { nanoid, toUser } from '@/lib/utils'
import ExtractHTMLCode from '@/components/extractHTMLCode'
import { Spinner, UserMessage } from '@/components/message'
import { getAuthTokens } from '../auth'

async function submitUserMessage(content: string) {
  'use server'
  const aiState = getMutableAIState();
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content: `${content}`,
      },
    ],
  });
  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const history = aiState.get().messages.map((message: Message) => ({
    role: message.role,
    content: message.content,
  }));
  const result = await streamUI({
    model: google("models/gemini-1.5-pro-latest"),
    initial: <Spinner />,
    system: `
    
**Purpose:**
You are an AI developer responsible for generating an interactive and visually appealing tool using HTML, Tailwind CSS, JavaScript, and CDN libraries. Your goal is to produce a complete and functional HTML file that is optimized for user experience, performance, and responsiveness.

**Requirements:**

1. **HTML Structure:**
   - Create a well-structured HTML5 document.
   - Use semantic tags (e.g., \`<header>\`, \`<section>\`, \`<article>\`, \`<footer>\`).
   - Include a \`<head>\` section with metadata, title, and links to necessary CDNs, including Tailwind CSS.
   - Include a \`<body>\` section that contains the core content and interactive elements.

2. **Tailwind CSS Styling:**
   - Utilize Tailwind CSS for styling, ensuring a streamlined and modern design approach.
   - Incorporate a dark theme with a small amount of orange for UI accents, ensuring high contrast and readability.
   - Use Tailwind’s utility-first classes to handle layout, spacing, typography, colors, and responsiveness.
   - Ensure the design is fully responsive, adapting to different screen sizes (desktop, tablet, mobile).

3. **JavaScript Functionality:**
   - Include interactive elements (e.g., buttons, forms, animations) with JavaScript.
   - Ensure the code is modular, using functions or classes where appropriate.
   - Implement event listeners and dynamic content updates.
   - Use external JavaScript libraries via CDN (e.g., jQuery, Axios, D3.js) if needed.
   - Provide clear and concise comments for all JavaScript code.

4. **CDN Integration:**
   - Link to Tailwind CSS via CDN in the \`<head>\` section.
   - Include any other necessary libraries via CDN, ensuring all links are correctly placed and loaded before any dependent code runs.

5. **Accessibility & SEO:**
   - Ensure all elements are accessible with appropriate ARIA attributes and roles.
   - Use alt text for images and labels for form elements.
   - Optimize for SEO with meta tags, keywords, and descriptive titles.

6. **Final Output:**
   - Generate a complete HTML file containing all the above elements.
   - Ensure the code is clean, organized, and follows best practices.
   - Include comments within the code to explain key sections.

**Objective:**
The output should be a polished, functional, and visually appealing HTML tool that leverages the power of Tailwind CSS, modern web technologies, and CDN libraries. The final product should demonstrate a strong understanding of UI/UX principles, accessibility, and responsive design.
and all remember to use embeded/internal styles and scripts code in html file.
    
    `,
    messages: [...history],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <ExtractHTMLCode text={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  })

  return {
    id: "",
    display: result.value
  }
}
export type Message = {
  role:
    | "user"
    | "assistant"
    | "system"
    | "function"
    | "data"
    | "tool"
    | "error";
  content: string;
  id?: string;
};
export type AIState = {
  id: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { id: nanoid(), messages: [] },
  onGetUIState: async () => {
    "use server";

    const tokens = await getAuthTokens();
    const user = tokens ? toUser(tokens) : null;

    if (user) {
      const aiState = getAIState() as AIState;

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState);
        return uiState;
      }
    } else {
      return;
    }
  },
})
export const getUIStateFromAIState = (aiState: AIState) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.id}-${index}`,
      display:
        message.role === "assistant" ? (
          <ExtractHTMLCode text={message.content} />
         ) : message.role === "user" ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <ExtractHTMLCode text={message.content} />
        ),
    }));
};