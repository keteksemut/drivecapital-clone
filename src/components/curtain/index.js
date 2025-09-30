import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import styles from "./curtain.module.css";

export default function Curtain({ Component, pageProps }) {
  const curtainRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      gsap.timeline()
        .to(curtainRef.current, {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 0.8,
          ease: "expo.out",
        })
        .set(curtainRef.current, { scaleY: 0 }, "+=0.2");
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className={styles.curtain} ref={curtainRef} />
      <Component {...pageProps} />
    </>
  );
}