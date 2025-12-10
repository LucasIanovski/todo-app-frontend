"use client";

import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", color: "#172B4D", fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />
    </div>
  );
};
