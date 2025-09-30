
import { cloneElement } from "react";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./column-parallax.module.css";

const Parallax = dynamic(() => import('@/components/parallax').then(mod => mod.Parallax), { ssr: false });

export const ColumnParallax = ({ data, className, children, first = !1 }) => {
    const i = useMediaQuery("(max-width: 800px)");
    const u = e => {
        let l = data[e];
        return <Parallax key={"team-member-".concat(e)} speed={-(.73 * (e % 3))}>
            {cloneElement(children, {
                ...l,
                key: "team-member-".concat(e),
                index: e
            })}
        </Parallax>
    };

    return i ? (
        <div className={cn(className, st["parallax-grid"], "layout-block-inner")}>
            {data.map((e, a) =>
                cloneElement(children, {
                    ...e,
                    key: "team-member-".concat(a),
                    first: first,
                    index: a
                }))}
        </div>
    ) : (
        <div
            className={cn(className, st["parallax-grid"], "layout-block")}
            style={{ "--how-many-columns": 3 }}
        >
            {Array.from({ length: data.length }, (e, a) => u(a))}
        </div>
    )
}