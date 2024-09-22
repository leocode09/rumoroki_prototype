"use server"
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { AIState } from "./actions";
import { generateText } from "ai";
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
})
export const generateTitle = async (messages: AIState["messages"]) => {
  const title = await generateText({
    model: google("models/gemini-pro"),
    prompt: `
            here is the conversation:
            write a title for the conversation in few words

            ---BEGIN Conversation---
            ${messages.map((message) => `${message.role}:${message.content}`).join("\n\n")}
            ---END Conversation---

            Summarize the conversation in 5 words or fewer:
            Be as concise as possible without losing the context of the conversation.

            Your goal is to extract the key point of the conversation.
            Make the title unique and understandable

            just return the title no explanation
            `,
    temperature: 0,
  });

  return title.text;
};
