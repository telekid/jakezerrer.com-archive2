import React from 'react';

export default function iPad({width = 600, backgroundImage, className}) {
  const iPadWidth = 305.7;
  const iPadHeight = 220.6;
  const aspect = iPadHeight / iPadWidth;

  return (
    <svg width={width} height={width * aspect} viewBox={`0 0 ${iPadWidth} ${iPadHeight}`} className={className}>
      <filter id="light">
        <feSpecularLighting in="SourceGraphic" result="light" lightingColor="white">
          <feSpotLight pointsAtX={iPadWidth * 0.1} pointsAtY={iPadHeight * 0.1} pointsAtZ="0" x={iPadWidth * 0.8} y={iPadHeight * 0.8} z="100" />
        </feSpecularLighting>
        <feComposite in="SourceGraphic" in2="light" operator="arithmetic" k1="1" k2="1" k3="0" k4="0" />
      </filter>
      <g filter="url(#light)">
        <g>
          <rect width={iPadWidth} height={iPadHeight} fill="rgb(73, 74, 79)" rx="11" ry="11" />
          <rect width={iPadWidth - 2} height={iPadHeight - 2} x="1" y="1" rx="10" ry="10" fill="rgb(8, 8, 9)" />
          <rect width={iPadWidth - (21 * 2)} height={iPadHeight - (11.2 * 2)} x="21" y="11.2" rx="1" ry="1" fill="hsl(0, 0%, 15%)" />
          <rect width={iPadWidth - (21.8 * 2)} height={iPadHeight - (12 * 2)} x="21.8" y="12.0" fill="black" />
          {
            backgroundImage ?
              <image href={backgroundImage} width={iPadWidth - (21.8 * 2)} height={iPadHeight - (12 * 2)} x="21.8" y="12.0" /> :
              null
          }
        </g>
        <g>
          <circle cx={iPadWidth - 10} cy={iPadHeight / 2} r={5.4} fill="hsl(0, 0%, 24%)" />
          <circle cx={iPadWidth - 10} cy={iPadHeight / 2} r={4.7} fill="hsl(0, 0%, 7%)" />
        </g>
        <g>
          <circle cx="11.2" cy={iPadHeight / 2} r={1.5} fill="hsl(0, 0%, 0%)" />
          <circle cx="11.2" cy={iPadHeight / 2} r={1.2} fill="hsl(0, 0%, 18%)" />
          <circle cx="11.2" cy={iPadHeight / 2} r={0.7} fill="hsl(226, 32%, 19%)" />
        </g>
      </g>
    </svg>
  );
}
