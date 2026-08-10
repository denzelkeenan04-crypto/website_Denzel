'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ═════════════════════════════════════════════════════════════
    // SCENE — canvas blijft doorzichtig, het blauwe verloop komt
    // uit globals.css zodat beide altijd op elkaar aansluiten.
    // ═════════════════════════════════════════════════════════════
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    camera.position.set(0, 3.2, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ═════════════════════════════════════════════════════════════
    // STERRENVELD — de losse puntjes uit de referentie
    // ═════════════════════════════════════════════════════════════
    // Zachte ronde stip. Zonder deze textuur tekent Three.js vierkante
    // blokjes — dat zag je als hoekige puntjes in plaats van sterren.
    const stipTextuur = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d')!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.18, 'rgba(255,255,255,0.95)');
      g.addColorStop(0.42, 'rgba(255,255,255,0.32)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    type Sterlaag = {
      geo: THREE.BufferGeometry;
      mat: THREE.PointsMaterial;
      col: Float32Array;
      basis: Float32Array;
      fase: Float32Array;
      punten: THREE.Points;
      n: number;
    };
    const sterlagen: Sterlaag[] = [];

    function maakSterlaag(n: number, grootte: number, helderheid: number) {
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      // Onveranderlijke basiskleur: zonder deze kopie zou het knipperen
      // de kleur elke frame opnieuw verkleinen en doven de sterren uit.
      const basis = new Float32Array(n * 3);
      const fase = new Float32Array(n);

      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 92;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 48;
        pos[i * 3 + 2] = -4 - Math.random() * 34;

        const blauw = Math.random() < 0.3;
        const h = helderheid * (0.6 + Math.random() * 0.4);
        basis[i * 3] = (blauw ? 0.62 : 1) * h;
        basis[i * 3 + 1] = (blauw ? 0.84 : 1) * h;
        basis[i * 3 + 2] = h;

        col[i * 3] = basis[i * 3];
        col[i * 3 + 1] = basis[i * 3 + 1];
        col[i * 3 + 2] = basis[i * 3 + 2];

        fase[i] = Math.random() * Math.PI * 2;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: grootte,
        map: stipTextuur,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const punten = new THREE.Points(geo, mat);
      scene.add(punten);
      sterlagen.push({ geo, mat, col, basis, fase, punten, n });
    }

    // Veel kleine, minder middelgrote, een handvol grote — dat verschil
    // in formaat geeft diepte. Bewust gedempt gehouden: de sterren zijn
    // decor, de golf moet het beeld dragen.
    maakSterlaag(340, 0.20, 0.42);
    maakSterlaag(130, 0.38, 0.52);
    maakSterlaag(38, 0.70, 0.6);

    // ═════════════════════════════════════════════════════════════
    // LINT — veel lijnen dicht op elkaar. Per punt een eigen kleur,
    // zodat het lint aan de randen uitvaagt en op de toppen oplicht.
    // Dat is wat het die zijdeachtige uitstraling geeft.
    // ═════════════════════════════════════════════════════════════
    const LINES = 120;
    const POINTS = 230;
    const WIDTH = 48;
    const DEPTH = 5;

    const group = new THREE.Group();
    group.rotation.x = -0.22;
    group.rotation.z = 0.05;
    scene.add(group);

    type Lint = {
      pos: Float32Array;
      col: Float32Array;
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      z0: number;
      t: number;
    };
    const linten: Lint[] = [];

    for (let i = 0; i < LINES; i++) {
      const t = i / (LINES - 1);
      const z0 = -DEPTH / 2 + t * DEPTH;

      const pos = new Float32Array(POINTS * 3);
      const col = new Float32Array(POINTS * 3);
      for (let p = 0; p < POINTS; p++) {
        pos[p * 3] = -WIDTH / 2 + (p / (POINTS - 1)) * WIDTH;
        pos[p * 3 + 1] = 0;
        pos[p * 3 + 2] = z0;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

      const mat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      group.add(new THREE.Line(geo, mat));
      linten.push({ pos, col, geo, mat, z0, t });
    }

    // ═════════════════════════════════════════════════════════════
    // ANIMATIE
    // ═════════════════════════════════════════════════════════════
    let raf: number;
    let time = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.0035;

      for (const L of linten) {
        const { pos, col, geo, z0, t } = L;

        for (let p = 0; p < POINTS; p++) {
          const u = p / (POINTS - 1);
          const x = pos[p * 3];

          // Gestapelde golven. De z0-term geeft elke lijn een eigen fase,
          // waardoor de bundel vlecht in plaats van als één vlak te bewegen.
          const golf1 = Math.sin(x * 0.24 + time * 0.8 + z0 * 0.85) * 4.2;
          const golf2 = Math.sin(x * 0.45 - time * 1.15 + z0 * 1.5) * 1.5;
          const golf3 = Math.cos(x * 0.88 + time * 0.6 + z0 * 2.2) * 0.45;

          // Het lint zwelt aan en af over de lengte
          const zwelling = 0.55 + 0.45 * Math.sin(x * 0.11 - time * 0.5);

          pos[p * 3 + 1] = (golf1 + golf2) * zwelling + golf3;
          pos[p * 3 + 2] = z0 + Math.sin(x * 0.19 + time * 0.45 + z0) * 2.4;

          // Zacht uitvagen naar links en rechts
          const rand = Math.pow(Math.sin(u * Math.PI), 0.55);

          // Toppen lichten op, dalen blijven donker
          const top = 0.28 + 0.72 * ((golf1 / 4.2) * 0.5 + 0.5);

          const k = rand * top * 1.5;
          col[p * 3] = 0.16 * k + 0.5 * k * t;
          col[p * 3 + 1] = 0.52 * k + 0.42 * k * t;
          col[p * 3 + 2] = 0.95 * k + 0.05 * k * t;
        }

        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;
      }

      // Sterren zacht laten knipperen — altijd vanaf de basiskleur
      for (const S of sterlagen) {
        for (let i = 0; i < S.n; i++) {
          const tw = 0.55 + 0.45 * Math.sin(time * 2.4 + S.fase[i]);
          S.col[i * 3] = S.basis[i * 3] * tw;
          S.col[i * 3 + 1] = S.basis[i * 3 + 1] * tw;
          S.col[i * 3 + 2] = S.basis[i * 3 + 2] * tw;
        }
        S.geo.attributes.color.needsUpdate = true;
        S.punten.rotation.y += 0.00006;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ═════════════════════════════════════════════════════════════
    // RESIZE + CLEANUP
    // ═════════════════════════════════════════════════════════════
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      linten.forEach((l) => {
        l.geo.dispose();
        l.mat.dispose();
      });
      sterlagen.forEach((s) => {
        s.geo.dispose();
        s.mat.dispose();
      });
      stipTextuur.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
