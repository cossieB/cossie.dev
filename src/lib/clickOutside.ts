import { onCleanup } from "solid-js";

export default function clickOutside(handler: (e: MouseEvent) => void) {
  return (el: Element) => {
    const onClick = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) handler(e);
    };

    document.body.addEventListener("click", onClick);
    onCleanup(() => document.body.removeEventListener("click", onClick));
  };
}

declare module "solid-js" {
    namespace JSX {
      interface Directives {  
        clickOutside(el: Element, accessor: Function): void
      }
    }
  }