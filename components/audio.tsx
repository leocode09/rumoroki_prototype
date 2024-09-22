import React, { useState, useRef, useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Mic } from "lucide-react";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { useOnBoardData } from "./tools/hooks/use-on-board-data";
import { AI } from "@/actions/chat/actions";
import { AiMessage, UserMessage } from "./message";
import { nanoid } from "nanoid";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface AudioContextRef {
  current: AudioContext | null;
}

interface AnalyserRef {
  current: AnalyserNode | null;
}

interface DataArrayRef {
  current: Uint8Array | null;
}

const VoiceAssistantInterface: React.FC = () => {
  const { submitAudioInput } = useActions();
  const [aiState] = useAIState<typeof AI>();
  const [_, setMessages] = useUIState<typeof AI>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [aispeaking, setAiSpeaking] = useState(false);
  const audioContextRef: AudioContextRef = useRef(null);
  const analyserRef: AnalyserRef = useRef(null);
  const dataArrayRef: DataArrayRef = useRef(null);
  const { data } = useOnBoardData(aiState.id);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current || !dataArrayRef.current) return;
    CanvasRenderingContext2D.prototype.roundRect = function (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      if (width < 2 * radius) radius = width / 2;
      if (height < 2 * radius) radius = height / 2;
      this.beginPath();
      this.moveTo(x + radius, y);
      this.arcTo(x + width, y, x + width, y + height, radius);
      this.arcTo(x + width, y + height, x, y + height, radius);
      this.arcTo(x, y + height, x, y, radius);
      this.arcTo(x, y, x + width, y, radius);
      this.closePath();
      return this;
    };
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#E0E0E0";

    // Aggregate frequency data into 4 ranges
    const bars: number[] = [0, 0, 0, 0];
    const binSize = dataArrayRef.current.length / 4;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const barIndex = Math.floor(i / binSize);
      bars[barIndex] = Math.max(bars[barIndex], dataArrayRef.current[i]);
    }

    // Draw 4 bars
    const barWidth = width / 5;
    const gap = width / 20;
    for (let i = 0; i < 4; i++) {
      const barHeight = (bars[i] / 255) * height;
      ctx.roundRect(
        i * (barWidth + gap) + gap,
        height - barHeight,
        barWidth,
        barHeight,
        barWidth
      );
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  };
  const getElevenLabsResponse = async (text: string) => {
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice: "Rachel",
      }),
    });

    const data = await response.blob();
    return data;
  };
  const sendAudioToAPI = async (blob: Blob) => {
    console.log(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Audio = reader.result?.toString().split(",")[1];
      if (!base64Audio) return;

      try {
        const response = await submitAudioInput(base64Audio, data);
        const audio = await getElevenLabsResponse(response.aiMessage);
        const reader = new FileReader();
        reader.readAsDataURL(audio);
        reader.onload = () => {
          if (audioRef.current) {
            audioRef.current.src = reader.result as string;
            audioRef.current.play();
            setAiSpeaking(true)
          }
        };

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{response.userMessage}</UserMessage>,
          },
          {
            id: nanoid(),
            display: <AiMessage content={response.aiMessage} />,
          },
        ]);
      } catch (error) {
        console.error("Error sending audio to API:", error);
      }
    };
  };

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioContextRef.current && analyserRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
      }
      animate();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const handleStop = async (blobUrl: string, blob: Blob) => {
    console.log("stopped");
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
    await sendAudioToAPI(blob);
  };
const handelCanvasClick = () => {
    if(aispeaking){
        setAiSpeaking(false)
        
    }
}
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg flex flex-col items-center p-6 w-80">
        <canvas ref={canvasRef} width={100} height={100} className="mb-4" onClick={handelCanvasClick} />
        <div className="flex justify-center items-center">
          <ReactMediaRecorder
            audio
            onStop={handleStop}
            onStart={handleStart}
            stopStreamsOnStop
            render={({ status, startRecording, stopRecording }) => (
              <div className="mt-2">
                <Button
                  size="icon"
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  className="p-4 rounded-full"
                >
                  <Mic
                    className={cn(                      status == "recording"
                        ? "animate-pulse text-red-500"
                        : "text-sky-500","size-5")}
                  />
                </Button>
              </div>
            )}
          />
        </div>
        <audio ref={audioRef} className="hidden" controls />
      </div>
    </div>
  );
};

export default VoiceAssistantInterface;
