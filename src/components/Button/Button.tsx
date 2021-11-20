import React from "react";

export function Button({ title, onClick }: { title: string; onClick: any }) {
  return <button onClick={onClick}>{title}</button>;
}
