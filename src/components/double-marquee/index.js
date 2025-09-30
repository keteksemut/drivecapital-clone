import { useIntersectionObserver } from "@darkroom.engineering/hamo";
import { ImageReveal } from "../image-reveal";
import { Marquee } from "../marquee";
import dynamic from "next/dynamic";
import st from "./double-marquee.module.css";

const Parallax = dynamic(() => import('../parallax').then(({ Parallax }) => Parallax), { ssr: false });

export function Media({ media, className, parallaxDirection }) {

    return (
        <Parallax
            speed={-0.4 * parallaxDirection}
            className={`${st.image} ${className}`}
        >
            <ImageReveal
                src={media.url}
                alt={media.description || ""}
                fill={true}
                sizes="(max-width: 800px) 64vw, 31vw"
            />
        </Parallax>
    );
};

export const DoubleMarquee = ({ children, topText, bottomText, className }) => {
    const [c, d] = useIntersectionObserver({
        threshold: .4,
        once: !0
    })
        , u = Array.isArray(children) ? children.filter(e => e.type === Media) : [[children].find(e => e.type === Media)];

    return (
        <section
            className={`${st["double-marquee"]} h2 ${className}`}
            ref={c}
        >
            {u.map((e, t) => (
                <Media
                    key={`media-${t}`}
                    media={e?.props.media}
                    className={e?.props.className}
                    parallaxDirection={t % 2 * 2 - 1}
                />
            ))}
            <div
                className={`${st.box} ${d.isIntersecting && st.appear} ${st.top}`}
            >
                <div
                    className={`${st["marquee-wrapper"]} ${d.isIntersecting && st.appear}`}
                >
                    <Marquee
                        className={st.marquee}
                        duration={40}
                    >
                        {topText.map((e, t) => (
                            <span key={`top-marquee-item${t}`}>
                                {e + "\xa0"}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </div>
            <div
                className={`${st.box} ${d.isIntersecting && st.appear} ${st.bottom}`}
            >
                <div
                    className={`${st["marquee-wrapper"]} ${d.isIntersecting && st.appear}`}
                >
                    <Marquee
                        className={st.marquee}
                        duration={40}
                        inverted={true}
                    >
                        {bottomText.map((e, t) => (
                            <span key={`bottom-marquee-item${t}`}>
                                {e + "\xa0"}
                            </span>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

DoubleMarquee.Media = Media;