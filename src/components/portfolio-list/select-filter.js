import { useStore } from "@/lib/store/useStore";
import { forwardRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
  SelectViewport
} from "@radix-ui/react-select";
import cn from "clsx"
import st from "./select-filter.module.css"

const SelectFilterItem = forwardRef(function ({ children, ...restProps }, t) {
  return (
    <SelectItem
      id={children}
      className={cn(st.item, 'p-s')}
      {...restProps}
      ref={t}
    >
      <SelectItemText>{children}</SelectItemText>
    </SelectItem>
  );
});

const SelectFilter = forwardRef(function ({ children, ...restProps }, t) {
  const n = useStore(({ Lenis }) => Lenis);
  const p = useStore(({ HeaderHeight }) => HeaderHeight);
  const d = useCallback(() => {
    if (!n) return;
    n.scrollTo(document.querySelector(restProps.parentId), { offset: -1.5 * p });
  }, [n, p]);

  return (
    <div style={{ position: "relative" }}>
      <Select
        {...restProps}
        onValueChange={(e) => {
          restProps.onValueChange(e);
          d();
        }}
      >
        <SelectTrigger className={cn(st.filter, "p-s")} ref={t}>
          <SelectValue placeholder={restProps.placeholder ?? "Pick an option"} />
          <SelectIcon>
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 11L0.937822 0.5L13.0622 0.500001L7 11Z"
                fill="#F1F0EA"
              />
            </svg>
          </SelectIcon>
        </SelectTrigger>
        <SelectContent className={st.content}>
          <SelectViewport>{children}</SelectViewport>
        </SelectContent>
      </Select>
    </div>
  );
});

export { SelectFilter, SelectFilterItem };