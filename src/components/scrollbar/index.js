import { useWindowSize } from 'react-use';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useStore } from '@/lib/store/useStore';
import { clamp } from '@/lib/maths';
import useMeasure from "react-use-measure";
import { useScroll } from '@/hook/useScroll';
import st from "./scrollbar.module.css";

export function Scrollbar() {
    const thumbRef = useRef();
    const dragStartY = useRef(0);
    const { width, height } = useWindowSize();
    const lenis = useStore(({ lenis }) => lenis);
    const [isDragging, setIsDragging] = useState(false);
    const [innerRef, { height: innerHeight }] = useMeasure();
    const [thumbMeasureRef, { height: thumbHeight }] = useMeasure();
    
    // Calculate thumb size based on content and window height
    const calculateThumbHeight = useCallback(() => {
        if (!lenis || !innerHeight) return thumbHeight;
        const viewportRatio = height / (lenis.limit + height);
        return Math.max(innerHeight * viewportRatio, 50);
    }, [lenis, innerHeight, height, thumbHeight]);

    // Handle scroll updates
    useScroll(({ scroll, limit }) => {
        if (!thumbRef.current || isDragging) return;
        const maxScroll = innerHeight - calculateThumbHeight();
        const scrollRatio = scroll / limit;
        thumbRef.current.style.transform = `translate3d(0,${scrollRatio * maxScroll}px,0)`;
    });

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e) => {
            e.preventDefault();
            if (!lenis || !thumbRef.current) return;

            const mouseY = e.clientY;
            const offset = mouseY - dragStartY.current;
            const maxThumbPosition = innerHeight - calculateThumbHeight();
            
            // Use window height for bounds checking
            const boundedMouseY = clamp(0, mouseY, height);
            const currentThumbPosition = parseFloat(
                thumbRef.current.style.transform.split(',')[1] || '0'
            );
            
            const newPosition = clamp(0, currentThumbPosition + offset, maxThumbPosition);
            const scrollPercentage = newPosition / maxThumbPosition;
            const scrollTo = scrollPercentage * lenis.limit;

            thumbRef.current.style.transform = `translate3d(0,${newPosition}px,0)`;
            window.scrollTo(0, scrollTo);
            dragStartY.current = boundedMouseY;
        };

        const handleUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);

        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerup', handleUp);
        };
    }, [isDragging, lenis, innerHeight, height]);

    const handlePointerDown = (e) => {
        e.preventDefault();
        // Use window height for initial position clamping
        const boundedY = clamp(0, e.clientY, height);
        setIsDragging(true);
        dragStartY.current = boundedY;
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
    };

    return (
        <div className={st.scrollbar}>
            <div ref={innerRef} className={st.inner}>
                <div
                    className={st.thumb}
                    ref={(el) => {
                        thumbRef.current = el;
                        thumbMeasureRef(el);
                    }}
                    style={{ height: `${calculateThumbHeight()}px` }}
                    onPointerDown={handlePointerDown}
                />
            </div>
        </div>
    );
};