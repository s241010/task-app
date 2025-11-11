import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div style={{
      width: "100%",
      backgroundColor: "#eee",
      borderRadius: "10px",
      overflow: "hidden",
      height: "20px",
    }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#4caf50",
          height: "100%",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}