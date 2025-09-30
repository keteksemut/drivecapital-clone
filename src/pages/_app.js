import { useDebug } from "@darkroom.engineering/hamo";
import { useState, useEffect, useRef } from "react";
import FixFoucStyles from "@/lib/fixFoucStyles";
import { useStore } from "@/lib/store/useStore";
import { ServerOnly } from "@/components/isomorphic";
import { isItEqual } from "@/lib/store/isItEqual";
import { useMediaQuery } from "@darkroom.engineering/hamo";
import Curtain from "@/components/curtain";
import { usePageAppear } from "@/hook/use-page-appear";
import { useTimeout } from "react-use";
import gsap from "gsap";
import Tempus from "tempus";
import dynamic from "next/dynamic";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import st from "./_app.module.css";
import "@/styles/globals.css";

const Leva = dynamic(
  () =>
    import('leva').then(({ Leva }) => Leva),
  { ssr: false }
);

const Stats = dynamic(
  () =>
    import('@/components/debug/stats').then(({ Stats }) => Stats),
  { ssr: false }
);

const GridDebugger = dynamic(
  () =>
    import('@/components/debug/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
);

const RealViewport = dynamic(
  () =>
    import('@/components/realviewport').then(({ RealViewport }) => RealViewport),
  { ssr: false }
);

App.getInitialProps = async (e) => {
  // Define header data
  const headerData = {
    internalTitleReference: "Drive Capital Header",
    navigationLinks: {
      items: [
        { text: "Portfolio", url: "/portfolio" },
        { text: "Story", url: "/our-story" },
        { text: "Team", url: "/team" },
        { text: "Careers", url: "/careers" },
        { text: "Talent", url: "/talent" },
        { text: "Seed Program", url: "/seed-program" },
      ],
    },
    socialMedia: {
      items: [
        { url: "https://www.linkedin.com/company/drivecapital/" },
        { url: "https://twitter.com/drivecapital" },
        { url: "https://www.youtube.com/c/DriveCapital" },
      ],
    },
  };

  // Define footer data
  const footerData = {
    internalTitleReference: "Drive Capital Footer",
    headline: "THE GREATEST EMERGING MARKET FOR VC IS AMERICA",
    lottieAsset: {
      url: "/animationData.json",
      description: "",
      width: 1656,
      height: 865,
    },
    leftLinksColumnCollection: {
      items: [
        { text: "Portfolio", url: "/portfolio" },
        { text: "Story", url: "/our-story" },
        { text: "Team", url: "/team" },
        { text: "Careers", url: "/careers" },
        { text: "Talent", url: "/talent" },
      ],
    },
    rightLinksColumnCollection: {
      items: [
        { text: "Media Kit", url: "/media-kit" },
        { text: "Diversity Reports", url: "/diversity" },
        { text: "Contact", url: "mailto:info@drivecapital.com" },
        { text: "Investor Login", url: "https://drive-capital.lpx.fund/" },
        { text: "Seed Program", url: "/seed-program" },
      ],
    },
    socialLinksCollection: {
      items: [
        {
          url: "https://www.linkedin.com/company/drivecapital/",
          text: "LinkedIn",
        },
        { url: "https://twitter.com/drivecapital", text: "Twitter" },
        { url: "https://www.youtube.com/c/DriveCapital", text: "YouTube" },
      ],
    },
  };

  return {
    headerData,
    footerData,
  };
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.remove(gsap.updateRoot);

  Tempus.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
}

// function Curtain({ Component: T, pageProps: n }) {
//   const r = useRef();
//   const [i] = useStore(e => [e.setOverflow], isItEqual);
//   const [s, a] = useState([]);
//   const o = useRef();
//   const u = useRef();

//   function l() {
//     i(!0),
//       window.scrollTo(0, 0),
//       o.current = null,
//       u.current = null,
//       a(e => e.length > 1 ? e.slice(-(e.length - 1)) : e)
//   }

//   useEffect(() => {
//     i(!1),
//       a(e => {
//         return (e[e.length - 1]?.Component === T) && (e[e.length - 1]?.pageProps?.key === n?.key) ? e : [...e, {
//           Component: T,
//           pageProps: n
//         }]
//       })
//       console.log("s in curtain:", s);
//   }, [T, n]);

//   const c = useMediaQuery("(max-width: 800px)");

//   return (
//     useEffect(() => {
//       if (c && l(), s.length <= 1) return;

//       const p = s[0]?.Component?.render?.displayName;
//       const m = s[0]?.Component?.render?.displayName;
//       const g = o.current;
//       const _ = u.current;
//       const y = g?.props;
//       const T = g?.animateOut;
//       const x = _?.animateIn;

//       if (x && T && p !== m)
//         Promise.all([T({
//           from: p,
//           to: m
//         }), x({
//           from: p,
//           to: m,
//           props: y
//         })]).then(() => {
//           l()
//         })
//       else {
//         const e = s[1]?.pageProps?.theme;
//         r.current.className = "".concat(st.curtain, " theme-").concat(e),
//           new gsap.timeline().to(r.current, {
//             scaleY: 1,
//             transformOrigin: "bottom",
//             duration: 1.2,
//             ease: "expo.out"
//           }).call(() => {
//             l()
//           }).set(r.current, {
//             scaleY: 0
//           }, "+=0.25")
//       }
//     }, [s, c]),

//     <>
//       <div className={st.curtain} ref={r} />
//       <ServerOnly>
//         <T {...n} />
//       </ServerOnly>

//       {s.map((e, t) => {
//         const { Component: R, pageProps: i } = e;

//         return (
//           <div
//             style={t === 1 ? { position: 'fixed', top: 0, left: 0, zIndex: 1, width: '100%' } : { position: 'relative', zIndex: 2 }}
//             key={R?.render?.displayName + i?.key || t}
//           >
//             <R
//               {...i}
//               visible={s.length <= 1}
//               innerRef={(e) => t === 0 ? o.current = e : u.current = e}
//             />
//           </div>
//         );
//       })}
//     </>
//   )
// }

export default function App({ Component, pageProps, headerData, footerData }) {
  // Apply FOUC fix
  // FixFoucStyles();

  // Hooks
  const debug = useDebug();
  const lenis = useStore(({ Lenis }) => Lenis);
  const overflow = useStore(({ overflow }) => overflow);
  const setHeaderData = useStore(state => state.setHeaderData);
  const setFooterData = useStore(state => state.setFooterData);
  const [initialized, setInitialized] = useState(false);
  const isReady = usePageAppear();

  // Initialize header and footer data
  if (!initialized) {
    setHeaderData(headerData);
    setFooterData(footerData);
    setInitialized(true);
  }

  // Handle overflow changes
  useEffect(() => {
    if (overflow) {
      lenis?.start();
      document.documentElement.style.removeProperty("overflow");
    } else {
      lenis?.stop();
      document.documentElement.style.setProperty("overflow", "hidden");
    }
  }, [lenis, overflow]);

  // Refresh ScrollTrigger when lenis updates
  useEffect(() => {
    if (lenis) {
      ScrollTrigger.refresh();
    }
  }, [lenis]);

  // Add loaded class when ready
  useEffect(() => {
    if (isReady) {
      document.documentElement.classList.add("loaded");
    }
  }, [isReady]);

  // Set ScrollTrigger defaults
  ScrollTrigger.defaults({
    markers: false
  });

  return (
    <>
      <Leva hidden={!debug} />
      {debug && (
        <>
          <GridDebugger />
          <Stats />
        </>
      )}
      <RealViewport />
      <Curtain
        Component={Component}
        pageProps={pageProps}
      />
      {/* <Curtain>
        <Component {...pageProps} />
      </Curtain> */}
    </>
  );
}