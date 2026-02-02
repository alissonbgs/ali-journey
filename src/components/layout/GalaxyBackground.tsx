"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkle: number;
  speed: number;
  depth: number;
  direction: 1 | -1;
};

const MAX_DPR = 2;
const STAR_DENSITY = 0.00012;
const STAR_MIN = 20;
const STAR_MAX = 100;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const createStars = (count: number, width: number, height: number): Star[] => {
  const stars: Star[] = [];

  for (let i = 0; i < count; i += 1) {
    const depth = Math.random() * 0.45 + 0.15;
    const radius = Math.random() * 1.4 + 0.3;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: radius,
      alpha: Math.random() * 0.5 + 0.35,
      twinkle: Math.random() * 2 + 0.5,
      speed: (Math.random() * (depth >= 1 ? 100 : 5 + 0.02)) * depth,
      depth,
      direction: (radius >= 1) ? 1 : -1,
    });
  }

  return stars;
};

const createBackground = (
  width: number,
  height: number,
  dpr: number,
): HTMLCanvasElement | null => {
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.scale(dpr, dpr);

  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(
    width * 0.45,
    height * 0.3,
    0,
    width * 0.45,
    height * 0.3,
    Math.max(width, height) * 0.7,
  );
  glow.addColorStop(0, "rgba(90, 56, 165, 0.08)");
  glow.addColorStop(0.45, "rgba(40, 24, 78, 0.06)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  const nebula = context.createRadialGradient(
    width * 0.72,
    height * 0.65,
    0,
    width * 0.72,
    height * 0.65,
    Math.max(width, height) * 0.55,
  );
  nebula.addColorStop(0, "rgba(90, 52, 158, 0.07)");
  nebula.addColorStop(0.52, "rgba(42, 20, 84, 0.05)");
  nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
  context.fillStyle = nebula;
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 10; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = (Math.random() * 0.25 + 0.15) * Math.max(width, height);
    const cloud = context.createRadialGradient(x, y, 0, x, y, radius);
    cloud.addColorStop(0, "rgba(110, 78, 186, 0.025)");
    cloud.addColorStop(0.42, "rgba(52, 30, 103, 0.02)");
    cloud.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = cloud;
    context.fillRect(0, 0, width, height);
  }

  return canvas;
};

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return undefined;
    }

    const prefersReducedMotion =
      globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const width = globalThis.innerWidth;
      const height = globalThis.innerHeight;
      const dpr = Math.min(globalThis.devicePixelRatio || 1, MAX_DPR);

      sizeRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = clamp(
        Math.floor(width * height * STAR_DENSITY),
        STAR_MIN,
        STAR_MAX,
      );
      starsRef.current = createStars(starCount, width, height);
      backgroundRef.current = createBackground(width, height, dpr);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        return;
      }

      pointerRef.current = {
        x: (event.clientX / width) * 2 - 1,
        y: (event.clientY / height) * 2 - 1,
      };
    };

    const handleBlur = () => {
      pointerRef.current = { x: 0, y: 0 };
    };

    const render = (time: number) => {
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        return;
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);

      if (backgroundRef.current) {
        context.drawImage(backgroundRef.current, 0, 0, width, height);
      }

      const offsetX = pointerRef.current.x * 28;
      const offsetY = pointerRef.current.y * 22;

      context.save();
      context.globalCompositeOperation = "lighter";

      for (const star of starsRef.current) {
        star.x += star.speed * star.direction;
        if (star.direction === 1 && star.x > width + 8) {
          star.x = -8;
          star.y = Math.random() * height;
        }
        if (star.direction === -1 && star.x < -8) {
          star.x = width + 8;
          star.y = Math.random() * height;
        }

        const twinkle =
          star.alpha + Math.sin(time * 0.001 * star.twinkle + star.x) * 0.18;
        const alpha = clamp(twinkle, 0.15, 0.95);
        const x = star.x + offsetX * star.depth;
        const y = star.y + offsetY * star.depth;
        const spike = Math.max(star.radius * 2.4, 1.4);
        const lineWidth = Math.max(star.radius * 0.35, 0.6);

        context.beginPath();
        context.fillStyle = `rgba(220, 200, 255, ${alpha})`;
        context.arc(x, y, Math.max(star.radius * 0.5, 0.5), 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = `rgba(230, 210, 255, ${alpha * 0.8})`;
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(x - spike, y);
        context.lineTo(x + spike, y);
        context.moveTo(x, y - spike);
        context.lineTo(x, y + spike);
        context.stroke();
      }

      context.restore();

      if (!prefersReducedMotion) {
        animationRef.current = window.requestAnimationFrame(render);
      }
    };

    resize();
    render(0);

    globalThis.addEventListener("resize", resize);
    globalThis.addEventListener("pointermove", handlePointerMove);
    globalThis.addEventListener("blur", handleBlur);

    return () => {
      globalThis.removeEventListener("resize", resize);
      globalThis.removeEventListener("pointermove", handlePointerMove);
      globalThis.removeEventListener("blur", handleBlur);
      if (animationRef.current !== null) {
        globalThis.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      ref={canvasRef}
    />
  );
}
