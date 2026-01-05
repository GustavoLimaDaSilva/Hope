import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from "react"
import { model } from "../../firebaseConfig.ts"
import type { ChatMessage } from "../types/react.ts"
import Message from '../components/Message.tsx'

export const Route = createFileRoute('/chat')({
  component: ChatWithAI,
})

export default function ChatWithAI() {

    const promptRef = useRef<null | HTMLTextAreaElement>(null)
    const [messages, setMessages] = useState<ChatMessage[]>([])

    return (
        <div>
            <textarea placeholder="chat about anything..." ref={promptRef}></textarea>
            <button onClick={() => {

                if (!promptRef.current) return

                const prompt = promptRef.current?.value
                promptRef.current.value = ''

                if (prompt) {
                    setMessages(prevMessages => [...prevMessages, {
                        from: 'user',
                        content: prompt
                    }])
                    reply(prompt)
                }
            }}>send</button>
            {messages.map(msg => {

                return <Message from={msg.from} content={msg.content} />
            })}
        </div>
    )

    async function reply(prompt: string) {

        const result = await model.generateContent(prompt)

        const response = result.response
        const text = response.text()

        setMessages(prevMessages => [...prevMessages, {
            from: 'AI',
            content: text
        }])
    }
}