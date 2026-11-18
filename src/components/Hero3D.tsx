import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

function Blob({ color1, color2, speed }: { color1: string; color2: string; speed: number }) {
  const matRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);

  const c1 = useMemo(() => new THREE.Color(color1), [color1]);
  const c2 = useMemo(() => new THREE.Color(color2), [color2]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    }
    if (matRef.current) {
      const mix = (Math.sin(t * 0.5) + 1) / 2;
      const col = c1.clone().lerp(c2, mix);
      matRef.current.color = col;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5 * speed} rotationIntensity={0.4} floatIntensity={1.2}>
        <Sphere args={[1.6, 128, 128]} scale={[1, 1, 1]}>
          <MeshDistortMaterial
            ref={matRef}
            color={c1}
            distort={0.55}
            speed={2 * speed}
            roughness={0.1}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Outer wireframe shell */}
      <Float speed={0.8 * speed} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh scale={[2.2, 2.2, 2.2]}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial color={color2} wireframe transparent opacity={0.12} />
        </mesh>
      </Float>

      {/* Small orbiting spheres */}
      <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2.6, 0.8, -0.5]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={1.6 * speed} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-2.4, -1.2, 0.8]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D({ color1, color2, speed }: { color1: string; color2: string; speed: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2.4} color={color1} />
      <pointLight position={[-5, -5, -3]} intensity={1.8} color={color2} />
      <directionalLight position={[0, 5, 2]} intensity={0.6} />
      <Blob color1={color1} color2={color2} speed={speed} />
    </Canvas>
  );
}
