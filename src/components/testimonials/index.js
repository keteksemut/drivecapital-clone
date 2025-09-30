import { Quotes } from "../quotes";
import cn from "clsx";
import st from "./testimonials.module.css";

export const Testimonials = ({ title, items, appear = !0 }) => {

    return (
        <div className={cn("layout-grid", st.wrapper, appear && st.appear)}>
            <div className={st.title}>
                <h5 className="h5 uppercase">{title}</h5>
            </div>
            <div className={st.content}>
                <div className={cn(st.border, st.top)} />
                <Quotes quotes={items} />
                <div className={cn(st.border, st.bottom)} />
            </div>
        </div>
    )
};