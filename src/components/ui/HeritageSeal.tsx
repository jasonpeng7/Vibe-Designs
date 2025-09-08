const HeritageSeal = ({ isPressed }: { isPressed: boolean }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`heritage-seal ${isPressed ? "pressed" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient
          id="goldGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" style={{ stopColor: "#fdeec9" }} />
          <stop offset="100%" style={{ stopColor: "#c79a3a" }} />
        </radialGradient>
      </defs>
      <g className="seal-body">
        <circle cx="50" cy="50" r="48" fill="url(#goldGradient)" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#a17c2f"
          strokeWidth="1"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#fff"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        <text
          x="50"
          y="40"
          fontFamily="serif"
          fontSize="10"
          fill="#4a3710"
          textAnchor="middle"
          fontWeight="bold"
        >
          EST.
        </text>
        <text
          x="50"
          y="55"
          fontFamily="serif"
          fontSize="18"
          fill="#4a3710"
          textAnchor="middle"
          fontWeight="bold"
        >
          2022
        </text>
        <text
          x="50"
          y="70"
          fontFamily="sans-serif"
          fontSize="6"
          fill="#4a3710"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          QUALITY & CRAFT
        </text>
      </g>
      <circle
        className="particle-ring"
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
      />
    </svg>
  );
};

export default HeritageSeal;
