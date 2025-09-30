import { forwardRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./slider.module.css";

const Arrow = dynamic(() => import('@/icons/Arrow2.svg'), { ssr: false });

export const Slides = forwardRef(({ children, className }, s) => {
    return (
        <div className={cn(st.slider, className)} ref={s}>
            <div className={st.container}>
                {[children].flat().map((e, index) => e)}
            </div>
        </div>
    );
}
);
Slides.displayName = "Slides";
export const Slider = ({ children, emblaApi = {
    autoplay: !1
}, enabled = !0 }) => {
    let s;
    const [l, c] = useState(0)
    const d = Autoplay(
        { delay: emblaApi?.autoplay?.delay ?? null },
        e => e.parentElement
    );
    const [_, u] = useEmblaCarousel(emblaApi, emblaApi.autoplay ? [d] : []);
    const m = useCallback(() => {
        u && u.scrollPrev()
    }, [u]);
    const h = useCallback(() => {
        u && u.scrollNext()
    }, [u]);
    const p = useCallback(e => {
        u && u.scrollTo(e)
    }, [u]);;
    return useEffect(() => {
        let e = () => {
            c(u.selectedScrollSnap())
        };
        u && (u.on("select", e),
            e())
    }, [u]),
        useEffect(() => {
            !enabled && u && u.destroy()
        }, [u, enabled]),
        children ? children({
            emblaRef: _,
            currentIndex: l,
            setCurrentIndex: c,
            scrollPrev: m,
            scrollNext: h,
            scrollTo: p
        }) : null
};
Slider.Slides = Slides;
Slider.Nav = ({ className, scrollPrev = () => { }
    , scrollNext = () => { }
, total, current }) => {

    return 1 !== total ? (
        <div className={cn('p', 'book', st.nav, className)}>
            <button
                className={cn(st.nav__button, st.previous)}
                onClick={scrollPrev}
            >
                <Arrow className={st.arrow} />
            </button>
            <p className={cn(st.counter, 'p')}>
                {`0${current + 1}/0${total}`}
            </p>
            <button
                className={cn(st.nav__button, st.next)}
                onClick={scrollNext}
            >
                <Arrow className={cn(st.arrow, st.next)} />
            </button>
        </div>
    ) : null;
}