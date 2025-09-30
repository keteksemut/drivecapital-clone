import fs from 'fs';
import path from 'path';
import { useWindowSize } from "react-use";
import { renderParagraphWithLink } from "@/components/renderers";
import dynamic from "next/dynamic";
import Layout from "@/components/layout";
import Hero from "@/components/hero";
import { DoubleImage } from "@/components/double-image";
import { Marquee } from "@/components/marquee";
import { SectionHeader } from "@/components/section-header";
import { ImageReveal } from "@/components/image-reveal";
import { Testimonials } from "@/components/testimonials";
import { CitiesListSeed } from "@/components/cities-list-seed";
import { GmTeamGrid } from "@/components/gm-team-grid";
import cn from "clsx";
import st from "./seed-program.module.css";

const Arrow = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export default function SeedProgram({ seedFundData, managers, theme, visible = !0 }) {
    const c = useWindowSize({
        condition: visible
    });

    return (
        <Layout theme={theme} metadata={seedFundData.metadata} scroll={c}>
            <div className={st.main}>
                <section className={st.hero}>
                    <Hero data={seedFundData.hero} appear={c}>
                        <Hero.Title>
                            <h1 className="h2 font-fix">
                                <span>{seedFundData.heroTitle}</span>
                            </h1>
                        </Hero.Title>
                        <Hero.Cta>
                            {seedFundData.heroCta && (
                                <Arrow
                                    className={cn(st.cta, "cta")}
                                    href={seedFundData.heroCta.url}
                                    icon
                                    iconDirection="north"
                                >
                                    {seedFundData.heroCta.text}
                                </Arrow>
                            )}
                        </Hero.Cta>
                        <Hero.Description>
                            <div className={st.description}>
                                {renderParagraphWithLink(seedFundData.heroDescription)}
                            </div>
                        </Hero.Description>
                    </Hero>
                    <div className={cn(st["first-fold"], c && st.appear)}>
                        {seedFundData.heroMarquee.length > 0 && (
                            <Marquee
                                duration={10 * seedFundData.heroMarquee.length}
                                className={cn(st.marquee, "layout-block")}
                                repeat={3}
                            >
                                {seedFundData.heroMarquee.map((e, s) => (
                                    <h2 className="h6" key={s}>
                                        {e}
                                    </h2>
                                ))}
                            </Marquee>
                        )}
                        <div className={st["hero-media"]}>
                            <DoubleImage images={seedFundData.heroMedia.items} />
                        </div>
                    </div>
                </section>
                <section className={cn(st.overview, "layout-block")}>
                    <SectionHeader
                        notLine
                        className={st.heading}
                        headline={seedFundData.overviewHeadline}
                        description={seedFundData.overviewDescription}
                    />
                    <div className={st.image}>
                        <ImageReveal
                            src={seedFundData.overviewMedia.url}
                            alt={seedFundData.overviewMedia.description || ""}
                            fill
                            sizes="(max-width: 800px) 87vw, 96vw"
                        />
                    </div>
                </section>
                <section className={cn(st.cities, "layout-block")}
                >
                    <SectionHeader
                        className={st.heading}
                        headline={seedFundData.citiesHeadline}
                        description={seedFundData.citiesDescription}
                        cta={seedFundData.citiesCta}
                        icon
                    />
                    <div className={st["cities-list"]}>
                        <CitiesListSeed cities={seedFundData.cities.items} />
                    </div>
                </section>
                <section id="team" className={st.team}>
                    <GmTeamGrid title="General Managers" data={managers} />
                </section>
                <section className={st.testimonials}>
                    <Testimonials
                        appear={c}
                        items={seedFundData.quotesItems.items}
                        title={seedFundData.quotesTitle}
                    />
                </section>
                <section
                    className={cn(st.prefooter, "layout-block")}
                >
                    <div className={st.image}>
                        <ImageReveal
                            src={seedFundData.prefooterMedia.url}
                            alt={seedFundData.prefooterMedia.description || ""}
                            fill
                            sizes="(max-width: 800px) 87vw, 96vw"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
};

export async function getStaticProps() {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'seed-program.json');

    // Read the JSON file
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Pass the data as props to the component
    return {
        props: data,
    };
};