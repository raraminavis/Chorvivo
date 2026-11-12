// DoDance landing page script bundle: the hero sphere (ShaderGradient) and the two product demos (Stageshow).
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { PhoneDemo, NotesPhone, FlowDemo } from './demos';

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

// The sphere from the Vibrant direction, in the Space palette: marker red, mirror grey, marley.
function Sphere() {
  const el = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    // render only while the hero is on screen
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={el} style={{ position: 'absolute', inset: 0 }}>
      {on && (
        <ShaderGradientCanvas style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} pixelDensity={1} fov={40} lazyLoad={false}>
          <ShaderGradient control="props" type="sphere" animate={REDUCE ? 'off' : 'on'} uTime={0} uSpeed={0.16} uStrength={0.45} uDensity={1.3}
            uFrequency={5.5} uAmplitude={3.2} positionX={-0.1} positionY={0} positionZ={0} rotationX={0} rotationY={130} rotationZ={70}
            color1="#D66B66" color2="#8B8E89" color3="#F3F3EF" reflection={0.35} cAzimuthAngle={270} cPolarAngle={180} cDistance={0.5}
            cameraZoom={15.1} lightType="3d" brightness={1.0} grain="on" grainBlending={0.3} enableTransition={false} />
        </ShaderGradientCanvas>
      )}
    </div>
  );
}

const mount = (id, node) => { const el = document.getElementById(id); if (el) createRoot(el).render(node); };
mount('hero-sphere', <Sphere />);
mount('demo-phone', <PhoneDemo />);
mount('demo-flow', <FlowDemo />);
const notes = document.getElementById('demo-notes');
if (notes) createRoot(notes).render(<NotesPhone src={notes.dataset.src} />);
