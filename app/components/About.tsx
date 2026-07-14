"use client";

import { motion, useReducedMotion } from "motion/react";

const FOCUS = ["Roblox Studio", "Lua", "Fast prototyping", "Arcade action", "Social sandbox"];

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="border-b border-white/10 px-6 py-24 md:py-32">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
          About Shaka
        </h2>
        <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
          <p>
            Shaka Studio is a small, independent team making games because we
            want to play them. No publisher, no roadmap dictated from above,
            just a handful of people chasing games that feel fast, sharp, and
            fun to come back to.
          </p>
          <p>
            We build on Roblox first, staying close to the platform where our
            community already lives. That means we ship quickly, iterate in
            public, and listen to the people actually playing.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FOCUS.map((item) => (
            <span
              key={item}
              className="border border-white/15 px-3 py-1.5 text-xs font-medium tracking-wide text-white/60"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
