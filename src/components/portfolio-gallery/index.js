import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useMediaQuery, useRect } from "@darkroom.engineering/hamo";
import { useWindowSize } from "react-use";
import { CustomImage } from "../custom-image";
import { Link } from "../link";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import st from "./gallery.module.css";
import cn from "clsx";
import { Marquee } from "../marquee";

const Arrow = dynamic(() => import('../arrow/index').then(({ Button }) => Button), { ssr: false });

function GalleryItem({ i: t, slug: r, title: i, current: l, isMobile: s, onSelect: c = () => { } }) {
    const [d, f] = useState(l);
    const [_, v] = useState(l);

    useEffect(() => {
        let e = !!s || d;
        if (l && e) {
            f(!0);
            let e = setTimeout(() => {
                requestAnimationFrame(() => {
                    v(!0)
                })
            }, 0);
            return () => {
                clearTimeout(e)
            }
        }
        v(!1)
    }, [l, d, s]);

    return (
        <li
            style={{ "--i": Math.min(t, 5) }}
            className={cn(st.item, d && st.visible)}
            key={r + t}
        >
            <Link
                href={`portfolio/${r}`}
                onPointerEnter={(e) => {
                    const { pointerType } = e;
                    if (pointerType === "mouse") {
                        c();
                        if (s === false) f(true);
                    }
                }}
                onPointerOut={() => {
                    if (s === false) {
                        f(false);
                        v(false);
                    }
                }}
                className={cn(st.link, _ && st.current)}
            >
                <span className={st.title}>{i}</span>
            </Link>
            <div
                className={cn(st.overlay)}
                onTransitionEnd={() => {
                    if (!l) f(false);
                }}
            >
                <Marquee repeat={6} className={st.marquee}>
                    view {i}
                </Marquee>
            </div>
        </li>
    );
}

function Gallery({ list: u, visible: o, onSwitch: c = () => { } }) {
    const d = useRef();
    const _ = useRef();
    const { height: y } = useWindowSize();
    const [p, x] = useRect({
        lazy: true
    });
    const [b, N] = useState(!0);
    const j = useMemo(() => x().height - y, [x().height, y]);
    const M = useMemo(() => j / u.length, [j]);
    const q = useMemo(() => Math.round(y / M / 2), [M, y]);
    const [w, E] = useState(null);
    const Z = useMemo(() => [...u].sort((e, t) => e.title.localeCompare(t.title)), [u]);
    const [k, S] = useState(null);
    const A = useMediaQuery("(max-width: 800px)");

    useEffect(() => {
        !1 !== A && S(Z[q])
    }, [A, q]);

    const [T, C] = useState(!1);
    const I = useRef(!1);
    const P = useRef(!1);

    useEffect(() => {
        if (w)
            return w.on("scroll", e),
                () => {
                    w.off("scroll", e)
                };
        function e(e) {
            let { scroll: t, velocity: r } = e;
            if (!1 === A && (100 >= Math.abs(r) && !P.current ? (C(!1),
                P.current = !0,
                I.current = !1) : Math.abs(r) > 100 && !I.current && (C(!0),
                    I.current = !0,
                    P.current = !1)),
                !0 === A) {
                let e = (Math.floor(t / M) + q) % u.length;
                S(Z[e])
            }
        }
    }, [w, M, q, A]);

    useEffect(() => {
        if (o && !b) {
            let e = A ? q : 2;
            S(Z[e])
        } else
            S(void 0)
    }, [o, A, q, T]);

    useEffect(() => {
        let e = new Lenis({
            wrapper: d.current,
            content: _.current,
            infinite: !0,
            smoothWheel: !0,
            smoothTouch: !0,
            touchMultiplier: 1.2
        });
        return E(e),
            () => {
                e.destroy()
            }
    }, []);

    useFrame(e => {
        null == w || w.raf(e)
    }, []);

    useEffect(() => {
        w && o && w.scrollTo(0, {
            immediate: !0
        })
    }, [o, w]);

    const R = useMemo(() => Z.map((e, t) => {
        let { title: r, slug: i, ...l } = e;
        return (
            <GalleryItem
                key={t}
                title={r}
                slug={i}
                visible={o}
                current={r === k?.title && o}
                isMobile={A}
                onSelect={() => {
                    T || (S({
                        title: r,
                        slug: i,
                        ...l
                    }), N(!1))
                }}
                i={t}
            />
        )
    }), [Z, k, T]);

    return (
        <section className={cn("theme-dark", st.gallery, o && st.visible)} onWheel={(e) => e.stopPropagation()}>
            <div className={st.image}>
                {b && (
                    <CustomImage
                        src={Z[2]?.hero?.mediaAnnotation?.cityMedia?.url}
                        alt={Z[2]?.hero?.mediaAnnotation?.cityMedia?.description || ""}
                        fill
                        priority
                        sizes="100vw"
                        className={cn(st.current, b && st.show)}
                    />
                )}
                {Z.map((e, t) => {
                    const { title: a, hero: u } = e;
                    return (
                        u.mediaAnnotation?.cityMedia && (
                            <CustomImage
                                key={t}
                                src={u.mediaAnnotation?.cityMedia?.url}
                                alt={u.mediaAnnotation?.cityMedia?.description || ""}
                                fill
                                priority
                                sizes="100vw"
                                className={a === k?.title ? st.current : ""}
                            />
                        )
                    );
                })}
            </div>
            <Arrow className={cn(st.button, "cta")} onClick={c}>
                list view
            </Arrow>
            <div className={st.inner} ref={d}>
                <ul
                    className={cn("h3", st.list)}
                    ref={(e) => {
                        _.current = e;
                        p(e);
                    }}
                >
                    {R}
                    <div className={st.extra}>
                        {R}
                    </div>
                </ul>
            </div>
        </section>
    );
}
Gallery.displayName = "PortfolioGallery"

export default Gallery;