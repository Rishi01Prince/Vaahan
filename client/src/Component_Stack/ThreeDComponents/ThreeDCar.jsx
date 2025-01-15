import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

const CarModel = () => {
  const { scene } = useGLTF('/ThreeD_Model/Lamborghini.glb');
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const ThreeDCar = () => {
  return (
    <Canvas
      camera={{ position: [-1.882, 1.059, 0.547] }} 
      style={{ width: '100%', height: '100%' }} 
    >
      <Suspense fallback={null}>
        <Environment preset="dawn" />  
        <CarModel />
        <OrbitControls enableZoom={true} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeDCar;






