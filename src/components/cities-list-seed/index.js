import { useState } from "react";
import { ImageReveal } from "../image-reveal";
import st from "./cities-list-seed.module.css";

export function CitiesListSeed({ cities = [] }) {
    const [t, l] = useState(!0);

    return (
        <div className={`${st.wrapper} layout-grid`}>
            <aside className={st.sticky}>
                {cities.map((e, s) => {
                    let { cityMedia: a } = e;
                    return (
                        <div key={s} className={[st.image, t === s && st.show].filter(Boolean).join(' ')}>
                            <ImageReveal
                                src={a.url}
                                alt={a.description || ""}
                                fill={true}
                                sizes="(max-width: 800px) 0vw, 32vw"
                            />
                        </div>
                    );
                })}
            </aside>

            <ul className={`${st["cities-lists"]} h2`}>
                {cities.map((e, s) => {
                    let { city: n, airportCode: a } = e;
                    return (
                        <li
                            key={`city-${n}-${s}`}
                            onPointerEnter={() => l(s)}
                            className={[st.item, t === s && st.show].filter(Boolean).join(' ')}
                        >
                            <h3 className={st.city}>
                                {n}
                                <span className={`${st.number} h4`}>{a}</span>
                            </h3>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}