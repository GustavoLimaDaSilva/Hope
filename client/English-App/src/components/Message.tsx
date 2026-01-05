import type { ChatMessage } from "../types/react"
import useFormatAIMessage from "../hooks/useFormatText"

export default function Message({ content, from }: ChatMessage) {

    const formattedMsg = useFormatAIMessage(content, from)

    return (
        <div className={from === 'user' ? 'user-msg' : 'AI-msg'}>
            {formattedMsg}
        </div>
    )
}