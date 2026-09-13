import React from "react";

export default function CityDrawing({ city }) {
  const scene = city.illustration;
  const background =
    scene === "vancouver" ? "#dce5dc" : scene === "san-francisco" ? "#eadbc6" : "#dde1d6";
  return (
    <svg
      className="city-drawing"
      viewBox="0 0 560 180"
      role="img"
      aria-label={city.illustrationAlt}
    >
      <rect width="560" height="180" fill={background} />
      <circle cx="429" cy="45" r="23" fill="#f6edcb" />
      {scene === "vancouver" ? (
        <>
          <path d="m0 141 107-103 99 103 92-127 135 127 60-67 67 69" fill="#91a496" />
          <path
            d="m70 74 37-36 41 42-25-8-16 6-13-12Zm195-13 33-47 49 47-27-10-17 16-20-15Z"
            fill="#f3f0dd"
          />
          <path d="M0 142q90-15 186 3t187-2 187 2v35H0Z" fill="#a8c1bc" />
          <path d="M35 159h150m112 9h140" stroke="#e3e9d8" strokeWidth="2" />
        </>
      ) : scene === "san-francisco" ? (
        <>
          <path d="M0 153h560v27H0" fill="#b3c7c0" />
          <g fill="none" stroke="#b46f50">
            <path d="M148 158V37h18v121m228 0V37h18v121" strokeWidth="7" />
            <path d="M0 125h560" strokeWidth="7" />
            <path d="M0 111q85-13 156-67 127 133 247 0 79 58 157 68" strokeWidth="3" />
            {[40, 80, 120, 195, 230, 265, 300, 335, 370, 440, 480, 520].map((x) => (
              <path
                key={x}
                d={`M${x} 125V${x > 166 && x < 393 ? 60 + Math.sin(((x - 156) / 247) * Math.PI) * 51 : 98}`}
              />
            ))}
          </g>
        </>
      ) : (
        <>
          <path
            d="M0 150h39V97h39v53h18V74h30v76h18V93h28v57h25V52h15V27h4V9h3v18h4v25h16v98h20V84h40v66h15V45h43v105h18V71h32v79h15V93h47v57h21V63h39v87h40v30H0Z"
            fill="#859b8d"
          />
          <path d="M0 161h560" stroke="#c0ccb6" strokeWidth="3" />
          <g fill="#d8debb">
            {[48, 106, 205, 225, 269, 327, 343, 384, 438, 496].map((x) => (
              <path key={x} d={`M${x} 103h5v8h-5Zm0 19h5v8h-5Z`} />
            ))}
          </g>
        </>
      )}
    </svg>
  );
}
