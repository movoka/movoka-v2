import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { useLanguage } from '@/lib/i18n';

function Sculpture({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, scrollRef.current * 0.18, 0.04);
    }
    if (core.current) core.current.rotation.z -= delta * 0.24;
  });

  return (
    <Float speed={0.75} rotationIntensity={0.12} floatIntensity={0.28}>
      <group ref={group}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.55, 2]} />
          <meshStandardMaterial color="#C6FF00" emissive="#9AC900" emissiveIntensity={0.38} metalness={0.8} roughness={0.18} flatShading />
        </mesh>
        <mesh scale={1.08}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color="#DFFF72" transparent opacity={0.18} wireframe />
        </mesh>
        <mesh position={[0.78, 0.68, 0.5]} scale={0.18}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#F5F5F0" emissive="#C6FF00" emissiveIntensity={0.6} metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[-0.9, -0.32, 0.35]} scale={0.1}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#C6FF00" emissive="#C6FF00" emissiveIntensity={0.7} />
        </mesh>
        <mesh position={[0.15, -0.95, -0.2]} scale={0.07}>
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#F5F5F0" emissive="#C6FF00" emissiveIntensity={0.5} />
        </mesh>
        <pointLight color="#C6FF00" intensity={4.5} distance={6} />
      </group>
    </Float>
  );
}

export default function WhyMovoka() {
  const { copy } = useLanguage();
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('ueber-uns');
      if (!section) return;
      const progress = 1 - section.getBoundingClientRect().top / window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="ueber-uns" className="relative overflow-hidden bg-movoka-black py-28 md:py-40">
      <div className="ambient-blob" style={{ width: 620, height: 620, top: '20%', right: '-12%', background: '#C6FF00', opacity: 0.08 }} />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
          <div>
            <SectionHeading kicker={copy.why.kicker}>
              <RevealText text={copy.why.title[0]} /> <Kiwi><RevealText text={copy.why.title[1]} /></Kiwi>
              <br />
              <RevealText text={copy.why.title[2]} />
            </SectionHeading>
            <div className="mt-12 border-t border-movoka-white/10 pt-6">
              <div className="mb-6 flex items-center justify-between font-display text-[10px] uppercase tracking-[0.25em] text-movoka-white/35">
                <span>Our standard</span>
                <span className="text-movoka-kiwi">06 / 06</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {copy.why.features.map((feature, index) => <FeatureCard key={feature} feature={feature} index={index} />)}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-movoka-kiwi/5 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-movoka-white/10 bg-movoka-carbon/45 p-3 shadow-[0_20px_100px_rgba(0,0,0,0.35)] md:p-5">
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] border border-movoka-white/10 bg-movoka-black">
                <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(245,245,240,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,240,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,0,0.13),transparent_43%)]" />
                <div className="absolute left-5 top-5 font-display text-[10px] uppercase tracking-[0.25em] text-movoka-white/35">MVK / 001</div>
                <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-movoka-kiwi shadow-[0_0_16px_#C6FF00]" />
                <div className="h-[92%] w-[92%]">
                  <Canvas dpr={[1, 1.8]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 6], fov: 40 }} style={{ background: 'transparent' }}>
                    <ambientLight intensity={0.2} />
                    <Sculpture scrollRef={scrollRef} />
                    <Environment preset="night" />
                  </Canvas>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-movoka-white/10 pt-4">
                  <div><div className="font-display text-[10px] uppercase tracking-[0.3em] text-movoka-kiwi">Digital craft</div><div className="mt-1 font-display text-sm text-movoka-white/60">Built with intent.</div></div>
                  <div className="font-display text-2xl font-semibold tracking-tight text-movoka-white">∞</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: string; index: number }) {
  return (
    <div className="group flex items-center gap-4 border-b border-movoka-white/10 py-4 transition-colors hover:border-movoka-kiwi/50">
      <span className="font-display text-xs tracking-[0.15em] text-movoka-kiwi">{String(index + 1).padStart(2, '0')}</span>
      <span className="h-px w-5 bg-movoka-white/20 transition-all group-hover:w-8 group-hover:bg-movoka-kiwi" />
      <span className="font-display text-base text-movoka-white/80 transition-colors group-hover:text-movoka-white md:text-lg">{feature}</span>
    </div>
  );
}
