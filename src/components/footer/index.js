import { Button } from "../button";
import { useForm } from "react-hook-form";
import { useStore } from "@/lib/store/useStore";
import { Link } from "../link";
import { Lottie } from "../lottie";
import { useJsonp } from "@/hook/useJsonp";
import dynamic from "next/dynamic";
import lottieData from "../../../public/animationData.json";
import st from "./footer.module.css";

const ResponseMsg = ({ result, msg }) => {
    if (!result || !msg)
        return null;
    let k = msg.includes("is already subscribed to list") ? msg.split(" <a href=")[0] : msg;
    return (
        <p
            style={{ color: "success" === result ? "inherit" : "#ff0000" }}
            className={`${st["mailchimp-message"]} p-s`}>
            {k}
        </p>
    )
};

const IsoLogoSymbol = dynamic(() => import('@/icons/IsoLogoSymbol.svg'), { ssr: false });
const Twitter = dynamic(() => import('@/icons/Twitter.svg'), { ssr: false });
const Email = dynamic(() => import('@/icons/Email.svg'), { ssr: false });
const LinkedIn = dynamic(() => import('@/icons/LinkedIn.svg'), { ssr: false });
const Youtube = dynamic(() => import('@/icons/Youtube.svg'), { ssr: false });

export const Footer = ({ className }) => {
    const t = useStore(a => a.footerData);
    const { register, handleSubmit, reset } = useForm();
    const [o, n] = useJsonp({
        url: ""
    });
    const { data } = o;

    return (
        <footer className={`${st.footer} ${className}`}>
            <div className={`layout-block-inner ${st.inner}`}>
                {t.headline && (
                    <h3 className={`${st.title} h6`}>{t.headline}</h3>
                )}
                {t.lottieAsset.url && (
                    <div className={st["lottie-map"]}>
                        <Lottie
                            className={st.lottie}
                            animation={lottieData}
                            speed={0.7}
                            loop={false}
                            viewThreshold={0.5}
                        />
                    </div>
                )}
                <div className={`${st["inner-bottom"]} layout-grid`}>
                    <form
                        className={st.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(({ BOT, EMAIL }) => {
                                if (BOT) {
                                    alert("Please don't do it");
                                } else {
                                    n({ EMAIL: EMAIL });
                                    setTimeout(() => {
                                        reset();
                                    }, 2000);
                                }
                            })(e);
                        }}
                    >
                        <p className="p-s">SUBSCRIBE TO OUR NEWSLETTER</p>
                        <input
                            {...register("BOT", { required: false })}
                            type="checkbox"
                            name="BOT"
                            style={{ opacity: 0, position: "absolute", left: "-9999px" }}
                        />
                        <input
                            {...register("EMAIL", { required: true })}
                            type="email"
                            name="EMAIL"
                            id="mce-EMAIL"
                            className={`${st.input} cta`}
                            placeholder="YOUR@EMAIL.COM"
                        />
                        {data && <ResponseMsg {...data} />}
                        <button
                            className={st.submit}
                            id="submit"
                            aria-label="submit Form"
                            type="submit"
                        >
                            <svg
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="19.5"
                                    stroke="var(--theme-secondary)"
                                />
                                <path
                                    d="M19.6572 9.98193L29.8157 20.1404L19.6572 30.2988"
                                    stroke="var(--theme-secondary)"
                                />
                                <path
                                    d="M29.6176 20.1749H10.8942"
                                    stroke="var(--theme-secondary)"
                                />
                            </svg>
                        </button>
                    </form>
                    {t.leftLinksColumnCollection.items.length > 0 && (
                        <ul className={`${st["left-nav"]} p-s`}>
                            {t.leftLinksColumnCollection.items.map(({ text, url }, i) => {
                                return (
                                    <li key={`left-column-${i}`}>
                                        <Link className="link" href={url}>
                                            {text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    {t.rightLinksColumnCollection.items.length > 0 && (
                        <ul className={`${st["right-nav"]} p-s`}>
                            {t.rightLinksColumnCollection.items.map((a, i) => {
                                const { text, url } = a;
                                return (
                                    <li key={`right-column-${i}`}>
                                        <Link className="link" href={url}>
                                            {text}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <IsoLogoSymbol className={st["iso-logo"]} />
                </div>
            </div>
            <div className={`${st.bottom} layout-grid`}>
                {t.socialLinksCollection.items.length > 0 && (
                    <div className={st.social}>
                        {t.socialLinksCollection.items.map((a, i) => {
                            const { url } = a;
                            return (
                                <Button key={`social-link-${i}`} className={st.icon} href={url}>
                                    {url.includes("twitter") && <Twitter />}
                                    {url.includes("@") && <Email />}
                                    {url.includes("linkedin") && <LinkedIn />}
                                    {url.includes("youtube") && <Youtube />}
                                </Button>
                            );
                        })}
                    </div>
                )}
                <p className={`${st.address} p-s`}>
                    629 N. HIGH STREET COLUMBUS, OH 43215
                </p>
                <p className={`${st.date} p-s`}>
                    © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    )
};