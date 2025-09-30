import { useState, useRef, useCallback, cloneElement } from "react";
import { useStore } from "@/lib/store/useStore";
import { useClickOutside } from "@/hook/useClickOutside";
import cn from "clsx";
import st from "./multi-select.module.css"

const MultiSelectItem = ({ element, onClick }) => {
    const [s, i] = useState(!1);
    return (
        <div className={st.item}
            onClick={() => {
                onClick(element, s),
                    i(!s)
            }}
        >
            <div className={cn(st.box, s && st.marked)} />
            <p className="p-s">
                {element}
            </p>
        </div>
    )
};

const MultiSelect = ({ children, placeholder, onValueChange, value, parentId }) => {
    const lenis = useStore((state) => state.lenis);
    const headerHeight = useStore((state) => state.headerHeight);
    const ref = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const filteredChildren = Array.isArray(children)
        ? children.filter((child) => child.type === MultiSelectItem)
        : [[children].find((child) => child.type === MultiSelectItem)];

    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    const scrollToParent = useCallback(() => {
        if (!lenis) return;
        const parentElement = document.querySelector(parentId);
        lenis.scrollTo(parentElement, { offset: -1.5 * headerHeight });
    }, [lenis, headerHeight]);

    return (
        <div className={st.wrapper} ref={ref}>
            <div className={st.button} onClick={() => setIsOpen(!isOpen)}>
                <p className="p-s">{placeholder}</p>
                <svg
                    className={cn(st.arrow, isOpen && st.rotate)}
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w4.org/2000/svg"
                >
                    <path d="M7 11L0.937822 0.5L13.0622 0.500001L7 11Z" fill="#F1F0EA" />
                </svg>
            </div>
            <div className={cn(st.dropdown, isOpen && st.open)}>
                {filteredChildren.map((child, index) => (
                    <MultiSelectItem
                        key={`item-${index}`}
                        element={child.props.children}
                        onClick={(itemValue, isSelected) => {
                            scrollToParent();
                            let newValue = [...value];
                            if (isSelected) {
                                newValue = value.filter((v) => v !== itemValue);
                            } else {
                                newValue.push(itemValue);
                            }
                            onValueChange([...new Set(newValue)]);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

MultiSelect.Item = MultiSelectItem;

export default MultiSelect;
