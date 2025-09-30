import { useRef, useState, useEffect } from "react";
import { useRect } from "@darkroom.engineering/hamo";
import { useScroll } from "@/hook/useScroll";
import { useWindowSize } from "react-use";
import cn from "clsx";
import st from "./text-scroll.module.css";

export const TextScroll = ({ children: text, className, opacity = 0.3 }) => {
    const { height: windowHeight } = useWindowSize();
    const [ref, getRect] = useRect({ lazy: true });
    const wordCount = useRef(text.split(" ").length);
    const [visibleWords, setVisibleWords] = useState(Array(wordCount.current).fill(false));
    const wordPositions = useRef([]);
    const startScroll = useRef(0);
    const endScroll = useRef(0);
    const currentWordIndex = useRef(0);

    useEffect(() => {
        const { top, height } = getRect();
        startScroll.current = top - windowHeight;
        endScroll.current = top + height;
        
        const step = height / wordCount.current;
        wordPositions.current = Array.from({ length: wordCount.current }, (_, i) => top - 0.5 * windowHeight + i * step);
    }, [getRect().top, getRect().height, windowHeight]);

    useScroll(({ scroll }) => {
        if (scroll < startScroll.current || scroll > endScroll.current) return;

        let index = wordPositions.current.findIndex((pos) => pos >= scroll);
        if (scroll >= wordPositions.current[wordCount.current - 1]) index = wordCount.current;

        if (index !== currentWordIndex.current) {
            currentWordIndex.current = index;
            setVisibleWords(Array.from({ length: wordCount.current }, (_, i) => i < index));
        }
    }, [wordPositions, currentWordIndex, wordCount, endScroll, startScroll]);

    return (
        <p className={cn(className, st.sentence)} ref={ref} style={{ "--opacity": opacity }}>
            {text.split(" ").map((word, index) => (
                <span key={`word-${index}`} className={cn(st.word, { [st.visible]: visibleWords[index] })}>
                    {word}
                </span>
            ))}
        </p>
    );
};