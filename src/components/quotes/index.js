import { Slider } from "../slider";
import cn from "clsx";
import st from "./quotes.module.css";


export function Quotes({quotes=[], className}) {
    return (
        <div className={cn("layout-grid", st.quotes, className)}>
            <Slider emblaApi={{ containScroll: "keepSnaps" }}>
                {(e) => {
                    const { emblaRef, currentIndex, scrollPrev, scrollNext } = e;
                    return (
                        <>
                            <div className={st.quotes__nav}>
                                <Slider.Nav
                                    current={currentIndex}
                                    total={quotes.length}
                                    scrollPrev={scrollPrev}
                                    scrollNext={scrollNext}
                                    className={st.quotes__nav__top}
                                />
                            </div>
                            <Slider.Slides ref={emblaRef} className={st.quotes__slider}>
                                {quotes.map((quote, index) => {
                                    const { text } = quote;
                                    return (
                                        <div key={index} className={st.quotes__quote}>
                                            <p className="p-l">{text}</p>
                                        </div>
                                    );
                                })}
                            </Slider.Slides>
                        </>
                    );
                }}
            </Slider>
        </div>
    )
}