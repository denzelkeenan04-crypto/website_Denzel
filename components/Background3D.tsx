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
    const STAR_COUNT = 700;
    const starPos = new Float32Array(STAR_COUNT * 3);
    const starCol = new Float32Array(STAR_COUNT * 3);
    // Onveranderlijke basiskleur. Zonder deze kopie zou het knipperen
    // de kleur elke frame opnieuw verkleinen en doven de sterren uit.
    const starBase = new Float32Array(STAR_COUNT * 3);
    const starPhase = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 90;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 46;
      starPos[i * 3 + 2] = -4 - Math.random() * 34;

      // Overwegend wit, een deel lichtblauw — geeft diepte
      const blauw = Math.random() < 0.35;
      const helder = 0.6 + Math.random() * 0.4;
      starBase[i * 3] = (blauw ? 0.6 : 1) * helder;
      starBase[i * 3 + 1] = (blauw ? 0.82 : 1) * helder;
      starBase[i * 3 + 2] = helder;

      starCol[i * 3] = starBase[i * 3];
      starCol[i * 3 + 1] = starBase[i * 3 + 1];
      starCol[i * 3 + 2] = starBase[i * 3 + 2];

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
    const LINES = 70;
    const POINTS = 190;
    const WIDTH = 48;
    const HALF = 3.1; // halve breedte van het lint

    const group = new THREE.Group();
    group.rotation.x = -0.22;
    group.rotation.z = 0.05;
    scene.add(group);

    type Lijn = {
      pos: Float32Array;
      col: Float32Array;
      geo: THREE.BufferGeometry;
      mat: THREE.LineBasicMaterial;
      v: number; // positie dwars over het lint, -1 t/m 1
      lint: number;
    };
    const lijnen: Lijn[] = [];

    // Twee linten over elkaar, elk met eigen fase en tint — dat geeft
    // de gelaagdheid en de kruisingen uit de referentie.
    const LINTEN = [
      { fase: 0, diepte: 0, snelheid: 1.0, r: 0.16, g: 0.52, b: 1.0, kracht: 1.0 },
      { fase: 2.1, diepte: -6, snelheid: 0.72, r: 0.34, g: 0.72, b: 1.0, kracht: 0.62 },
    ];

    LINTEN.forEach((lint, li) => {
      for (let i = 0; i < LINES; i++) {
        const v = (i / (LINES - 1)) * 2 - 1;

        const pos = new Float32Array(POINTS * 3);
        const col = new Float32Array(POINTS * 3);
        for (let p = 0; p < POINTS; p++) {
          pos[p * 3] = -WIDTH / 2 + (p / (POINTS - 1)) * WIDTH;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

        const mat = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        group.add(new THREE.Line(geo, mat));
        lijnen.push({ pos, col, geo, mat, v, lint: li });
      }
    });

    // ═════════════════════════════════════════════════════════════
    // ANIMATIE
    // ═════════════════════════════════════════════════════════════
    let raf: number;
    let time = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      time += 0.0035;

      for (const L of lijnen) {
        const { pos, col, geo, v, lint } = L;
        const S = LINTEN[lint];
        const tt = time * S.snelheid + S.fase;

        for (let p = 0; p < POINTS; p++) {
          const u = p / (POINTS - 1);
          const x = pos[p * 3];

          // ── Hartlijn: gestapelde golven, grof naar fijn. De frequenties
          //    staan niet in gehele verhouding, waardoor het patroon zich
          //    nooit netjes herhaalt en organisch blijft ogen.
          const yc =
            Math.sin(x * 0.113 + tt * 0.8) * 4.0 +
            Math.sin(x * 0.197 - tt * 1.1) * 1.7 +
            Math.sin(x * 0.331 + tt * 0.5) * 0.7;

          const zc =
            S.diepte + Math.sin(x * 0.087 - tt * 0.55) * 3.0;

          // ── Draaiing om de eigen as. Hierdoor kantelt het lint: soms
          //    kijk je er plat op (breed en zacht), soms op de rand
          //    (smal en fel). Dat is de vouw uit de referentie.
          const draai =
            Math.sin(x * 0.075 + tt * 0.62) * 1.75 +
            Math.sin(x * 0.028 - tt * 0.31) * 0.95;

          const cos = Math.cos(draai);
          const sin = Math.sin(draai);

          // Het lint wordt breder en smaller over de lengte
          const breedte = HALF * (0.62 + 0.38 * Math.sin(x * 0.052 - tt * 0.4));

          pos[p * 3 + 1] = yc + v * breedte * cos;
          pos[p * 3 + 2] = zc + v * breedte * sin;

          // ── Kleur ──
          // Zacht uitvagen aan de linker- en rechterrand
          const rand = Math.pow(Math.sin(u * Math.PI), 0.5);

          // Op de rand gezien bundelen de lijnen: daar oplichten
          const opDeRand = 0.3 + 0.7 * (1 - Math.abs(cos));

          // Buitenranden van het lint doven uit, de kern blijft helder
          const kern = 1 - Math.abs(v) * 0.55;

          const k = rand * opDeRand * kern * S.kracht;
          col[p * 3] = S.r * k;
          col[p * 3 + 1] = S.g * k;
          col[p * 3 + 2] = S.b * k;
        }

        geo.attributes.position.needsUpdate = true;
        geo.attributes.color.needsUpdate = true;
      }

      // Sterren zacht laten knipperen — altijd vanaf de basiskleur
      for (let i = 0; i < STAR_COUNT; i++) {
        const tw = 0.62 + 0.38 * Math.sin(time * 2.4 + starPhase[i]);
        starCol[i * 3] = starBase[i * 3] * tw;
        starCol[i * 3 + 1] = starBase[i * 3 + 1] * tw;
        starCol[i * 3 + 2] = starBase[i * 3 + 2] * tw;
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
      lijnen.forEach((l) => {
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
