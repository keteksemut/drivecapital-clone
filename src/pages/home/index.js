import fs from 'fs';
import path from 'path';
import { usePageAppear } from "@/hook/use-page-appear";
import Layout from "@/components/layout";
import { LetterVideo } from "@/components/letter-video";
import { Marquee } from "@/components/marquee";
import { ImageReveal } from "@/components/image-reveal";
import { SectionHeader } from "@/components/section-header";
import { CitiesList } from "@/components/cities-lists";
import { DoubleImage } from "@/components/double-image";
import { DoubleMarquee, DoubleMarqueeMedia } from "@/components/double-marquee";
import dynamic from "next/dynamic";
import st from "./home.module.css";

const Label = dynamic(() => import('@/icons/Label.svg'), { ssr: false });
const ArrowIcons = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export default function Home({ homeData, theme, companiesByCity, visibe = true }) {
    const c = usePageAppear({
        condition: visibe
    });

    return (
        <Layout
            theme={theme}
            headerAppear={{ use: true, state: c }}
            metadata={homeData.metadata}
            scroll={c}
        >
 
            <section className={`${st.hero} layout-block-inner ${c && st.appear}`}>
                {homeData.heroHeadline.length > 0 && (
                    <h2 className={st.headline}>
                        {homeData.heroHeadline.map((e, t) => (
                            <span key={t} className="h6">
                                {e}
                            </span>
                        ))}
                    </h2>
                )}
                <div className={`${st['letter-video']} ${c && st.intro}`}>
                    <LetterVideo title="Drive" video={homeData.heroBackgroundVideo.url} />
                </div>
                {homeData.heroMarquee.length > 0 && (
                    <Marquee duration={20 * homeData.heroMarquee.length} className={st.marquee}>
                        {homeData.heroMarquee.map((e, t) => (
                            <p key={t} className="p-s">
                                {e}
                            </p>
                        ))}
                    </Marquee>
                )}
                {homeData.heroMedia.items.length > 0 && (
                    <div className={`${st['image-gallery']} layout-grid`}>
                        {homeData.heroMedia.items.map((e, t) => {
                            let { url: i, description: a } = e;
                            return (
                                <div key={`image-gallery-${t}`} className={st.image}>
                                    <ImageReveal
                                        src={i}
                                        alt={a || ''}
                                        fill
                                        sizes="(max-width: 800px) 43vw, 32vw"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className={st['story-block']}>
                <SectionHeader
                    className={st.heading}
                    headline={homeData.porfolioHeadline}
                    cta={homeData.portfolioCta}
                    description={homeData.portfolioDescription}
                />
                <CitiesList
                    cities={companiesByCity}
                    media={[homeData.portfolioMediaTop, homeData.portfolioMediaBottom]}
                    cta={homeData.cityListCta}
                />
            </section>

            <section className={st['team-block']}>
                <div className={st['team-image']}>
                    <DoubleImage images={homeData.teamMedia.items} />
                </div>
                <SectionHeader
                    headline={homeData.teamHeadline}
                    cta={homeData.teamCta}
                    description={homeData.teamDescription}
                    annotation={homeData.teamAnnotation}
                    firstSubtext={homeData.teamFirstSubtext}
                    secondSubtext={homeData.teamSecondSubtext}
                />
            </section>

            <DoubleMarquee
                topText={homeData.marqueeTopText}
                bottomText={homeData.marqueeBottomText}
                className={st['double-marquee']}
            >
                <DoubleMarqueeMedia
                    media={homeData.marqueeMedia.items[0]}
                    className={st['top-marquee-media']}
                />
                <DoubleMarqueeMedia
                    media={homeData.marqueeMedia.items[1]}
                    className={st['bottom-marquee-media']}
                />
            </DoubleMarquee>

            <section className={`${st.portfolio} layout-block`}>
                <div className={`${st.heading} layout-grid`}>
                    {homeData.storyAnnotation && (
                        <p className={`${st.label} p-s`}>
                            <Label /> {homeData.storyAnnotation}
                        </p>
                    )}
                    {homeData.storyHeadline && (
                        <h5 className={`${st.title} h5`}>{homeData.storyHeadline}</h5>
                    )}
                    {homeData.storyDescription && (
                        <p className={`${st.description} p-l`}>
                            {homeData.storyDescription}
                        </p>
                    )}
                    {homeData.storyCta.text && (
                        <ArrowIcons
                            href={homeData.storyCta.url}
                            className={`${st.cta} cta`}
                        >
                            {homeData.storyCta.text}
                        </ArrowIcons>
                    )}
                    <div className={st.line} />
                    <div className={st.line} />
                </div>
            </section>

            {homeData.storyMedia.items.length > 0 && (
                <section className={`${st.prefooter} layout-grid`}>
                    {homeData.storyMedia.items[0].url && (
                        <div className={st.image}>
                            <ImageReveal
                                src={homeData.storyMedia.items[0].url}
                                alt={homeData.storyMedia.items[1].description || ''}
                                fill
                                sizes="(max-width: 800px) 43vw, 31vw"
                            />
                        </div>
                    )}
                    {homeData.storyMedia.items[1].url && (
                        <div className={st.image}>
                            <ImageReveal
                                src={homeData.storyMedia.items[1].url}
                                alt={homeData.storyMedia.items[0].description || ''}
                                fill
                                sizes="(max-width: 800px) 43vw, 63vw"
                            />
                        </div>
                    )}
                </section>
            )}

        </Layout>
    );
};

export async function getStaticProps() {
    // Path to the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'home.json');

    // Read the JSON file
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Pass the data as props to the component
    return {
        props: data,
    };
}