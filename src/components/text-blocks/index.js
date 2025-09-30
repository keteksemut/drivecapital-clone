import { useState } from "react";
import { VideoPlayer } from "../videoplayer";
import { ImageReveal } from "../image-reveal";
import { EyeBrow } from "../eyebrow";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./text-blocks.module.css";
import { TextScroll } from "../text-scroll";

const Arrow = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export const TextBlocks = ({ leftTop, videoPlaceholder, videoLink, title, annotation, className = "", description, cta, imageThreshold = .2 }) => {
    const [_, m] = useState(false);

    return (
        <section className={cn(st["text-left-image-right"], className)}>
            <div className={cn("layout-grid-inner", st.top)}>
                {leftTop && <p className={cn("p", st["left-top"])}>{leftTop}</p>}
                <div className={cn(st["left-right-text-image"], st["full-right"], { [st.disappear]: _ })}>
                    {videoLink && (
                        <>
                            <Arrow
                                className={cn(st.cta, { [st.disappear]: _ })}
                                onClick={() => m(true)}
                                fill
                                title="watch video"
                            >
                                <p className="p uppercase">Watch Video</p>
                            </Arrow>
                            <VideoPlayer
                                url={videoLink}
                                className={cn(st.video, { [st["activate-video"]]: _ })}
                                playing={_}
                                setPlayVideo={m}
                            />
                        </>
                    )}
                    <ImageReveal
                        src={videoPlaceholder.url}
                        alt={videoPlaceholder.description || ""}
                        fill
                        sizes="(max-width: 800px) 60vw, 63vw"
                        threshold={imageThreshold}
                    />
                </div>
                <h5 className={cn("h5", st["left-bottom"])}>{title}</h5>
            </div>
            <div className={cn("layout-block-inner", st.bottom)}>
                {annotation && <EyeBrow text={annotation} />}
                <p className={cn("p-l", st.description, { [st.indent]: !annotation })}>{description}</p>
                {cta && (
                    <Arrow href={cta.url} className={st.cta} icon>
                        <p className="p uppercase">{cta.text}</p>
                    </Arrow>
                )}
            </div>
        </section>
    );
}

export const TextBlocksInverted = ({ title, link, media, annotation, text }) => {
    const [a, o] = useState(false);

    return (
        <section className={cn("layout-grid-inner", st["text-right-image-left"])}>
            <h5 className={cn("h5", st["right-top"], st.title)}>{title}</h5>
            <div className={cn(st["left-right-text-image"], st["full-left"], { [st.disappear]: a })}>
                <Arrow
                    className={cn(st.cta, { [st.disappear]: a })}
                    onClick={() => o(true)}
                    fill
                    title="watch video"
                >
                    <p className="p uppercase">Watch Video</p>
                </Arrow>
                <VideoPlayer
                    url={link}
                    className={cn(st.video, { [st["activate-video"]]: a })}
                    playing={a}
                    setPlayVideo={o}
                />
                <ImageReveal
                    src={media.url}
                    alt={media.description || ""}
                    fill
                    sizes="(max-width: 800px) 60vw, 63vw"
                />
            </div>
            <div className={cn(st["right-bottom"], st.aside)}>
                <EyeBrow text={annotation} />
                <p className="p">{text}</p>
            </div>
        </section>
    );
};

export const TextBlockFull = ({ title: t, annotation: r, text: i, media: n, videoLink: c }) => {
    const [a, o] = useState(false);

    return (
        <section className={st["full-width-image-block"]}>
          <TextScroll className={cn("h2 layout-block-inner", st.title)}>{t}</TextScroll>
          <div className={cn("layout-grid layout-block", st["two-col"])}>
            <EyeBrow text={r} className={cn(st["left-top"], st["eye-brow"])} />
            <p className={cn("p", st["full-right"], st.text)}>{i}</p>
          </div>
          <div
            className={cn(
              "layout-block-inner",
              st["left-right-text-image"],
              st.image,
              { [st.disappear]: a }
            )}
          >
            <Arrow
              className={cn(st.cta, { [st.disappear]: a })}
              onClick={() => o(!a)}
              fill
              title="watch video"
            >
              <p className="p uppercase">Watch Video</p>
            </Arrow>
            <VideoPlayer
              url={c}
              className={cn(st.video, { [st["activate-video"]]: a })}
              playing={a}
              setPlayVideo={o}
            />
            <ImageReveal src={n.url} alt={n.description || ""} fill sizes="(max-width: 800px) 60vw, 63vw" />
          </div>
        </section>
      );
};