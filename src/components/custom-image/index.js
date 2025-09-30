import Image from "next/image";
import cn from "clsx";
import st from "./custom-image.module.css"

export function CustomImage({className, style, loading="eager", objectFit="cover", quality=90, alt="", ...m}) {

            return (
                <Image {...m}
                   className={cn(st.image, className)}
                   style={{ objectFit: objectFit, ...style }}
                   loading={loading}
                   quality={quality}
                   alt={alt}
                   draggable={false}
                   onDragStart={() => false} />
              );
        };