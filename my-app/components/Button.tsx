"use client";

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, style }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        backgroundColor: "#026AA7",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: 500,
        fontSize: "14px",
        transition: "background-color 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#055A8C")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = style?.backgroundColor || "#026AA7")}
    >
      {children}
    </button>
  );
};
