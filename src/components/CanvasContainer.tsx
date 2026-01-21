"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, OrbitControls } from "@react-three/drei";

export default function CanvasContainer() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background pointer-events-none">
    {/* pointer-events-none allows clicking through to HTML content */}
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            {/* <ambientLight intensity={0.5} /> */}
            <pointLight position={[10, 10, 10]} />
            
             {/* Simple Mesh for Background */}
            <mesh rotation={[0, 0, 0]}>
                 <sphereGeometry args={[1, 32, 32]} />
                 <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
            </mesh>
            
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
    </div>
  );
}
