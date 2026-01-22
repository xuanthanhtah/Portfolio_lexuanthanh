"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function InteractiveStars({ count = 5000 }) {
  const points = useRef<THREE.Points>(null!);
  const { viewport, mouse } = useThree();

  // Generate random positions for stars
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200; // Spread x
      const y = (Math.random() - 0.5) * 200; // Spread y
      const z = (Math.random() - 0.5) * 200; // Spread z
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  // Save original positions to allow return to base
  const originalPositions = useMemo(() => particlesPosition.slice(), [particlesPosition]);

  useFrame((state) => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array as Float32Array;
    
    // Convert 2D mouse (-1 to 1) to 3D world position roughly at z=0
    // We adjust Z depth influence based on camera distance (camera at z=5)
    const mouseX = (state.mouse.x * viewport.width) / 2;
    const mouseY = (state.mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // Calculate distance to mouse (ignoring Z for simple screen-space effect, or keeping it loose)
      const dx = mouseX - x;
      const dy = mouseY - y;
      const distSq = dx * dx + dy * dy;
      
      const repulsionRadius = 25; // Squared radius (5 units)
      const force = 0.5; // Repulsion strength

      if (distSq < repulsionRadius) {
        // Repel
        const dist = Math.sqrt(distSq);
        const dirX = dx / dist;
        const dirY = dy / dist;
        
        // Move away from mouse
        positions[i3] -= dirX * force;
        positions[i3 + 1] -= dirY * force;
      } else {
        // Return to original position (lerp)
        positions[i3] += (origX - x) * 0.02;
        positions[i3 + 1] += (origY - y) * 0.02;
        positions[i3 + 2] += (origZ - z) * 0.02;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow rotation
    points.current.rotation.y += 0.0005;
    points.current.rotation.x += 0.0002;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}
