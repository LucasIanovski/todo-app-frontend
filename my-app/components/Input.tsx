import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label style={{ fontWeight: "bold" }}>
        {label}
        <input
          {...props}
          style={{
            display: "block",
            padding: "8px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "6px"
          }}
        />
      </label>
    </div>
  );
}
