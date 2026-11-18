import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A stylized low-poly "developer at a desk" scene:
 * - A figure with a floating head, body, and arms resting on a desk
 * - A monitor that gently pulses
 * - Floating code particles around the figure
 * All built from primitives so it stays lightweight.
 */

function Monitor({ accent }: { accent: string }) {
  const screenRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const t = state.clock.getElapsedTime();
      screenRef.current.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group position={[0, 0.55, -0.15]}>
      {/* Screen */}
      <RoundedBox args={[1.3, 0.85, 0.06]} radius={0.04} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a12" roughness={0.3} metalness={0.7} />
      </RoundedBox>
      {/* Screen face */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.15, 0.72]} />
        <meshStandardMaterial
          ref={screenRef}
          color={accent}
          emissive={accent}
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.12, 0.25, 0.12]} />
        <meshStandardMaterial color="#1c1c28" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.25]} />
        <meshStandardMaterial color="#1c1c28" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}

function DeveloperFigure({ accent, accent2 }: { accent: string; accent2: string }) {
  const headRef = useRef<THREE.Group>(null);
  const armLRef = useRef<THREE.Mesh>(null);
  const armRRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05;
    }
    if (armLRef.current) {
      armLRef.current.rotation.x = -0.9 + Math.sin(t * 1.5) * 0.04;
    }
    if (armRRef.current) {
      armRRef.current.rotation.x = -0.9 + Math.cos(t * 1.5) * 0.04;
    }
  });

  return (
    <group position={[0, -0.9, 0.2]}>
      {/* Chair back */}
      <RoundedBox args={[0.9, 1.1, 0.12]} radius={0.08} smoothness={4} position={[0, 0.2, 0.35]}>
        <meshStandardMaterial color="#161620" roughness={0.5} metalness={0.3} />
      </RoundedBox>

      {/* Body */}
      <RoundedBox args={[0.7, 0.9, 0.45]} radius={0.18} smoothness={4} position={[0, 0.1, 0.1]}>
        <meshStandardMaterial color={accent2} roughness={0.4} metalness={0.3} />
      </RoundedBox>

      {/* Head group */}
      <group ref={headRef} position={[0, 1.0, 0.1]}>
        {/* Head */}
        <Sphere args={[0.27, 32, 32]} scale={[1, 1.1, 1]}>
          <meshStandardMaterial color="#e8c4a0" roughness={0.6} metalness={0.05} />
        </Sphere>
        {/* Hair */}
        <mesh position={[0, 0.12, -0.02]} scale={[1.05, 0.7, 1.1]}>
          <sphereGeometry args={[0.27, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2a2018" roughness={0.8} />
        </mesh>
        {/* Headphones band */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.26, 0.025, 16, 32, Math.PI]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Headphone cups */}
        <mesh position={[-0.27, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0.27, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={accent} roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.09, -0.02, 0.24]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#1a1a24" />
        </mesh>
        <mesh position={[0.09, -0.02, 0.24]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#1a1a24" />
        </mesh>
      </group>

      {/* Left arm */}
      <mesh ref={armLRef} position={[-0.42, 0.15, 0.2]}>
        <boxGeometry args={[0.14, 0.5, 0.14]} />
        <meshStandardMaterial color={accent2} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Right arm */}
      <mesh ref={armRRef} position={[0.42, 0.15, 0.2]}>
        <boxGeometry args={[0.14, 0.5, 0.14]} />
        <meshStandardMaterial color={accent2} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Desk */}
      <RoundedBox args={[1.8, 0.08, 0.7]} radius={0.03} smoothness={4} position={[0, -0.2, 0.1]}>
        <meshStandardMaterial color="#241818" roughness={0.6} metalness={0.2} />
      </RoundedBox>
      {/* Desk legs */}
      <mesh position={[-0.8, -0.5, 0.1]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#241818" />
      </mesh>
      <mesh position={[0.8, -0.5, 0.1]}>
        <boxGeometry args={[0.06, 0.5, 0.06]} />
        <meshStandardMaterial color="#241818" />
      </mesh>

      {/* Monitor on desk */}
      <group position={[0, -0.16, -0.1]}>
        <Monitor accent={accent} />
      </group>

      {/* Coffee cup */}
      <group position={[0.6, -0.05, 0.25]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
          <meshStandardMaterial color="#e8e8f0" roughness={0.5} />
        </mesh>
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.05, 0.015, 8, 16]} />
          <meshStandardMaterial color="#e8e8f0" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingCode({ accent, accent2 }: { accent: string; accent2: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const particles = [
    { pos: [1.8, 1.2, 0.5], color: accent, size: 0.12 },
    { pos: [-1.6, 1.8, -0.3], color: accent2, size: 0.1 },
    { pos: [2.0, -0.5, 0.8], color: accent, size: 0.08 },
    { pos: [-1.8, -0.8, 0.4], color: accent2, size: 0.1 },
    { pos: [0.5, 2.3, -0.5], color: accent, size: 0.09 },
    { pos: [-0.8, -1.5, 0.6], color: accent2, size: 0.11 },
  ];

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={p.pos as [number, number, number]}>
            <boxGeometry args={[p.size, p.size, p.size]} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Platform({ accent }: { accent: string }) {
  return (
    <group position={[0, -1.55, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.5, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.2, 1.25, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export default function Developer3D({
  color1,
  color2,
}: {
  color1: string;
  color2: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 4, 3]} intensity={2} color={color1} />
      <pointLight position={[-3, 2, -2]} intensity={1.5} color={color2} />
      <directionalLight position={[0, 5, 3]} intensity={0.8} />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <DeveloperFigure accent={color1} accent2={color2} />
      </Float>
      <FloatingCode accent={color1} accent2={color2} />
      <Platform accent={color1} />
    </Canvas>
  );
}
