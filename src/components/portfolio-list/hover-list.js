import cn from "clsx";
import st from "./hover-list.module.css";

function Arrow({ className }) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(st.arrow, className)}
      >
        <circle cx="12" cy="12" r="11.5" stroke="currentColor" />
        <path d="M7.77539 7.7746L16.3951 7.7746V16.3943" stroke="currentColor" />
        <path d="M16.3255 7.8736L8.38184 15.8173" stroke="currentColor" />
      </svg>
    );
  }

function Item({ text: t, className: r }) {
  return <p className={cn(r, st.item)}>{t}</p>;
}

function Root({ children }) {
  return children;
}

function HoverList({ children, visible }) {
  const rootChild = [children].find((e) => e.type === Root);
  const itemChildren = Array.isArray(children)
    ? children.filter((e) => e.type === Item)
    : [[children].find((e) => e.type === Item)];
  const arrowChild = [children].find((e) => e.type === Arrow);

  return (
    <div className={cn(st.wrapper, visible && st.visible)}>
      {rootChild && (
        <Root>
          {children}
          {itemChildren.map((e, t) => (
            <Item
              key={`item-${t}`}
              text={e?.props.text}
              className={e?.props.className}
            />
          ))}
          {arrowChild && <Arrow className={arrowChild?.props.className} />}
        </Root>
      )}
    </div>
  );
}

// Attach sub-components to the main component
HoverList.Root = Root;
HoverList.Item = Item;
HoverList.Arrow = Arrow;

export default HoverList;