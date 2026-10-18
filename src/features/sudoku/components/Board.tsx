import { For, Show } from "solid-js";
import { DIGITS, colOf, rowOf, sharesUnit, type CellData } from "../sudoku/logic";
import styles from "./Board.module.css";

export interface BoardProps {
  /** The store's cell array. Pass the proxy itself, not a copy. */
  cells: CellData[];
  conflicts: boolean[];
  selected: number | null;
  label: string;
  onSelect: (index: number) => void;
}

export default function Board(props: BoardProps) {
  const selectedValue = () => (props.selected === null ? 0 : props.cells[props.selected].value);

  return (
    <div class={styles.board} role="group" aria-label={props.label}>
      {/* `For` keeps each cell's DOM and only updates the properties that change. */}
      <For each={props.cells}>
        {(cell) => (
          <BoardCell
            cell={cell}
            selected={props.selected}
            selectedValue={selectedValue()}
            conflict={props.conflicts[cell.index]}
            onSelect={props.onSelect}
          />
        )}
      </For>
    </div>
  );
}

interface BoardCellProps {
  cell: CellData;
  selected: number | null;
  selectedValue: number;
  conflict: boolean;
  onSelect: (index: number) => void;
}

function BoardCell(props: BoardCellProps) {
  const isSelected = () => props.selected === props.cell.index;
  const isPeer = () => props.selected !== null && sharesUnit(props.selected, props.cell.index);
  const isSameDigit = () =>
    !isSelected() &&
    props.cell.value !== 0 &&
    props.selected !== null &&
    props.cell.value === props.selectedValue;

  return (
    <div
      class={{
        [styles.cell]: true,
        [styles.given]: props.cell.kind === "given",
        [styles.player]: props.cell.kind === "player",
        [styles.solved]: props.cell.kind === "solved",
        [styles.peer]: isPeer(),
        [styles.same]: isSameDigit(),
        [styles.selected]: isSelected(),
        [styles.conflict]: props.conflict,
      }}
      aria-current={isSelected() ? "true" : undefined}
      aria-label={`Row ${rowOf(props.cell.index) + 1}, column ${colOf(props.cell.index) + 1}: ${
        props.cell.value || "empty"
      }`}
      onClick={() => props.onSelect(props.cell.index)}
    >
      <Show when={props.cell.value !== 0} fallback={<Notes notes={props.cell.notes} />}>
        <span class={styles.digit}>{props.cell.value}</span>
      </Show>
    </div>
  );
}

function Notes(props: { notes: boolean[] }) {
  return (
    <span class={styles.notes} aria-hidden="true">
      {/* DIGITS never changes, so a plain map is fine; each span's text is reactive. */}
      {DIGITS.map((n) => (
        <span>{props.notes[n - 1] ? n : ""}</span>
      ))}
    </span>
  );
}
