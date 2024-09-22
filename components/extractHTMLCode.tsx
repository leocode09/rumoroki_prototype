"use client";

import { useStreamableText } from '@/hooks/use-streamable-text';
import { StreamableValue } from 'ai/rsc';
import { FunctionComponent } from 'react';

const extractHTMLCode: FunctionComponent<{ text: string | StreamableValue<string>; }> = ({ text }) => {
  const html = useStreamableText(text);

  // Updated regex to capture any HTML-like content
  const regex = /<\s*html[^>]*>[\s\S]*?<\s*\/\s*html\s*>|<\s*body[^>]*>[\s\S]*?<\s*\/\s*body\s*>|<\s*div[^>]*>[\s\S]*?<\s*\/\s*div\s*>/g;
  const matches = html.match(regex);

  if (!matches) {
    return null;
  }

  return (
    <>
      {matches.map((match, index) => (
        <iframe
          key={index} // Add key for each iframe
          className='h-full'
          srcDoc={match}
          width="100%"
          height="500px"
        />
      ))}
    </>
  );
};

export default extractHTMLCode;
