import React from "react";
import "./WavesBuffer.css";

const WavesBuffer = () => {
  return (
    <div className="waves-buffer" aria-hidden="true">
      {/* wave 1: foreground (fastest, smallest) - upside down waves at top */}
      <svg className="wave wave--1" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMin slice">
        <path d="M0 0 L1440 0 L1440 80 C1220 60 1020 90 720 100 C420 110 220 70 0 90 Z" />
      </svg>

      {/* wave 2: middle (medium speed, medium size) - upside down waves at top */}
      <svg className="wave wave--2" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMin slice">
        <path d="M0 0 L1440 0 L1440 100 C1260 80 1080 110 720 120 C360 130 180 90 0 110 Z" />
      </svg>

      {/* wave 3: background (slowest, largest, blurred) - upside down waves at top */}
      <svg className="wave wave--3" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMin slice">
        <path d="M0 0 L1440 0 L1440 120 C1240 100 1040 130 720 140 C400 150 200 110 0 130 Z" />
      </svg>
    </div>
  );
};

export default WavesBuffer;
