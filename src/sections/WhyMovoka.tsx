import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import SectionHeading, { Kiwi, RevealText } from '@/components/SectionHeading';
import { useLanguage } from '@/lib/i18n';

function Ring({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.15;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0.4 + scrollRef.current * 0.3, 0.05);
    }
    if (inner.current) {
      inner.current.rotation.z -= delta * 0.25;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        <mesh ref={ref}>
          <torusGeometry args={[2.2, 0.05, 16, 120]} />
          <meshStandardMaterial
            color={'#C6FF00'}
            emissive={'#C6FF00'}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={inner}>
          <torusGeometry args={[1.7, 0.03, 16, 120]} />
          <meshStandardMaterial
            color={'#B9FF28'}
            emissive={'#B9FF28'}
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0.15}
          />
        </mesh>
        <pointLight color={'#C6FF00'} intensity={5} distance={6} />
      </group>
    </Float>
  );
}

export default function WhyMovoka() {
  const { copy } = useLanguage();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handler = () => {
      const el = document.getElementById('ueber-uns');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const prog = 1 - rect.top / window.innerHeight;
      scrollRef.current = Math.max(0, Math.min(1, prog));
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section id="ueber-uns" className="relative w-full overflow-hidden bg-movoka-black py-28 md:py-40">
      <div className="ambient-blob" style={{ width: 600, height: 600, background: '#C6FF00', top: '30%', left: '50%', transform: 'translateX(-50%)', opacity: 0.1 }} />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading kicker={copy.why.kicker} align="center">
          <RevealText text={copy.why.title[0]} /> <Kiwi><RevealText text={copy.why.title[1]} /></Kiwi>
          <br />
          <RevealText text={copy.why.title[2]} />
        </SectionHeading>

        <div className="relative mt-16 md:mt-24">
          {/* 3D ring centered */}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 md:h-[480px] md:w-[480px]">
            <Canvas
              dpr={[1, 1.8]}
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0, 0, 6], fov: 40 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.2} />
              <Ring scrollRef={scrollRef} />
              <Environment preset="night" />
            </Canvas>
          </div>

          {/* Features arranged around */}
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {copy.why.features.map((f, i) => (
              <div
                key={f}
                className={`reveal-line ${i % 2 === 1 ? 'md:mt-24' : ''}`}
              >
                <div className="reveal-inner">
                  <div className="flex items-center gap-4 rounded-2xl border border-movoka-white/10 bg-movoka-carbon/60 px-6 py-5 backdrop-blur-sm transition-colors duration-300 hover:border-movoka-kiwi/40">
                    <span className="font-display text-sm text-movoka-kiwi">{(i + 1).toString().padStart(2, '0')}</span>
                    <span className="font-display text-lg text-movoka-white md:text-xl">{f}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
