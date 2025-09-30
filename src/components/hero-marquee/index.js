import { Marquee } from "../marquee";
import cn from "clsx"
import st from "./hero-marquee.module.css"

export const HeroMarquee = ({ title, appear = true }) => {
    return (
        <div className={cn("layout-block", st.hero, { [st.appear]: appear })}>
            <div className={cn(st.border, st.top)} />
            <div className={cn(st.border, st.bottom)} />
            <Marquee repeat={3} className={st.marquee}>
                <h1 className={cn("h1", st.title)}>
                    {title}
                </h1>
            </Marquee>
        </div>
    );
};