import React from "react";
import "./loader.css";

const Webloader = () => {
  return (
    <div className="loader">
      <div className="svg-wrapper">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.58 76.5" height="80" fill="">
  <title>Loader</title>
  <defs>
    <style>
      {`
        .cls-1 { fill: #fff; }
        @keyframes moveGradient {
          0% { stop-color: #333; }
          50% { stop-color: #E0E0E0; }
          100% { stop-color: #333; }
        }
      `}
    </style>
    <linearGradient id="ttb" y2="1">
      <stop offset="0%" stopOpacity="1" stopColor="#333">
        <animate
          attributeName="offset"
          values="0;1;1;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="100%" stopOpacity="1" stopColor="#E0E0E0">
        <animate
          attributeName="offset"
          values="0;1;1;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </stop>
    </linearGradient>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" data-name="Layer 1">
      <path className="cls-1" fill="url(#ttb)" d="M47.25,50.86c9.43-4.75,14.33-14.46,14.33-24.12C61.58,13.45,52.33,0,34.65,0H3.54A3.53,3.53,0,0,0,0,3.54v15.2a3.53,3.53,0,0,0,3.54,3.54h27.7c3.36,0,3.4,4.4,3.4,4.59a5.42,5.42,0,0,1-1,3.27,2.85,2.85,0,0,1-2.43,1.1H3.54A3.53,3.53,0,0,0,0,34.77V73A3.53,3.53,0,0,0,3.54,76.5H19.1A3.53,3.53,0,0,0,22.63,73V54.52L36.69,75a3.54,3.54,0,0,0,2.92,1.53H58A3.53,3.53,0,0,0,60.92,71Zm-31.69-.53v19.1H7.07V38.31H31.24a9.92,9.92,0,0,0,8-3.83,12.38,12.38,0,0,0,2.46-7.61c0-6.65-4.5-11.66-10.47-11.66H7.07V7.07H34.65c13.64,0,19.85,10.2,19.85,19.67a20.5,20.5,0,0,1-5.09,13.83c-3.69,4.07-9,6.23-15.46,6.23H19.1A3.53,3.53,0,0,0,15.56,50.33Zm25.91,19.1L30.77,53.87H34a32.43,32.43,0,0,0,6.38-.61l11,16.17Z"/>
    </g>
  </g>
</svg>


        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Webloader;
