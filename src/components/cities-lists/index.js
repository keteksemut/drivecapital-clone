import { useRef, useEffect } from "react";
import { useWindowSize } from "react-use";
import { ImageReveal } from "../image-reveal";
import { Marquee } from "../marquee";
import { Link } from "../link";
import gsap from "gsap";
import st from "./cities-lists.module.css";

export function CitiesList({ cities, media, cta }) {

    const _ = useRef();
    const h = useRef([]);
    const { width } = useWindowSize();

    useEffect(() => {
        let e, t;
        let i = _.current.offsetHeight
            , r = gsap.matchMedia();
        return h.current[0] && (e = gsap.timeline({
            scrollTrigger: {
                id: "image0",
                trigger: _.current,
                scrub: !0,
                start: "top bottom",
                end: "bottom-=".concat(i / 2, "px top"),
                invalidateOnRefresh: !0
            }
        }).to(h.current[0], {
            y: i / 2 - h.current[0].offsetHeight,
            ease: "none"
        })),
            h.current[1] && (t = gsap.timeline({
                scrollTrigger: {
                    id: "image1",
                    trigger: _.current,
                    scrub: !0,
                    start: "top+=".concat(i / 2, "px bottom"),
                    end: "bottom top",
                    invalidateOnRefresh: !0
                }
            }).to(h.current[1], {
                y: i / 2 - h.current[1].offsetHeight,
                ease: "none"
            })),
            r.add({
                reduceMotion: "(prefers-reduced-motion: reduce)"
            }, i => {
                let { reduceMotion: r } = i.conditions;
                r && (gsap.set(h.current, {
                    clearProps: "all"
                }),
                    null == e || e.kill(),
                    null == t || t.kill())
            }
            ),
            () => {
                null == e || e.kill(),
                    null == t || t.kill()
            }
    }, [width]);

    return (
        <div
            className={`${st.wrapper} layout-block`}
            ref={_}
        >
            {/* {media[0]?.url && (
                <div
                    className={`${st.image} ${st.top}`}
                    ref={e => { h.current[0] = e; }}
                >
                    <ImageReveal
                        src={media[0].url}
                        alt={media[0].description || ""}
                        fill={true}
                        sizes="(max-width: 800px) 0vw, 32vw"
                    />
                </div>
            )} */}

            {/* {media[1]?.url && (
                <div
                    className={`${st.image} ${st.bottom}`}
                    ref={e => { h.current[1] = e; }}
                >
                    <ImageReveal
                        src={media[1].url}
                        alt={media[1].description || ""}
                        fill={true}
                        sizes="(max-width: 800px) 0vw, 32vw"
                    />
                </div>
            )} */}

            <ul className={`${st["cities-lists"]} h2`}>
                {cities.map((cityData, index) => {
                    const { city, airportCode, linkedFrom } = cityData;
                    return (
                        <li className={st.item} key={`city-${city}-${index}`}>
                            <h3 className={st.city}>
                                {city}
                                <span className={`${st.number} h4`}>{airportCode}</span>
                            </h3>
                            <div className={st.jobs}>
                                <Marquee
                                    repeat={5}
                                    duration={1 * linkedFrom.companies.items.length}
                                >
                                    {linkedFrom.companies.items.map((company, idx) => {
                                        const { linkedTitle } = company;
                                        return (
                                            <span key={`city-${linkedTitle}-${idx}`}>{linkedTitle}</span>
                                        );
                                    })}
                                </Marquee>
                            </div>
                        </li>
                    );
                })}

                <li className={st.more}>
                    <Link href={cta.url} className="link">
                        {cta.text}
                    </Link>
                </li>
            </ul>
        </div>
    );
};