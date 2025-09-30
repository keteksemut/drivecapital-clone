import { useIntersection } from "react-use";
import { useRef } from "react";
import cn from "clsx";
import st from "./marquee.module.css";

export const Marquee = ({ children, repeat = 2, duration = 50, offset = 0, inverted = !1, className, animationStart = !0, ..._ }) => {
    const h = useRef()
        , p = useIntersection(h, {
            threshold: 0
        });


    return (
        <div
            ref={h}
            {..._}
            className={cn(
                className, 
                st.marquee, 
                { [st.inverted]: inverted }, 
                { running: h?.isIntersecting }
              )}
            style={{
                "--duration": `${duration}s`,
                "--offset": `${offset % 100}%`,
                "--animation-status": p?.isIntersecting && animationStart ? "running" : "paused"
            }}
        >
            {Array(repeat).fill(children).map((e, i) => (
                <div className={st.inner} key={i}>
                    {children}
                </div>
            ))}
        </div>
    );
};