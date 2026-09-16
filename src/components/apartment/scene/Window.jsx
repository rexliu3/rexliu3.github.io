import React from "react";
import { front } from "./geometry";

export default function Window({ night }) {
  return (
    <g transform={front(443, 1, 246)} stroke="#a08864" strokeWidth="1.5">
      <rect x="-5" y="-5" width="200" height="147" rx="3" fill="#c6b18c" />
      <rect width="190" height="137" fill="url(#sky)" />
      <g clipPath="url(#window-clip)" stroke="none">
        {night ? (
          <g fill="#f6e5b9">
            <circle cx="148" cy="29" r="12" />
            <g className="window-stars">
              <circle cx="36" cy="21" r="1.5" />
              <circle cx="79" cy="37" r="1" />
              <circle cx="170" cy="62" r="1.4" />
            </g>
          </g>
        ) : (
          <g className="window-clouds" fill="#f7f4e3" opacity=".85">
            <path d="M0 37q9-14 19-7 9-17 21-3 15-2 20 10Z" />
            <path d="M0 20q8-9 14-4 9-12 20-1 10-1 16 9H0Z" />
          </g>
        )}
        <path
          d="M0 137V87h17V69h18v38h13V82h18v-8h17v33h14V65h8V51h4V35h3v16h4v14h8v39h12V79h16v-9h21v35h17v32Z"
          fill={night ? "#374b54" : "#a0b5a7"}
        />
        <path
          d="M0 137v-29h25V93h25v27h19V97h26v-8h20v27h14V94h32v15h29v28Z"
          fill={night ? "#2a3e46" : "#819b8d"}
        />
        {[29, 43, 76, 87, 101, 137, 149, 174].map((x) => (
          <path key={x} d={`M${x} 106h3v5h-3Zm0 12h3v5h-3Z`} fill={night ? "#e8cc85" : "#d3d9bc"} />
        ))}
      </g>
      <rect x="3" y="3" width="184" height="131" fill="none" stroke="#eee4ca" strokeWidth="5" />
      <path d="M95 0v137M0 69h190" stroke="#eee4ca" strokeWidth="5" />
      <rect x="-9" y="137" width="208" height="6" rx="1" fill="#f0e3ca" />
    </g>
  );
}
