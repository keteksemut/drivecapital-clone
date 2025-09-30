import { NextSeo } from 'next-seo';
import NextHead from 'next/head';

export function SeoHead({ title="", description="", image={
    url: "/images/og.jpg"
}, keywords=""}) {

    return (
        <>
            <NextHead>
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="index,follow" />
                <meta name="keywords" content={keywords && keywords.length ? keywords.join(",") : keywords} />
                <meta name="author" content="Studio Freight" />
                <meta name="referrer" content="no-referrer" />
                <meta name="format-detection" content="telephone=no" />
                <meta httpEquiv="x-dns-prefetch-control" content="off" />
                <meta httpEquiv="Window-Target" content="_value" />
                <meta name="geo.region" content="US" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#241ff3" />
                <meta name="msapplication-TileColor" content="#241ff3" />
                <meta name="theme-color" content="#241ff3" />
            </NextHead>
            <NextSeo
                title={`Drive Capital ${title ? `- ${title}` : ""}`}
                description={description}
                openGraph={{
                    title: `Drive Capital ${title ? `- ${title}` : ""}`,
                    description: description,
                    type: "website",
                    locale: "en_US",
                    images: [
                        {
                            url: image ? image.url : "",
                            width: image ? image.width : 1200,
                            height: image ? image.height : 630,
                            alt: title
                        }
                    ],
                    defaultImageWidth: 1200,
                    defaultImageHeight: 630,
                    site_name: "Drive Capital"
                }}
                twitter={{
                    handle: "@drivecapital",
                    site: "@drivecapital",
                    cardType: "summary_large_image"
                }}
            />
        </>
    );
}