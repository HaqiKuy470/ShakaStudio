"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function JetFlightPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const jetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !containerRef.current || !pathRef.current || !jetRef.current) return;

    const ctx = gsap.context(() => {
      const buildPath = () => {
        const h = containerRef.current!.offsetHeight;
        const w = containerRef.current!.offsetWidth;
        const right = w - 48;
        const mid = w * 0.72;
        const d = [
          `M ${right},0`,
          `C ${mid},${h * 0.18} ${right},${h * 0.32} ${mid},${h * 0.48}`,
          `C ${w * 0.58},${h * 0.62} ${right},${h * 0.74} ${mid},${h * 0.88}`,
          `S ${right},${h * 0.96} ${mid},${h}`,
        ].join(" ");
        pathRef.current!.setAttribute("d", d);
        return d;
      };

      const d = buildPath();

      gsap.set(jetRef.current, {
        opacity: 1,
        motionPath: {
          path: d,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0,
          end: 0,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to(jetRef.current, {
        motionPath: {
          path: d,
          alignOrigin: [0.5, 0.5],
          autoRotate: 90,
          start: 0,
          end: 1,
        },
        ease: "none",
        duration: 1,
      }, 0).to(jetRef.current, {
        opacity: 0,
        ease: "power1.in",
        duration: 0.12,
      }, 0.88);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10 hidden md:block"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
        <path ref={pathRef} fill="none" stroke="url(#flight-trail)" strokeWidth="1.5" opacity="0.35" />
        <defs>
          <linearGradient id="flight-trail" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff00e5" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
      <div ref={jetRef} className="absolute left-0 top-0 h-14 w-14">
        <svg
          className="h-full w-full text-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.55)]"
          viewBox="0 0 64 64"
          fill="currentColor"
        >
          <path d="M32 2 L38 24 L58 34 L58 40 L38 34 L36 50 L44 56 L44 60 L32 57 L20 60 L20 56 L28 50 L26 34 L6 40 L6 34 L26 24 Z" />
        </svg>
      </div>
    </div>
  );
}
