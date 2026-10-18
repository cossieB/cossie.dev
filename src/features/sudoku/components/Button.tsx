import type { JSX } from "@solidjs/web";
import styles from "./Button.module.css";

export interface ButtonProps {
  children: JSX.Element;
  onClick: () => void;
  variant?: "primary";
  /** Renders as a toggle button when defined. */
  pressed?: boolean;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      class={[
        styles.button,
        {
          [styles.primary]: props.variant === "primary",
          [styles.pressed]: props.pressed === true,
        }]}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
}
