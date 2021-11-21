import React from "react";

export function Button({ title, onClick, disabled, displayed }: { title: string; onClick: any; disabled: boolean; displayed: "none" | "flex" }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ display: displayed }}>
      {title}
    </button>
  );
}
