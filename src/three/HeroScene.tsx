import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/** A distorted icosahedron that reads as liquid metal + kiwi glass. */
function Sculpture({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Responsive scale
  const scale = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 1.35 : 2.05;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      // mouse parallax
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.3 + scrollRef.current * 0.5,
        0.05
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -state.pointer.x * 0.2,
        0.05
      );
      // scroll-driven vertical drift + scale
      const s = scale * (1 - scrollRef.current * 0.35);
      group.current.scale.setScalar(s);
      group.current.position.y = scrollRef.current * 1.2;
    }
    if (outer.current) {
      outer.current.rotation.y = t * 0.15;
      const geo = outer.current.geometry as THREE.IcosahedronGeometry;
      // subtle breathing via vertex displacement is heavy; use scale pulse instead
      const pulse = 1 + Math.sin(t * 0.8) * 0.015;
      outer.current.scale.setScalar(pulse);
      void geo;
    }
    if (inner.current) {
      inner.current.rotation.x = t * 0.4;
      inner.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Outer translucent kiwi-glass shell */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={outer} castShadow>
          <icosahedronGeometry args={[1, 12]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            transmission={1}
            roughness={0.08}
            thickness={1.4}
            ior={1.25}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.4}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color={'#C6FF00'}
            attenuationColor={'#B9FF28'}
            attenuationDistance={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>

      {/* Inner glowing metal core */}
      <mesh ref={inner} scale={0.55}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color={'#0B0D0A'}
          metalness={1}
          roughness={0.15}
          emissive={'#C6FF00'}
          emissiveIntensity={0.35}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Kiwi point light inside */}
      <pointLight color={'#C6FF00'} intensity={6} distance={4} decay={2} />
    </group>
  );
}

/** Floating particle field around the sculpture. */
function Particles({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={'#C6FF00'}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

type Props = {
  scrollRef: React.MutableRefObject<number>;
  className?: string;
};

export default function HeroScene({ scrollRef, className }: Props) {
  // Reduce quality on low-power devices
  const dpr = useMemo<[number, number]>(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? [1, 1.5] : [1, 2];
  }, []);

  return (
    <div className={className}>
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 38 }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#050505', 6, 14]} />
        <ambientLight intensity={0.15} />
        <spotLight position={[5, 8, 5]} angle={0.3} intensity={2} color={'#C6FF00'} penumbra={1} />
        <spotLight position={[-6, -4, 2]} angle={0.4} intensity={1.2} color={'#F5F5F0'} penumbra={1} />
        <Sculpture scrollRef={scrollRef} />
        <Particles />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
