'use client';

import React, { useState } from 'react';
import NoSSR from '../NoSSR';
import { Canvas } from '@react-three/fiber';

function LoadCanvas({ camera, dpr, gl, children }) {
  const [contextLost, setContextLost] = useState(false);

  const handleContextLoss = (e) => {
    e.preventDefault(); // Prevent the default behavior
    console.log('WebGL context lost');
    setContextLost(true);
  };

  const handleContextRestore = () => {
    console.log('WebGL context restored');
    setContextLost(false);
  };

  const handleContext = ({ gl }) => {
    const canvas = gl.getContext().canvas;

    canvas.addEventListener('webglcontextlost', handleContextLoss, false);
    canvas.addEventListener(
      'webglcontextrestored',
      handleContextRestore,
      false
    );

    // Cleanup on unmount
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
      canvas.removeEventListener('webglcontextrestored', handleContextRestore);
    };
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      {contextLost ? (
        <div style={{ textAlign: 'center', color: 'red' }}>
          3D view is not available.
        </div>
      ) : (
        <NoSSR>
          {typeof window !== 'undefined' && (
            <Canvas
              camera={camera ?? { position: [5, 1, 6], fov: 50 }}
              dpr={dpr ?? [1, 1.5]} // Limit the device pixel ratio for performance
              gl={gl ?? { antialias: false, alpha: true }}
              onCreated={handleContext}
            >
              {children}
            </Canvas>
          )}
        </NoSSR>
      )}
    </div>
  );
}

export default LoadCanvas;
