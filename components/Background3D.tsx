'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // ═════════════════════════════════════════════════════════════
    // SCENE
    // ═════════════════════════════════════════════════════════════
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 4.5, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ═════════════════════════════════════════════════════════════
    // GOLVENDE LIJNEN
    // Elke lijn is een rij punten; de hoogte komt uit gestapelde
    // sinussen, zodat het geheel als één doek beweegt.
    // ═════════════════════════════════════════════════════════════
    const LINE_COUNT = 60;
    const POINTS = 200;
    const WIDTH = 46;
    const DEPTH = 24;

    const group = new THREE.Group();
    group.rotation.x = -0.25;
    scene.add(group);

    const lines: {
      positions: Float32Array;
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      z: number;
    }[] = [];

    const colBlue = new THREE.Color(0x0ea5e9);
    const colPurple = new THREE.Color(0x7c3aed);

    for (let i = 0; i < LINE_COUNT; i++) {
      const t = i / (LINE_COUNT - 1);
      const z = -DEPTH / 2 + t * DEPTH;

      const positions = new Float32Array(POINTS * 3);
      for (let p = 0; p < POINTS; p++) {
        positions[p * 3] = -WIDTH / 2 + (p / (POINTS - 1)) * WIDTH;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = z;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Blauw op de achtergrond, paars naar voren — jouw huisstijl
      const color = colBlue.clone().lerp(colPurple, t);

      // Lijnen in het midden van het doek zijn het helderst
      const midden = 1 - Math.abs(t - 0.5) * 2;
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08 + 0.2 * midden,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      group.add(new THREE.Line(geo, mat));
      lines.push({ positions, geo, mat, z });
    }

    // ═════════════════════════════════════════════════════════════
    // ANIMATIE
    // ═════════════════════════════════════════════════════════════
    let raf: number;
    let time = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.004;

      for (const L of lines) {
        const { positions, geo, z } = L;
        for (let p = 0; p < POINTS; p++) {
          const x = positions[p * 3];
          positions[p * 3 + 1] =
            Math.sin(x * 0.16 + time * 1.0 + z * 0.18) * 1.8 +
            Math.sin(x * 0.07 - time * 0.6 + z * 0.09) * 1.2 +
            Math.cos(z * 0.3 + time * 0.5) * 0.7;
        }
        geo.attributes.position.needsUpdate = true;
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
      lines.forEach((l) => {
        l.geo.dispose();
        l.mat.dispose();
      });
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
