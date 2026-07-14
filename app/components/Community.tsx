"use client";

import { motion, useReducedMotion } from "motion/react";
import { SOCIAL_LINKS, SOCIAL_ICON_PATHS, SOCIAL_ACCENTS } from "./SocialLinks";

export function Community() {
  const reduce = useReducedMotion();

  return (
    <section id="community" className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Join the Community
        </h2>
        <p className="mt-3 max-w-md text-white/60">
          Follow along, share feedback, and help shape what we build next.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{ "--accent": SOCIAL_ACCENTS[link.platform] } as React.CSSProperties}
              className="group flex flex-col items-center justify-center gap-3 border border-white/10 py-10 text-white/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d={SOCIAL_ICON_PATHS[link.platform]} />
              </svg>
              <span className="text-xs font-bold tracking-widest">
                {link.label.toUpperCase()}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
