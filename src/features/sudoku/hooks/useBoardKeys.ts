import { onSettled } from "solid-js";

export interface BoardKeyHandlers {
  digit: (n: number) => void;
  erase: () => void;
  move: (dRow: number, dCol: number) => void;
  /** Called for "n" / "N". Omit in modes without pencil marks. */
  toggleNotes?: () => void;
}

const ARROWS: Record<string, [number, number]> = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

/**
 * Window-level keyboard controls: 1-9 to enter, Backspace/Delete/0 to erase,
 * arrow keys to move, N to toggle notes.
 *
 * `onSettled` is Solid 2's replacement for `onMount`; the function it returns
 * is the cleanup, so the listener is removed when the mode unmounts.
 */
export function useBoardKeys(handlers: BoardKeyHandlers) {
  onSettled(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (/^[1-9]$/.test(event.key)) {
        handlers.digit(Number(event.key));
      } else if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
        handlers.erase();
      } else if (event.key in ARROWS) {
        handlers.move(...ARROWS[event.key]);
      } else if ((event.key === "n" || event.key === "N") && handlers.toggleNotes) {
        handlers.toggleNotes();
      } else {
        return;
      }
      event.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });
}
