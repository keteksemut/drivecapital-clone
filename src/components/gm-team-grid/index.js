import { useRef } from "react";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import { ImageReveal } from "@/components/image-reveal";
import Link from "next/link";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./gm-team-grid.module.css";

const ColumnParallax = dynamic(() => import('@/components/column-parallax').then((m) => m.ColumnParallax), { ssr: false });
const Arrow = dynamic(() => import('@/components/arrow').then((mod) => mod.Button), { ssr: false });

export function GmTeamGrid({ data, title, className, visible = !0 }) {
  const l = useMediaQuery("(max-width: 800px)");
  const c = [...data.items];

 return (
    <div className={cn(st.wrapper, className, !0 === l && "layout-block")} >
      {l === false && (
        <ColumnParallax data={c} className={st.item}>
          <TeamMember visible={visible} />
        </ColumnParallax>
      )}
      <h3 className={cn(st["wrapper-title"], "h5 hide-on-desktop")}>
        {title}
      </h3>
      {l === true && data.items.map((item, index) => (
        <div className={st.item} key={index} >
          <TeamMember {...item} visible={visible} />
        </div>
      ))}
    </div>
  )
}

function TeamMember({ title, position, email, image, link, first, index, colN, className, ...x }) {
  const f = useRef();
  const N = useMediaQuery("(max-width: 800px)")

  return (index !== 0 || colN !== 0 || N) ? (
    <div className={cn(st["team-card"], className)} {...x}>
      <Link href={link} className={st["hover-section"]}>
        <p className={cn(st.title, "p-s uppercase")}>
          {title} • {position && position}
        </p>
        <div className={st.image} ref={f}>
          <ImageReveal
            src={image.url}
            alt={image.description || ""}
            fill={!0}
            sizes="(max-width: 800px) 84vw, 30vw"
            hoverable={!0}
            threshold={first && index === 0 ? 0 : 0.2} />
        </div>
      </Link>
      {email?.url && (
        <Arrow href={email.url} icon={!0} className="cta">
          Contact
        </Arrow>
      )}
    </div>
  ) : (
    <h3 className={(st["wrapper-title"], "h5")}>
      {title}
    </h3>
  )
}