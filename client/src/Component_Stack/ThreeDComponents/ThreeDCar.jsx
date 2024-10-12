import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

const CarModel = () => {
  const { scene } = useGLTF('/ThreeD_Model/Lamborghini.glb');
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

// const CameraLogger = () => {
//   const cameraRef = useRef();

//   useFrame(({ camera }) => {
//     if (camera) {
//       const { x, y, z } = camera.position;
//       console.log(`Camera Position: x: ${x.toFixed(3)}, y: ${y.toFixed(3)}, z: ${z.toFixed(3)}`);
//     }
//   });

//   return null; // This component doesn't render anything visual, it's just for logging.
// };

const ThreeDCar = () => {
  return (
    <Canvas
      camera={{ position: [-0.948, 0.677, 0.190] }} 
      style={{ width: '100%', height: '100%' }} 
    >
      <Suspense fallback={null}>
        <Environment preset="dawn" />  
        <CarModel />
        <OrbitControls enableZoom={true} />
        {/* <CameraLogger /> */}
      </Suspense>
    </Canvas>
  );
};

export default ThreeDCar;
