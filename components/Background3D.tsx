'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ═════════════════════════════════════════════════════════════
    // SCENE SETUP
    // ═════════════════════════════════════════════════════════════
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ═════════════════════════════════════════════════════════════
    // PARTICLES FIELD — subtiel, mag de tekst nooit overstemmen
    // ═════════════════════════════════════════════════════════════
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      // Gedempt paars/blauw — geen felle accenten die met de content concurreren
      if (Math.random() < 0.5) {
        colors[i] = 0.42; colors[i + 1] = 0.36; colors[i + 2] = 0.60;
      } else {
        colors[i] = 0.34; colors[i + 1] = 0.44; colors[i + 2] = 0.58;
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // ═════════════════════════════════════════════════════════════
    // ANIMATION LOOP — alleen een trage drift, camera staat stil
    // ═════════════════════════════════════════════════════════════
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (particles) {
        particles.rotation.x += 0.00004;
        particles.rotation.y += 0.00006;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ═════════════════════════════════════════════════════════════
    // WINDOW RESIZE
    // ═════════════════════════════════════════════════════════════
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // ═════════════════════════════════════════════════════════════
    // CLEANUP
    // ═════════════════════════════════════════════════════════════
    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
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
