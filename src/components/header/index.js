import { forwardRef } from "react";
import { useStore } from "@/lib/store/useStore";
import { isItEqual } from "@/lib/store/isItEqual";
import { shallow } from "zustand/shallow";
import { Link } from "../link";
import { Navigation } from "../navigation";
import dynamic from "next/dynamic";
import st from "./header.module.css";

const IsoLogoText = dynamic(() => import('@/icons/IsoLogoText.svg'), { ssr: false });
const IsoLogoSymbol = dynamic(() => import('@/icons/IsoLogoSymbol.svg'), { ssr: false });

export const Header = forwardRef(({ isoLogo, appear, className }, i) => {
    const [s, o] = useStore(a => [a.navIsOpen, a.setNavIsOpen], shallow);

    const n = useStore(a => a.headerData);

    return (
        <header
            className={`${st.header} ${appear.use && st.hide} ${appear.state && st.appear}`}
            ref={i}
        >
            <Navigation className={`${className} hide-on-desktop`} data={n} />
            <div className={`${st.head} layout-block`}>
                <Link href="/">
                    {isoLogo ? (
                        <IsoLogoSymbol className={st["iso-logo"]} />
                    ) : (
                        <IsoLogoText className={st.logo} />
                    )}
                </Link>
                <div className={st.menu}>
                    <nav
                        className={`${st.nav} ${s && st.open} p-s`}
                        aria-hidden={!s}
                        onClick={() => o(!s)}
                    >
                        {n.navigationLinks.items.map(({ text, url }, i) => {
                            return (
                                <Link
                                    key={`nav-item-${i}`}
                                    className={st.item}
                                    style={{
                                        "--i": n.navigationLinks.items.length - i,
                                    }}
                                    href={url}
                                >
                                    <span className={st.text}>{text}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <button
                        id="nav-menu-header"
                        aria-label="toggle navigation"
                        onClick={() => o(!s)}
                        className={`${st["menu-button"]} ${s && st.open}`}
                    >
                        <div />
                        <div />
                        <div />
                    </button>
                </div>
            </div>
        </header>
    )
});