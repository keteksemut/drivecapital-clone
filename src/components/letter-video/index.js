import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from '@darkroom.engineering/hamo';
import dynamic from 'next/dynamic';
import st from './letter-video.module.css'

const Parallax = dynamic(() => import('../parallax').then(mod => mod.Parallax), {
    ssr: false,
})
export const LetterVideo = ({ title, video, className }) => {
    const s = useRef();
    const l = useMediaQuery("(max-width: 800px)");
    const [h, _] = useState(!1);

    useEffect(() => {
        window.addEventListener("click", () => {
            (null == s ? void 0 : s.current) && s.current.play()
        }, { once: !0 })
    }, []);

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    as="video"
                    type="video/mp4"
                    href={video}
                />
            </Head>
            <div className={`${className} ${st["letter-video"]} ${h && st.started}`}>
                <video
                    className={st["bg-video"]}
                    loop
                    muted
                    autoPlay
                    playsInline
                    ref={s}
                    onPlay={() => _(!0)}
                    preload="auto"
                    src={`${video}#t=0.1`}
                    type="video/mp4"
                />
                <div className={`${st.title} h1`}>
                    <Parallax position="top" speed={l ? 0 : -2.4}>
                        <h1>{title}</h1>
                    </Parallax>
                </div>
            </div>
        </>
    );
}