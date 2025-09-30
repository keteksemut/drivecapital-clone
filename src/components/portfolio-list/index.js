import { useMediaQuery, useRect } from "@darkroom.engineering/hamo";
import { useState, useRef, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useScroll } from "@/hook/useScroll";
import { SelectFilter, SelectFilterItem } from "./select-filter";
import { Link } from "../link";
import MultiSelect  from "./multi-select";
import HoverList from "./hover-list";
import cn from "clsx";
import st from "./portfolio-list.module.css";

const PortfolioList = ({ data: t, className: r, appear: a }) => {
    const p = useMediaQuery("(max-width: 800px)");
    const [d, u] = useState(t);
    const [h, _] = useState();
    const [m, g] = useState([]);
    const [C, k] = useRect();
    const { height: y } = useWindowSize();
    const L = useRef();
    const b = useRef();
    const Z = useRef(0);
    const [A, S] = useState(0);

    useEffect(() => {
        // Create a sorted copy of `t` based on the title
        let e = [...t].sort((a, b) =>
            a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );

        // Filter by `h` if `h` is defined and not "All"
        if (h && h !== "All") {
            e = e.filter(item =>
                item.hero.status[0].toLowerCase() === h.toLowerCase()
            );
        }

        // Filter by `m` if `m` has items
        if (m.length > 0) {
            e = e.filter(item =>
                item.hero.filters.items.some(filterItem =>
                    m.includes(filterItem.filterValue.toLowerCase())
                )
            );
        }

        // Update the state with the filtered and sorted list
        u(e);
    }, [t, h, m]);

    useEffect(() => {
        if (!a) return;

        const timeoutId = setTimeout(() => {
            S(b.current);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [a]);

    useEffect(() => {
        const rowHeight = Math.ceil(k.height / t.length);
        L.current = rowHeight;
        b.current = Math.ceil(y / rowHeight);
    }, [y, k, d]);

    const I = .75 * b.current;

    useScroll(({ scroll }) => {
        if (A === t.length) return;

        const hasScrolledPast = scroll - k.top > k.height || p;
        if (hasScrolledPast && A < t.length) {
            S(t.length);
            return;
        }

        if (scroll - k.top > 0 && !p) {
            const threshold = b.current * Z.current;
            if (scroll - k.top + L.current * I > L.current * threshold) {
                Z.current += 1;
                S(b.current * Z.current);
            }
        }
    }, [b, p]);

    return (
        <div
            className={cn(st.wrapper, r, "layout-grid")}
            id="porfolio-list"
            ref={C}
        >
            <div className={st.filters}>
                <div className={st.top}>
                    <SelectFilter
                        placeholder="Status"
                        value={h}
                        onValueChange={(e) => {
                            _(e);
                            S(t.length);
                        }}
                        parentId="#porfolio-list"
                    >
                        <SelectFilterItem value="All">All</SelectFilterItem>
                        {[...new Set(t.map((e) => e.hero.status[0]))].map((e) => (
                            <SelectFilterItem key={e} value={e}>
                                {e}
                            </SelectFilterItem>
                        ))}
                    </SelectFilter>
                </div>
                <div className={st.bottom}>
                    <MultiSelect
                        placeholder="Industry"
                        value={m}
                        onValueChange={(e) => {
                            g(e);
                            S(t.length);
                        }}
                        parentId="#porfolio-list"
                    >
                        {[...new Set(t.map((e) => e.hero.filters.items).flat().map((e) => e.filterValue.toLowerCase())),
                        ].map((e, t) => <MultiSelect.Item key={`filter-${t}`}>{e}</MultiSelect.Item>)}
                    </MultiSelect>
                </div>
            </div>
            <ul className={cn(st.list, "p-l uppercase")}>
                {d.map((e, t) => {
                    const { title: r, slug: s } = e;
                    return (
                        <HoverList key={r} visible={A > t || p}>
                            <HoverList.Root>
                                <Link
                                    className={st.element}
                                    href={`portfolio/${s}`}
                                    style={{ "--delay": !p && `${t % b.current * 100}ms` }}
                                >
                                    <HoverList.Item className={cn("p-l uppercase", st.title)} text={r} />
                                    <HoverList.Arrow className={st.link} />
                                </Link>
                            </HoverList.Root>
                        </HoverList>
                    );
                })}
            </ul>
        </div>
    );
};

export default PortfolioList;