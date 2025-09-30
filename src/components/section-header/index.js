import dynamic from "next/dynamic";
import cn from "clsx";
import st from "./section-header.module.css";

const Arrow = dynamic(() => import('@/components/arrow').then((module) => module.Button), { ssr: false });
const Label = dynamic(() => import('@/icons/Label.svg'), { ssr: false });

export const SectionHeader = ({ headline, cta, icon, description, annotation, firstSubtext, secondSubtext, className, notLine }) => {
        return (
            <div className={cn(st['section-header'], className)}>
                <div className={cn(st.heading, 'layout-grid', notLine && st.notLine)}>
                    <div className={st.left}>
                        {headline && <h5 className="h5">{headline}</h5>}
                        {cta?.text && (
                            <Arrow
                                icon={!!icon}
                                href={cta.url}
                                className="cta hide-on-mobile"
                            >
                                {cta.text}
                            </Arrow>
                        )}
                    </div>
        
                    {description && (
                        <aside className={cn(st.description, 'p-l')}>
                            {description}
                        </aside>
                    )}
        
                    {cta && (
                        <Arrow
                            iconDirection={true}
                            href={cta.url}
                            className={cn(st.cta, 'cta hide-on-desktop')}
                        >
                            {cta.text}
                        </Arrow>
                    )}
                </div>
        
                <div className={cn(st['bottom-columns-text'], 'layout-grid')}>
                    {annotation && (
                        <p className={cn(st.eyebrow, 'p-s')}>
                            <Label /> {annotation}
                        </p>
                    )}
        
                    {firstSubtext && (
                        <p className={cn(st.left, 'p')}>
                            {firstSubtext}
                        </p>
                    )}
        
                    {secondSubtext && (
                        <p className={cn(st.right, 'p')}>
                            {secondSubtext}
                        </p>
                    )}
                </div>
            </div>
        )
    };