import fs from 'fs';
import path from 'path';
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store/useStore";
import Layout from "@/components/layout";
import Hero from "@/components/hero";
import { usePageAppear } from "@/hook/use-page-appear";
import dynamic from "next/dynamic";
import cn from "clsx"
import st from "./portfolio.module.css";

/*
const { PortfolioList, PortfolioGallery, Button: Arrow } = dynamic(
    () =>
        import('@/components/').then(
            (module) => module
        ),
    { ssr: false }
); */

const PortfolioList = dynamic(() => import('@/components/portfolio-list'), { ssr: false });
const PortfolioGallery = dynamic(() => import('@/components/portfolio-gallery'), { ssr: false });
const Arrow = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

export default function Portfolio({ portfolioData, portfolioList, theme, visible = !0 }) {
    const [h, x] = useState("list");
    const j = usePageAppear({ condition: visible });
    const N = useStore(({ Lenis }) => Lenis);

    return useEffect(() => {
        if (N)
            return "gallery" === h ? N.stost : N.start(),
                document.documentElement.classList.toggle("gallery", "gallery" === h),
                () => {
                    document.documentElement.classList.toggle("gallery", !1),
                        N.start()
                }
    }, [h, N]),


        (
            <div className={cn(st.main, j && st.appear)}>
                <Layout theme={theme} metadata={portfolioData.metadata} scroll={j} >
                    <PortfolioGallery
                        list={portfolioList}
                        onSwitch={() => x("list")}
                        visible={h === "gallery"}
                    />
                    <section className={cn(st.hero, "layout-block-inner")}>
                        <Hero data={portfolioData.hero} appear={j}>
                            <Hero.Title>
                                <div>
                                    <h1 className="font-fix">
                                        {portfolioData.hero.headline && (
                                            <>
                                                <span>{portfolioData.hero.headline}</span>
                                                {portfolioData.hero.annotation && (
                                                    <span className={cn(st.count, "h4")}>
                                                        {portfolioData.hero.annotation}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </h1>
                                </div>
                            </Hero.Title>
                            <Hero.Cta>
                                {portfolioData.hero.ctas.items.map((e, t) => (
                                    <Arrow key={t} className="cta" onClick={() => x("gallery")}>
                                        {e.text}
                                    </Arrow>
                                ))}
                            </Hero.Cta>
                            <Hero.Description>
                                {portfolioData.hero.description}
                            </Hero.Description>
                        </Hero>
                    </section>
                    <section className={st.list}>
                        <PortfolioList data={portfolioList} appear={j} />
                    </section>
                </Layout>
            </div>
        )
}

export async function getServerSideProps() {
  // Path to the JSON file
  const filePath = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

  // Read the JSON file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  // Pass the data as props to the component
  return {
    props: data,
  };
}