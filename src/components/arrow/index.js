import { useMediaQuery } from "@darkroom.engineering/hamo";
import { Link } from "../link";
import st from "./arrow.module.css";

export const Button = ({
    children,
    href,
    className,
    icon,
    iconDirection = "southeast",
    fill,
    hovering,
    ...props
}) => {
    const content = (
        <span className={st.text}>
            {children}{" "}
            {icon && <Arrow className={st[iconDirection]} />}
        </span>
    );

    if (href) {
        return (
            <Link href={href}
                className={`${st.button} ${hovering && st.hover} ${icon && st.icon} ${fill && st.fill} ${className}`}
                {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button className={`${st.button} ${hovering && st.hover} ${icon && st.icon} ${fill && st.fill} ${className}`} {...props}>
            {content}
        </button>
    );
};

export const Arrow = ({ className }) => {
    const isSmallScreen = useMediaQuery("(max-width: 800px)");

    if (!isSmallScreen) {
        return (
            <span className={st["svg-wrapper"]}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${className} ${st.leave}`}
                >
                    <path
                        d="M7.77539 7.7746L16.3951 7.7746V16.3943"
                        stroke="currentColor"
                    />
                    <path
                        d="M16.3255 7.8736L8.38184 15.8173"
                        stroke="currentColor"
                    />
                </svg>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${className} ${st.enter}`}
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="11.5"
                        stroke="var(--theme-hover)"
                    />
                    <path
                        d="M7.77539 7.7746L16.3951 7.7746V16.3943"
                        stroke="var(--theme-hover)"
                    />
                    <path
                        d="M16.3255 7.8736L8.38184 15.8173"
                        stroke="var(--theme-hover)"
                    />
                </svg>
            </span>
        );
    }

    return (
        <svg
            className={`${className} ${st["svg-wrapper"]}`}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="7" cy="7" r="6.5" stroke="currentColor" />
            <path
                d="M4.53516 4.53516H9.56333V9.56333"
                stroke="currentColor"
            />
            <path
                d="M9.52247 4.59277L4.88867 9.22658"
                stroke="currentColor"
            />
        </svg>
    );
};