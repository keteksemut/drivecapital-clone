import { ImageReveal } from "../image-reveal";
import cn from "clsx";
import st from "./double-image.module.css";

export function DoubleImage({ images, inverted = !1 }) {

    return (
        <div
            className={cn(st["double-image"], "layout-grid", inverted && st.inverted)}
        >
            <div className={st.image}>
                <ImageReveal
                    src={images[0].url}
                    alt={images[0].description || ""}
                    fill={true}
                    sizes="(max-width: 800px) 43vw, 31vw"
                />
            </div>
            <div className={st.image}>
                <ImageReveal
                    src={images[1].url}
                    alt={images[1].description || ""}
                    fill={true}
                    sizes="(max-width: 800px) 43vw, 63vw"
                />
            </div>
        </div>
    );
};