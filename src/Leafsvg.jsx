import React from 'react';

const AgriSmartLogo = () => {
  return (
    <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main Text Group */}
      <g transform="translate(20, 50)" filter="url(#softGlow)">
        {/* AgriSmart Text */}
        <text
          className="text-4xl font-bold"
          fill="white"
          opacity="0.95"
        >
          Agri
          <tspan dx="5">Smart</tspan>
        </text>

        {/* Decorative Leaf over 'i' in Agri */}
        <g transform="translate(58, -35) scale(0.6)">
          <path
            d="M0 30 
               C5 10, 15 0, 30 0 
               C45 0, 55 10, 60 30
               C55 50, 45 60, 30 60
               C15 60, 5 50, 0 30"
            fill="green"
            opacity="0.95"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0 30 C5 10, 15 0, 30 0 C45 0, 55 10, 60 30 C55 50, 45 60, 30 60 C15 60, 5 50, 0 30;
                M0 30 C5 15, 15 5, 30 5 C45 5, 55 15, 60 30 C55 45, 45 55, 30 55 C15 55, 5 45, 0 30;
                M0 30 C5 10, 15 0, 30 0 C45 0, 55 10, 60 30 C55 50, 45 60, 30 60 C15 60, 5 50, 0 30"
            />
          </path>
          <path
            d="M30 10 V50 M15 30 H45"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Small Leaf near 'A' */}
        <g transform="translate(15, -15) scale(0.3) rotate(-30)">
          <path
            d="M0 30 
               C5 10, 15 0, 30 0 
               C45 0, 55 10, 60 30
               C55 50, 45 60, 30 60
               C15 60, 5 50, 0 30"
            fill="green"
            opacity="0.8"
          />
          <path
            d="M30 10 V50 M15 30 H45"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Small Leaf near 'S' in Smart */}
        <g transform="translate(140, -20) scale(0.35) rotate(15)">
          <path
            d="M0 30 
               C5 10, 15 0, 30 0 
               C45 0, 55 10, 60 30
               C55 50, 45 60, 30 60
               C15 60, 5 50, 0 30"
            fill="green"
            opacity="0.8"
          >
            <animate
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 30 30"
              to="5 30 30"
              dur="2s"
              repeatCount="indefinite"
              additive="sum"
            />
          </path>
          <path
            d="M30 10 V50 M15 30 H45"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Small Leaf near 't' */}
        <g transform="translate(220, -10) scale(0.25) rotate(-20)">
          <path
            d="M0 30 
               C5 10, 15 0, 30 0 
               C45 0, 55 10, 60 30
               C55 50, 45 60, 30 60
               C15 60, 5 50, 0 30"
            fill="green"
            opacity="0.8"
          />
          <path
            d="M30 10 V50 M15 30 H45"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
      </g>
    </svg>
  );
};

export default AgriSmartLogo;