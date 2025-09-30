import { EyeBrow } from "../eyebrow";
import { renderParagraphWithStyle } from "../renderers";
import dynamic from "next/dynamic";
import cn from "clsx";
import st from "../text-blocks/text-blocks.module.css";

const Arrow = dynamic(() => import('@/components/arrow').then(({ Button }) => Button), { ssr: false });

const Title = ({ title, className, titleColWidth }) => {
    return (
        <h5 className={cn(className, st.title)}
            style={{
                "--titleColWidth": titleColWidth
            }}
        >
            {title}
        </h5>
    );
};

const Annotation = ({ annotation }) => {
    return (
        <EyeBrow
            text={annotation}
            className={cn(st["left-top"], st["eye-brow"])}
        />
    );
};

const Cta = ({ text, url, className }) => {
    return (
        <Arrow
            href={url}
            className={cn(st["left-bottom"], st.cta, className)}
            icon={!0}>
            <p className="p uppercase">
                {text}
            </p>
        </Arrow>
    );
};

const Description = ({ description, className }) => {
    return (
        <div className={cn("p-l", st.description, st["full-right"], className)}>
            {renderParagraphWithStyle(description)}
        </div>
    );
};

export const InfoBlock = ({ children, className }) => {
    const i = children.find(e => e.type === Title);
    const n = children.find(e => e.type === Annotation);
    const c = children.find(e => e.type === Cta);
    const a = children.find(e => e.type === Description);
    return (
        <section
            className={cn(st['text-block'], className)}
        >
            {i && <Title {...i.props} />}
            <div
                className={cn('layout-grid', st.block)}
            >
                {n && <Annotation {...n.props} />}
                {c && <Cta {...c.props.cta} />}
                {a && <Description {...a.props} />}
            </div>
        </section>
    );
};

InfoBlock.Title = Title;
InfoBlock.Annotation = Annotation;
InfoBlock.Cta = Cta;
InfoBlock.Description = Description;