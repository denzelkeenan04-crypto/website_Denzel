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
      { fase: 0, diepte: 0, snelheid: 1.0, r: 0.22, g: 0.62, b: 1.0, kracht: 1.45 },
      { fase: 2.1, diepte: -6, snelheid: 0.72, r: 0.45, g: 0.82, b: 1.0, kracht: 0.9 },
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
          opacity: 0.92,
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
      lijnen.forEach((l) => {
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
