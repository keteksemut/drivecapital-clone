import { useStore } from "@/lib/store/useStore";
import { isItEqual } from "@/lib/store/isItEqual";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import { Link } from "../link";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./navigation.module.css";

// Dynamically import icons in one go
const [Twitter, Email, Linkedin, Youtube] = [
  dynamic(() => import('@/icons/Twitter.svg'), { ssr: false }),
  dynamic(() => import('@/icons/Email.svg'), { ssr: false }),
  dynamic(() => import('@/icons/LinkedIn.svg'), { ssr: false }),
  dynamic(() => import('@/icons/Youtube.svg'), { ssr: false }),
];

export const Navigation = ({ data, className }) => {
  const [navIsOpen, setNavIsOpen] = useStore((state) => [state.navIsOpen, state.setNavIsOpen], isItEqual);
  const lenis = useStore((state) => state.lenis);
  const router = useRouter();

  // Memoize the event handler for route changes
  const handleRouteChange = useCallback(() => setNavIsOpen(false), [setNavIsOpen]);

  // Side effect to control lenis behavior
  useEffect(() => {
    if (lenis) {
      navIsOpen ? lenis.stop() : lenis.start();
    }
  }, [navIsOpen, lenis]);

  // Set up route change listener
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [handleRouteChange, router.events]);

  // Function to render social media icons based on URL
  const renderSocialIcon = (url) => {
    if (url.includes("twitter")) return <Twitter />;
    if (url.includes("@")) return <Email />;
    if (url.includes("linkedin")) return <Linkedin />;
    if (url.includes("youtube")) return <Youtube />;
    return null;
  };

  return (
    <div className={cn(st.menu, !navIsOpen && st.closed, className)}>
      <div className={st.navigation}>
        {data.navigationLinks.items.map(({ text, url }, index) => (
          <Link key={`nav-item-${url}`} className={cn(st.link, "h5")} href={url}>
            <span className="p-s">{`0${index + 1}`}</span>
            {text}
          </Link>
        ))}
      </div>
      <div className={st.social}>
        {data.socialMedia.items.map(({ url }, index) => (
          <Link key={`social-media-item-${url}`} className={cn(st.icon, "h5")} href={url}>
            {renderSocialIcon(url)}
          </Link>
        ))}
      </div>
    </div>
  );
};
