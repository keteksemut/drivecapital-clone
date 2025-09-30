import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./eyebrow.module.css"

const Label = dynamic(() => import('@/icons/Label.svg'), { ssr: false });

export const EyeBrow = ({ text, className }) => {
    return (
        <p className={cn(st.eyebrow, className, "p-s")}>
            <Label /> {text}
        </p>
    );
};