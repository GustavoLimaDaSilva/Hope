import { useEffect, useRef, type JSX, type Ref, type RefObject } from "react"
import type { MessageOrigin } from "../types/react"

export default function useFormatText(raw: string, from: MessageOrigin | null, callback: Function | null) {

    const pRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {

        if (!pRef.current || from === 'user' || !from) return

        flowingTextEffect(pRef.current)
    }, [pRef.current])

    return formatText(raw)



    function formatText(raw: string) {

        return raw.split(/\n+/)
            .map((para, i) => {

                if (para === '\n') return

                const el = <p key={i} ref={pRef}>{
                    formatTextStyling(
                        para
                    )}
                </p>

                flowingTextEffect(pRef.current)
                return el
            });
    }


    function flowingTextEffect(pRef: HTMLParagraphElement | null) {

        if (!pRef || !pRef.parentElement) return

        const words = pRef.parentElement.querySelectorAll("span")
        let flowing_delay = 20

        words.forEach(w => {
            setTimeout(() => {
                w.classList.add('visible')
            }, flowing_delay)

            flowing_delay = flowing_delay + 20
        })
    }


    function formatTextStyling(raw: string) {

        const words = raw.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|[^\s]+)/g);

        return words.map((w, i) => {

            if ((w.startsWith('***') && w.endsWith('***'))) {

                return <b><i key={i}>{spanCharacters(w.slice(3, -3))}</i></b>;

            }
            else if (w.startsWith('**') && w.endsWith('**')) {

                return <b key={i}>{spanCharacters(w.slice(2, -2))}</b>;
            }
            else if (w.startsWith('*') && w.endsWith('*')) {

                return <i key={i}>{spanCharacters(w.slice(1, -1))}</i>;
            }

            return spanCharacters(w);
        });
    }

    function spanCharacters(word: string) {

        return <span onClick={callback && word !== ' ' ?
            () => callback(word) : undefined}
            className={from === 'AI' ? 'AI-words' : ''}>
            {word}
        </span>
    }
}
