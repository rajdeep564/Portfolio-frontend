import React, { Suspense, useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import CanvasLoader from "../Loader";

const SplineScene = ({ isMobile }) => {
  return (
    <div className='pl-44'>
             <Spline
      scene="https://prod.spline.design/oT-u7RweN03r4r1i/scene.splinecode"
      style={{
        // width: isMobile ? '100%' : '80%',
        // height: isMobile ? '100%' : '80%',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        paddingLeft:500,
        paddingBottom:300,
        height:1000,
        paddingTop:50
        
        
      }}
    />
    </div>
   
  );
};

const SplineCanvas = () => {

  return (
    <div className='spline-container'>
      <main className='spline-canvas'>
        <Suspense fallback={<CanvasLoader />}>
          <SplineScene />
        </Suspense>
      </main>
    </div>
  );
};

export default SplineCanvas;
