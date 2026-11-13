import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { model } from "../../../../firebaseConfig.ts";
import type { ChatMessage } from "../types/AI.ts";
import Message from "../components/Message.tsx";
import { scrollToBottom } from "../utils.ts";
import useKeyEvent from "../hooks/useKeyEvent.tsx";

export const Route = createFileRoute("/chat")({
  component: ChatWithAI,
});

export default function ChatWithAI() {
  const promptRef = useRef<null | HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputIsEmpty, setInputIsEmpty] = useState(true);
  const keyEvent = useKeyEvent("Enter", sendPrompt);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      scrollToBottom(chatContainer);
    }
  }, [messages]);

  useEffect(() => {
    if (keyEvent?.key === "Enter") {
      keyEvent.preventDefault();
    }
  }, [keyEvent]);

  return (
    <>
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg) => {
          return <Message role={msg.role} parts={msg.parts} />;
        })}
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          onChange={(e) => setInputIsEmpty(e.target.value === "")}
          placeholder="chat about anything..."
          ref={promptRef}
          contentEditable={true}
        />
        <button
          disabled={inputIsEmpty}
          onClick={() => {
            grecaptcha.enterprise.ready(async () => {
              const token = await grecaptcha.enterprise.execute(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY,
                { action: "send_prompt" },
              );
              const res = await fetch(
                "https://api-o37g4y27ua-uc.a.run.app/recaptcha/verification",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    action: "send_prompt",
                    token: token
                  })
                },
              );
              console.log(await res.json())
            });
            sendPrompt();
          }}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </button>
      </div>
    </>
  );

  function sendPrompt() {
    if (!promptRef.current) return;

    const prompt = promptRef.current?.value;
    promptRef.current.value = "";

    if (prompt) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "user",
          parts: [
            {
              text: prompt,
              type: "text",
            },
          ],
        },
      ]);
      reply(prompt);
    }
  }

  async function reply(prompt: string) {
    const chat = model.startChat({
      history: messages,
    });

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "model",
        parts: [{ text: text, type: "text" }],
      },
    ]);
  }
}
