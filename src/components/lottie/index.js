import { useRef, useEffect, useState } from "react";
import { useIntersectionObserver } from "@darkroom.engineering/hamo";
import { useDocumentReadyState } from "@darkroom.engineering/hamo";

export function Lottie({ animation, speed = 1, loop = !0, className, viewThreshold = 0 }) {

    const m = useRef(null);
    const c = useRef(null);
    const [l, p] = useState();
    const [h, d] = useIntersectionObserver({
        threshold: viewThreshold
    });
    const f = useDocumentReadyState();
    const y = async a => {
        const i = await fetch(a);
        const t = await i.json();
        return t
    };

    useEffect(() => {
        if (f === "complete") {
            import('lottie-web').then(module => p(module.default));
        }
    }, [f]);

    useEffect(() => {
        var a;
        if (l)
            return "string" == typeof animation && animation.includes("http") ? y(animation).then(a => {
                c.current = null == l ? void 0 : l.loadAnimation({
                    container: m.current,
                    animationData: a,
                    renderer: "svg",
                    autoplay: !1,
                    loop: loop
                })
            }) : c.current = null == l ? void 0 : l.loadAnimation({
                container: m.current,
                animationData: animation,
                renderer: "canvas",
                autoplay: !1,
                loop: loop
            }),
                null === (a = c.current) || void 0 === a || a.setSpeed(speed),
                () => {
                    var a;
                    return null === (a = c.current) || void 0 === a ? void 0 : a.destroy()
                }
    }, [l]);

    useEffect(() => {
        var a, i;
        c.current && d.isIntersecting ? null === (a = c.current) || void 0 === a || a.play() : null === (i = c.current) || void 0 === i || i.pause()
    }, [c.current, d.isIntersecting]);

    return (
        <div
            aria-hidden="true"
            className={className}
            ref={a => {
                m.current = a,
                    h(a)
            }}
        />
    );
};