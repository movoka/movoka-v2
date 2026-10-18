import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { supabase } from '@/lib/supabase';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useLanguage } from '@/lib/i18n';

function ContactSculpture() {
  const ref = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group>
        <mesh ref={ref}>
          <torusKnotGeometry args={[1.1, 0.32, 180, 32]} />
          <meshStandardMaterial
            color={'#1B1E19'}
            metalness={1}
            roughness={0.12}
            emissive={'#C6FF00'}
            emissiveIntensity={0.15}
            envMapIntensity={1.8}
          />
        </mesh>
        <mesh ref={core} scale={0.45}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={128}
            transmission={1}
            roughness={0.1}
            thickness={1.2}
            ior={1.2}
            chromaticAberration={0.05}
            distortion={0.3}
            distortionScale={0.3}
            color={'#C6FF00'}
            attenuationColor={'#B9FF28'}
            attenuationDistance={0.8}
          />
        </mesh>
        <pointLight color={'#C6FF00'} intensity={4} distance={5} />
      </group>
    </Float>
  );
}

type Status = 'idle' | 'loading' | 'success' | 'error';
type FormState = { name: string; email: string; company: string; project_description: string };

export default function Contact() {
  const { copy } = useLanguage();
  const [form, setForm] = useState<FormState>({ name: '', email: '', company: '', project_description: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const ref = useReveal<HTMLDivElement>();

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = copy.contact.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = copy.contact.errors.email;
    if (form.project_description.trim().length < 10) e.project_description = copy.contact.errors.description;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      if (!supabase) throw new Error('Contact form is not configured on this deployment.');
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        project_description: form.project_description.trim(),
      });
      if (error) throw error;
      const subject = encodeURIComponent(`New project request from ${form.name.trim()}`);
      const body = encodeURIComponent([
        `Name: ${form.name.trim()}`,
        `Email: ${form.email.trim()}`,
        `Company: ${form.company.trim() || '—'}`,
        '',
        form.project_description.trim(),
      ].join('\n'));
      setStatus('success');
      setForm({ name: '', email: '', company: '', project_description: '' });
      window.location.href = `mailto:info@movoka.de?subject=${subject}&body=${body}`;
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const field = (key: keyof FormState, label: string, placeholder: string, type: 'text' | 'email' | 'textarea' = 'text') => (
    <div className="flex flex-col gap-2">
      <label htmlFor={key} className="font-display text-xs uppercase tracking-[0.2em] text-movoka-white/50">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={key}
          rows={4}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="resize-none rounded-xl border border-movoka-white/10 bg-movoka-black/50 px-4 py-3 font-sans text-sm text-movoka-white placeholder:text-movoka-white/25 transition-all duration-300 focus:border-movoka-kiwi focus:outline-none focus:ring-2 focus:ring-movoka-kiwi/20"
        />
      ) : (
        <input
          id={key}
          type={type}
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          placeholder={placeholder}
          className="rounded-xl border border-movoka-white/10 bg-movoka-black/50 px-4 py-3 font-sans text-sm text-movoka-white placeholder:text-movoka-white/25 transition-all duration-300 focus:border-movoka-kiwi focus:outline-none focus:ring-2 focus:ring-movoka-kiwi/20"
        />
      )}
      {errors[key] && <span className="font-sans text-xs text-red-400">{errors[key]}</span>}
    </div>
  );

  return (
    <section id="kontakt" className="relative w-full overflow-hidden bg-movoka-black py-28 md:py-40">
      {/* 3D sculpture behind */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <Canvas
          dpr={[1, 1.6]}
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 6], fov: 40 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.15} />
          <spotLight position={[5, 5, 5]} intensity={2} color={'#C6FF00'} angle={0.4} penumbra={1} />
          <ContactSculpture />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Giant headline */}
        <div ref={ref} className="text-center">
          <div className="reveal-line">
            <span className="reveal-inner font-display text-5xl font-bold leading-[0.95] tracking-tightest text-movoka-white md:text-8xl lg:text-9xl">
              {copy.contact.title[0]}
            </span>
          </div>
          <div className="reveal-line">
            <span className="reveal-inner font-display text-5xl font-bold leading-[0.95] tracking-tightest text-movoka-white md:text-8xl lg:text-9xl">
              {copy.contact.title[1]}
            </span>
          </div>
          <div className="reveal-line">
            <span className="reveal-inner font-display text-5xl font-bold leading-[0.95] tracking-tightest text-movoka-kiwi text-glow md:text-8xl lg:text-9xl">
              {copy.contact.title[2]}
            </span>
          </div>
        </div>

        {/* CTA + form */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2 md:gap-16">
          {/* Left: CTA */}
          <div className="flex flex-col justify-center">
            <a
              href="mailto:info@movoka.de"
              className="magnetic-btn group inline-flex w-fit items-center gap-3 rounded-full bg-movoka-kiwi px-8 py-4 font-display text-base font-medium text-movoka-black transition-shadow duration-300 hover:shadow-[0_0_50px_rgba(198,255,0,0.5)]"
            >
              {copy.contact.talk}
              <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <p className="mt-6 max-w-sm font-sans text-sm text-movoka-white/55">
              {copy.contact.sub}
            </p>
            <div className="mt-8 space-y-2 font-sans text-sm text-movoka-white/45">
              <div>info@movoka.de</div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-3xl border border-movoka-white/10 bg-movoka-carbon/40 p-6 backdrop-blur-md md:p-8">
            {field('name', copy.contact.fields.name, copy.contact.placeholders.name)}
            {field('email', copy.contact.fields.email, copy.contact.placeholders.email, 'email')}
            {field('company', copy.contact.fields.company, copy.contact.placeholders.company)}
            {field('project_description', copy.contact.fields.description, copy.contact.placeholders.description, 'textarea')}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-movoka-kiwi px-6 py-3.5 font-display text-sm font-medium text-movoka-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,255,0,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' && <Loader2 size={18} className="animate-spin" />}
              {status === 'success' && <Check size={18} />}
              {status === 'loading' ? '…' : status === 'success' ? copy.contact.sent : copy.contact.submit}
            </button>

            {status === 'success' && (
              <p className="font-sans text-sm text-movoka-kiwi">
                {copy.contact.thanks}
              </p>
            )}
            {status === 'error' && (
              <p className="font-sans text-sm text-red-400">
                {copy.contact.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
