'use client';

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function Model({ objPath, mtlPath }) {
  const [error, setError] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    let mounted = true;
    const loadModel = async () => {
      try {
        const materials = await new Promise((resolve, reject) => {
          new MTLLoader().load(
            mtlPath,
            (mat) => {
              mat.preload();
              resolve(mat);
            },
            undefined,
            reject
          );
        });

        const obj = await new Promise((resolve, reject) => {
          const loader = new OBJLoader();
          loader.setMaterials(materials);
          loader.load(objPath, resolve, undefined, reject);
        });

        if (mounted) {
          // Compute the bounding box
          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());

          // Move the model to the center
          obj.position.sub(center); // Subtract the center position from the model's position

          setModel(obj);
        }
      } catch (e) {
        console.error('Error loading model:', e);
        setError(true);
      }
    };

    loadModel();

    return () => {
      mounted = false;
      if (model && model.dispose) model.dispose();
    };
  }, [objPath, mtlPath]);

  if (error) {
    return <meshBasicMaterial attach="material" color="red" />;
  }

  return model ? <primitive object={model} dispose={null} /> : null;
}

export default Model;
