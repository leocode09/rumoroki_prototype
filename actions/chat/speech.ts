import { createClient } from '@deepgram/sdk';

export const getSpeech = async (text: string) => {
//   const elevenlabs = new ElevenLabsClient({
//     apiKey: "sk_bf2cf1184bec137a1e1ac1d09f8a84e821c08de67198b68a",
//   });
//   const audio = await elevenlabs.generate({
//     voice: "Rachel",
//     text,
//     model_id: "eleven_multilingual_v2",
//   });

//   return audio;

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const response = await deepgram.speak.request(
    { text },
    {
      model: 'aura-asteria-en',
    }
  );

  return await response.result?.blob();
};
