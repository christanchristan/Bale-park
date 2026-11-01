import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Procedural 3D Bale-style highland landscape (no image files needed).
// Mouse / touch moves the camera for a parallax effect.

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function heightAt(x, z) {
  const ridge = 1 - Math.abs(Math.sin(x * 0.21 + Math.sin(z * 0.16) * 2.1));
  const n =
    Math.sin(x * 0.37) * Math.cos(z * 0.31) * 1.1 +
    Math.sin(x * 0.93 + z * 0.71) * 0.45 +
    Math.sin(z * 1.27 - x * 0.41) * 0.22;
  let h = ridge * ridge * 6.6 + n * 1.3;
  h *= 0.35 + 0.95 * smooth(8, -34, z); // taller toward the back
  h *= 0.18 + 0.82 * smooth(2, 12, Math.abs(x)); // open valley in the middle
  return Math.max(h, -0.6);
}

export default function Hero3D({ onFail }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      if (onFail) onFail();
      return undefined;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.className = 'hero-canvas';
    host.appendChild(renderer.domElement);

    const SKY = new THREE.Color('#2a5a4b');
    const scene = new THREE.Scene();
    scene.background = SKY;
    scene.fog = new THREE.Fog(SKY, 22, 74);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 140);
    camera.position.set(0, 4.2, 12);

    // ---- terrain ----
    const geo = new THREE.PlaneGeometry(96, 72, 150, 110);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const lo = new THREE.Color('#3d7a58');
    const mid = new THREE.Color('#bda25e');
    const hi = new THREE.Color('#f4eedd');
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const h = heightAt(pos.getX(i), pos.getZ(i));
      pos.setY(i, h);
      const t = Math.min(1, Math.max(0, h / 6));
      if (t < 0.55) c.copy(lo).lerp(mid, t / 0.55);
      else c.copy(mid).lerp(hi, (t - 0.55) / 0.45);
      const j = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
      c.offsetHSL(0, 0, (j - 0.5) * 0.05);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 });
    const terrain = new THREE.Mesh(geo, terrainMat);
    terrain.position.z = -12;
    scene.add(terrain);

    // ---- light ----
    scene.add(new THREE.HemisphereLight(0xffeccc, 0x2a5a4b, 1.15));
    const sunLight = new THREE.DirectionalLight(0xffc98a, 2.4);
    sunLight.position.set(18, 10, -26);
    scene.add(sunLight);

    // ---- sun + glow ----
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffd18f, fog: false });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), sunMat);
    sun.position.set(14, 11, -52);
    scene.add(sun);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0xffb35c, transparent: true, opacity: 0.22, fog: false });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(7, 32, 32), glowMat);
    glow.position.copy(sun.position);
    scene.add(glow);

    // ---- drifting mist / dust motes ----
    const N = 260;
    const pGeo = new THREE.BufferGeometry();
    const pArr = new Float32Array(N * 3);
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      pArr[i * 3] = (Math.random() - 0.5) * 50;
      pArr[i * 3 + 1] = 0.6 + Math.random() * 8;
      pArr[i * 3 + 2] = -30 + Math.random() * 44;
      seeds[i] = Math.random() * 6.28;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    const cv = document.createElement('canvas');
    cv.width = cv.height = 64;
    const cx = cv.getContext('2d');
    const gr = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    cx.fillStyle = gr;
    cx.fillRect(0, 0, 64, 64);
    const dot = new THREE.CanvasTexture(cv);
    const pMat = new THREE.PointsMaterial({ color: 0xfff1d6, size: 0.14, map: dot, transparent: true, opacity: 0.7, depthWrite: false });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ---- sizing ----
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // ---- input ----
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    // ---- loop (paused when offscreen / tab hidden) ----
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(host);

    const look = new THREE.Vector3();
    let raf = 0;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = now / 1000;
      const px = target.x * 2.4 + Math.sin(t * 0.15) * 1.2;
      const py = 4.2 - target.y * 0.7 + Math.sin(t * 0.22) * 0.12;
      camera.position.x += (px - camera.position.x) * 0.04;
      camera.position.y += (py - camera.position.y) * 0.04;
      look.set(camera.position.x * 0.25, 2.2, -14);
      camera.lookAt(look);
      const a = pGeo.attributes.position;
      for (let i = 0; i < N; i++) {
        a.array[i * 3] += Math.sin(t * 0.3 + seeds[i]) * 0.003;
        a.array[i * 3 + 1] += Math.sin(t * 0.4 + seeds[i]) * 0.002;
      }
      a.needsUpdate = true;
      glowMat.opacity = 0.2 + Math.sin(t * 0.6) * 0.03;
      renderer.render(scene, camera);
    };
    if (!reduced) raf = requestAnimationFrame(loop);
    requestAnimationFrame(() => renderer.domElement.classList.add('ready'));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      terrainMat.dispose();
      sun.geometry.dispose();
      sunMat.dispose();
      glow.geometry.dispose();
      glowMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      dot.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, [onFail]);

  return <div ref={hostRef} className="hero-3d" aria-hidden="true" />;
}
