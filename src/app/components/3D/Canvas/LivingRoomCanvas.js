'use client';

import React from 'react';
import LoadCanvas from '../LoadCanvas';
import Model from '../Model';

function LivingRoomCanvas() {
  return (
    <LoadCanvas
      camera={{ position: [5, 1, 6], fov: 50 }}
      dpr={[1, 1.5]} // Limits the device pixel ratio for performance
      gl={{ antialias: false, alpha: true }}
    >
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Model objPath="/3d/living-room.obj" mtlPath="/3d/living-room.mtl" />
      </>
    </LoadCanvas>
  );
}

export default LivingRoomCanvas;
