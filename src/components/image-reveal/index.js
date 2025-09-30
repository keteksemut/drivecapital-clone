import { useIntersectionObserver } from "@darkroom.engineering/hamo";
import { CustomImage } from "../custom-image";
import cn from "clsx";
import st from "./image-reveal.module.css";

export function ImageReveal({ once = !0, visible, delay = "0s", threshold = .2, hoverable = !1, ...m }) {
    const [u, _] = useIntersectionObserver({
        threshold: threshold,
        once: once
    });

    return (
        <div
            ref={u}
            className={cn(
                st.wrapper,
                { [st.visible]: visible === undefined ? _.isIntersecting : visible },
                { [st.hoverable]: hoverable }
            )}
            style={{ "--delay": delay }}
        >
            <CustomImage {...m} alt={m.alt} />
        </div>
    );
};