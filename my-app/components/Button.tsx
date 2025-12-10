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
        backgroundColor: "#3498db",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "14px",
        transition: "background-color 0.2s",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = style?.backgroundColor || "#3498db")}
    >
      {children}
    </button>
  );
};
