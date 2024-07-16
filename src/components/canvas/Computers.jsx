import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./robot_playground/scene.gltf');
  
  // Ref for the model to apply animation
  const modelRef = useRef();

  // Animation using useFrame hook
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.010; // Adjust the rotation speed as needed
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={2} groundColor="black" />
      <pointLight intensity={8} />
      <spotLight 
        position={[-3, 5, 1]}
        angle={1}
        penumbra={2}
        intensity={600}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        ref={modelRef} // Assign ref to the model
        object={computer.scene}
        scale={isMobile ? 2 : 2}
        position={isMobile ? [0, -3.3, 0] : [0, -3.25, 0]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width:500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='always' // Ensure continuous rendering for smooth animation
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
