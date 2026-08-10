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
    const STAR_COUNT = 520;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    const starPhase = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 2] = -10 - Math.random() * 60;

      // Overwegend wit, een deel lichtblauw — geeft diepte
      const blauw = Math.random() < 0.35;
      const helder = 0.55 + Math.random() * 0.45;
      starCol[i * 3] = (blauw ? 0.55 : 1) * helder;
      starCol[i * 3 + 1] = (blauw ? 0.78 : 1) * helder;
      starCol[i * 3 + 2] = helder;

      starPhase[i] = Math.random() * Math.PI * 2;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ═════════════════════════════════════════════════════════════
    // LINT — veel lijnen dicht op elkaar. Per punt een eigen kleur,
    // zodat het lint aan de randen uitvaagt en op de toppen oplicht.
    // Dat is wat het die zijdeachtige uitstraling geeft.
    // ═════════════════════════════════════════════════════════════
    const LINES = 110;
    const POINTS = 220;
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
        opacity: 0.5,
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

          // Gestapelde golven van grof naar fijn. De frequenties zijn zo
          // gekozen dat er ruim twee volle zwaaien in beeld passen —
          // bij een langere golflengte zie je alleen een bijna rechte lijn.
          const golf1 = Math.sin(x * 0.24 + time * 0.8 + z0 * 0.85) * 4.2;
          const golf2 = Math.sin(x * 0.45 - time * 1.15 + z0 * 1.5) * 1.5;
          const golf3 = Math.cos(x * 0.88 + time * 0.6 + z0 * 2.2) * 0.45;

          // Het lint zwelt aan en af over de lengte
          const zwelling = 0.55 + 0.45 * Math.sin(x * 0.11 - time * 0.5);

          const y = (golf1 + golf2) * zwelling + golf3;
          pos[p * 3 + 1] = y;
          pos[p * 3 + 2] = z0 + Math.sin(x * 0.19 + time * 0.45 + z0) * 2.4;

          // Zacht uitvagen naar links en rechts
          const rand = Math.pow(Math.sin(u * Math.PI), 0.55);

          // Toppen lichten op, dalen blijven donker
          const top = 0.28 + 0.72 * ((golf1 / 4.2) * 0.5 + 0.5);

          const k = rand * top;
          col[p * 3] = 0.16 * k + 0.5 * k * t;
          col[p * 3 + 1] = 0.52 * k + 0.42 * k * t;
          col[p * 3 + 2] = 0.95 * k + 0.05 * k * t;
        }

        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;
      }

      // Sterren zacht laten pulseren
      for (let i = 0; i < STAR_COUNT; i++) {
        const tw = 0.72 + 0.28 * Math.sin(time * 2.2 + starPhase[i]);
        const base = starCol[i * 3 + 2];
        starCol[i * 3] = starCol[i * 3] * 0 + base * tw * (i % 3 === 0 ? 0.6 : 1);
        starCol[i * 3 + 1] = base * tw * (i % 3 === 0 ? 0.82 : 1);
        starCol[i * 3 + 2] = base * tw;
      }
      starGeo.attributes.color.needsUpdate = true;
      stars.rotation.y += 0.00008;

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
      starGeo.dispose();
      starMat.dispose();
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
