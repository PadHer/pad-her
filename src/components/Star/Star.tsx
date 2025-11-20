import React from "react";

interface StarProps {
  size?: string;
  color?: string;
}

const Star: React.FC<StarProps> = ({ size, color }) => {
  return (
    <div
      style={{
        position: "relative",
        margin: "1em auto",
        width: "1em",
        fontSize: "12em",
      }}
    >
      {/* Before (top-left) */}
      <div
        style={{
          content: '""',
          position: "absolute",
          background: color,
          width: size,
          height: size,
          transform: "rotate(-31deg) skewX(45deg) skewY(20deg)",
        }}
      />

      {/* After (top-right) */}
      <div
        style={{
          content: '""',
          position: "absolute",
          background: color,
          width: size,
          height: size,
          transform: "rotate(60deg) skewX(45deg) skewY(20deg)",
        }}
      />
    </div>
  );
};

export default Star;
