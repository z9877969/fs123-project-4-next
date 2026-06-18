"use client";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function LoadMoreBtn({ onClick, disabled = false }: LoadMoreBtnProps) {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Load more recipes"
    >
      {disabled ? "Loading..." : "Load more"}
    </button>
  );
}