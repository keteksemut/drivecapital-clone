import fs from 'fs';
import path from 'path';
import { usePageAppear } from "@/hook/use-page-appear";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import Layout from "@/components/layout";
import { HeroMarquee } from "@/components/hero-marquee";
import { TextBlockFull, TextBlocks, TextBlocksInverted } from '@/components/text-blocks';
import { TextScroll } from '@/components/text-scroll';
import { ImageReveal } from "@/components/image-reveal";
import { InfoBlock } from '@/components/info-block';
import { DoubleMarquee, DoubleMarqueeMedia } from "@/components/double-marquee";
import { Link } from "@/components/link";
import pageProps from "@/data/our-story.json";
import dynamic from "next/dynamic";
import cn from "clsx"
import st from "./our-story.module.css"

const Parallax = dynamic(() => import('@/components/parallax/index').then((mod) => mod.Parallax), { ssr: false });

export default function OurStory({ ourStoryData: t, theme: r, visible: h = !0 }) {
  const x = usePageAppear({
    condition: h
  })
  const p = useMediaQuery("(max-width: 800px)");

  return (
    <Layout theme={r} metadata={t.metadata} scroll={x}>
      <div className={st.hero}>
        <HeroMarquee title={t.heroTitle} appear={x} />
      </div>

      <TextBlocks
        leftTop={t.introText}
        title={t.introTitle}
        videoLink={t.introVideoLink}
        videoPlaceholder={t.introVideoPlaceholder}
        annotation={t.introAnnotation}
        description={t.introDescription}
        className={cn(st.overview, { [st.show]: x })}
        imageThreshold={0}
      />

      <TextBlocksInverted
        title={t.textRightImageLeftTitle}
        link={t.textRightImageLeftVideoLink}
        media={t.textRightImageLeftVideoPlaceholder}
        annotation={t.textRightImageLeftAnnotation}
        text={t.textRightImageLeftText}
      />

      <section className={cn(st["giant-quote-left"], "layout-block-inner")}>
        <TextScroll className="h2">“</TextScroll>
        <TextScroll className={cn("h2", st.quote)}>{t.giantQuoteLeftText}</TextScroll>

        <div className={st["top-image"]}>
          <Parallax speed={0.75}>
            <ImageReveal
              src={t.giantQuoteMedia.items[0].url}
              alt={t.giantQuoteMedia.items[0].description || ""}
              fill
              sizes="(max-width: 800px) 43vw, 32vw"
            />
          </Parallax>
        </div>

        <div className={st["bottom-image"]}>
          <Parallax speed={-0.75}>
            <ImageReveal
              src={t.giantQuoteMedia.items[1].url}
              alt={t.giantQuoteMedia.items[1].description || ""}
              fill
              sizes="(max-width: 800px) 43vw, 32vw"
            />
          </Parallax>
        </div>
      </section>

      <InfoBlock className={st["first-text-block"]}>
        <InfoBlock.Title
          titleColWidth={p ? "3" : "4"}
          className={cn("h5", st["first-text-block-title"])}
          title={t.firstTextBlock.title}
        />
        <InfoBlock.Annotation annotation={t.firstTextBlock.annotation} />
        <InfoBlock.Description description={t.firstTextBlock.description} />
        <InfoBlock.Cta cta={t.firstTextBlock.cta} />
      </InfoBlock>

      <TextBlocks
        title={t.textLeftImageRightTitle}
        videoPlaceholder={t.textLeftImageRightMedia}
        annotation={t.textLeftImageRightAnnotation}
        description={t.textLeftImageRightDescription}
        cta={t.textLeftImageRightCta}
      />

      <section className={cn(st["giant-quote-right"], "layout-grid-inner")}>
        <div className={st.aside}>
          <TextScroll className="h2">“</TextScroll>
          <div className={st.image}>
            <Parallax speed={0.75}>
              <ImageReveal
                src={t.giantQuoteRightMedia.url}
                alt={t.giantQuoteRightMedia.description || ""}
                fill
                sizes="(max-width: 800px) 40vw, 32vw"
              />
            </Parallax>
          </div>
        </div>
        <TextScroll className={cn("h2", st.quote)}>{t.giantQuoteRightText}</TextScroll>
      </section>

      <TextBlocks
        title={t.secondTextLeftImageRightTitle}
        videoPlaceholder={t.secondTextLeftImageRightMedia}
        annotation={t.secondTextLeftImageRightAnnotation}
        description={t.secondTextLeftImageRightDescription}
        cta={t.secondTextLeftImageRightCta}
      />

      <TextBlockFull
        text={t.fullWidthImageBlockText}
        title={t.fullWidthImageBlockTitle}
        videoLink={t.fullWidthImageBlockVideoLink}
        annotation={t.fullWidthImageBlockAnnotation}
        media={t.fullWidthImageBlockVideoPlaceholder}
      />

      <InfoBlock className={st["third-text-block"]}>
        <InfoBlock.Title
          titleColWidth={p ? "3" : "5"}
          className="h5"
          title={t.thirdTextBlock.title}
        />
        <InfoBlock.Annotation annotation={t.thirdTextBlock.annotation} />
        <InfoBlock.Description description={t.thirdTextBlock.description} />
        <InfoBlock.Cta cta={t.thirdTextBlock.cta} />
      </InfoBlock>

      <DoubleMarquee topText={[t.twoLineMarquee[0]]} bottomText={[t.twoLineMarquee[1]]} className={st.marquee}>
        <DoubleMarquee.Media media={t.twoLineMarqueeMedia} className={st["marquee-media"]} />
      </DoubleMarquee>

      <section className={cn(st.prefooter, "layout-block")}>
        {t.prefooter.items.map((item, index) => (
          <Link key={index} href={item.link.url} className={st.image}>
            <h5 className={cn(st["image-title"], "h5")}>{item.link.text}</h5>
            <ImageReveal
              src={item.media.url}
              alt={item.media.description || ""}
              fill
              sizes="(max-width: 800px) 87vw, 47vw"
            />
          </Link>
        ))}
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'src', 'data', 'our-story.json');

  // Read the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  // Pass the data as props to the component
  return {
    props: data,
  };
}