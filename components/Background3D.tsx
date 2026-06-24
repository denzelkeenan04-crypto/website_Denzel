'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshesRef = useRef<THREE.Object3D[]>([]);

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
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ═════════════════════════════════════════════════════════════
    // LIGHTING
    // ═════════════════════════════════════════════════════════════
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x7c3aed, 1.5, 200);
    pointLight1.position.set(15, 15, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0ea5e9, 1, 200);
    pointLight2.position.set(-15, -15, 10);
    scene.add(pointLight2);

    // ═════════════════════════════════════════════════════════════
    // PARTICLES FIELD
    // ═════════════════════════════════════════════════════════════
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.48; colors[i + 1] = 0.23; colors[i + 2] = 0.93; // Purple
      } else if (colorChoice < 0.66) {
        colors[i] = 0.06; colors[i + 1] = 0.65; colors[i + 2] = 0.93; // Blue
      } else {
        colors[i] = 0.96; colors[i + 1] = 0.62; colors[i + 2] = 0.61; // Orange
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // ═════════════════════════════════════════════════════════════
    // 3D MESHES — FUTURISTIC & COOL
    // ═════════════════════════════════════════════════════════════
    const meshes: THREE.Object3D[] = [];

    // Wireframe Octahedron
    const octaGeo = new THREE.OctahedronGeometry(2.5, 3);
    const octaMat = new THREE.MeshPhongMaterial({
      color: 0x7c3aed,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.6,
      shininess: 100,
      wireframe: false,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(-12, 10, -15);
    octa.castShadow = true;
    scene.add(octa);
    meshes.push(octa);

    // Glowing Torus with wave pattern
    const torusGeo = new THREE.TorusGeometry(3, 1, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.8,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(12, -8, -12);
    torus.rotation.x = Math.PI / 3;
    torus.castShadow = true;
    scene.add(torus);
    meshes.push(torus);

    // Tetrahedron Cluster (multiple)
    for (let i = 0; i < 2; i++) {
      const tetraGeo = new THREE.TetrahedronGeometry(1.8, 2);
      const tetraMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.85,
        roughness: 0.15,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.7,
      });
      const tetra = new THREE.Mesh(tetraGeo, tetraMat);
      tetra.position.set((i - 0.5) * 15, 15, -8);
      tetra.castShadow = true;
      scene.add(tetra);
      meshes.push(tetra);
    }

    // Ultra-shiny Dodecahedron
    const dodecaGeo = new THREE.DodecahedronGeometry(2, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      metalness: 0.99,
      roughness: 0.01,
      emissive: 0x22c55e,
      emissiveIntensity: 0.5,
    });
    const dodeca = new THREE.Mesh(dodecaGeo, dodecaMat);
    dodeca.position.set(-8, -12, -10);
    dodeca.castShadow = true;
    scene.add(dodeca);
    meshes.push(dodeca);

    meshesRef.current = meshes;

    // ═════════════════════════════════════════════════════════════
    // ANIMATION LOOP
    // ═════════════════════════════════════════════════════════════
    let animationId: number;
    const time = { value: 0 };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time.value += 0.001;

      // Rotate particles
      if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
      }

      // Animate meshes with sophisticated patterns
      meshes.forEach((mesh, i) => {
        // Multi-axis rotation
        mesh.rotation.x += 0.005 + i * 0.002;
        mesh.rotation.y += 0.007 + i * 0.0015;
        mesh.rotation.z += 0.003 + i * 0.001;

        // Complex movement patterns
        mesh.position.x += Math.sin(time.value * 0.3 + i) * 0.008;
        mesh.position.y += Math.cos(time.value * 0.4 + i) * 0.008;
        mesh.position.z += Math.sin(time.value * 0.25 + i) * 0.006;

        // Pulse scaling
        const scale = 1 + Math.sin(time.value * 1.2 + i * 1.5) * 0.15;
        mesh.scale.set(scale, scale, scale);

        // Breathing effect on emissive intensity
        if ((mesh as any).material?.emissiveIntensity !== undefined) {
          (mesh as any).material.emissiveIntensity = 0.5 + Math.sin(time.value * 0.8 + i) * 0.3;
        }
      });

      // Camera zoom effect
      camera.position.z = 5 + Math.sin(time.value * 0.3) * 0.5;

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
