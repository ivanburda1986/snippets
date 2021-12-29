import React from "react";

interface Button {
  title: string;
  action: any;
  disabled: boolean;
}

export const Button: React.FC<Button> = ({ title, action, disabled }) => {
  return (
    <button onClick={action} disabled={disabled}>
      {title}
    </button>
  );
};
