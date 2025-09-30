import gsap from "gsap";
import { useRef, useEffect } from "react";
import { useWindowSize } from "react-use";

export function Parallax({ className, children, speed = 1, id = "parallax", position }) {
    const s = useRef()
        , a = useRef()
        , f = useRef()
        , { width } = useWindowSize();

    useEffect(() => {
        const offset = width * speed * 0.1;
        const mediaQuery = gsap.matchMedia();
        const scrollTriggerConfig = {
            id,
            trigger: position === "top" ? document.body : s.current,
            scrub: true,
            start: position === "top" ? "top top" : "top bottom",
            end: position === "top" ? "+=100%" : "bottom top",
        };

        // Create GSAP timeline
        f.current = gsap.timeline({ scrollTrigger: scrollTriggerConfig })
            .fromTo(
                a.current,
                { y: position === "top" ? 0 : -offset },
                { y: offset, ease: "none" }
            );

        // Handle reduced motion preference
        mediaQuery.add(
            { reduceMotion: "(prefers-reduced-motion: reduce)" },
            (context) => {
                if (context.conditions.reduceMotion && f.current) {
                    f.current.from(a.current, { y: 0 });
                    f.current.kill();
                }
            }
        );

        // Cleanup function
        return () => f.current?.kill();
    }, [id, speed, position, width]);

    return (
        <div ref={s}>
            <div ref={a} className={className}>
                {children}
            </div>
        </div>
    )
};