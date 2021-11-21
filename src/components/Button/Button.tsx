import React from "react";

export function Button({ title, onClick, disabled }: { title: string; onClick: any; disabled: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
}
