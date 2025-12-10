"use client";

import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string; // novo
}

export const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: 600, fontSize: "14px" }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: `1px solid ${error ? "#e74c3c" : "#ccc"}`,
          fontSize: "14px",
          color: "#2c3e50",
          backgroundColor: "#fff",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
        }}
      />
      {error && <span style={{ color: "#e74c3c", fontSize: "12px", marginTop: "4px", display: "block" }}>{error}</span>}
    </div>
  );
};
