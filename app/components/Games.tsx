"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface Project {
  title: string;
  genre: string;
  href: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "Nightfall Protocol",
    genre: "Roblox · Survival horror",
    href: "https://www.roblox.com/id/games/128911114099198/Nightfall-Protocol",
    image: "/project1.webp",
  },
  {
    title: "Project",
    genre: "Coming soon",
    href: "#",
    image: "/placeholder.webp",
  },
  {
    title: "Project",
    genre: "Coming soon",
    href: "#",
    image: "/placeholder.webp",
  },
];

export function Games() {
  const reduce = useReducedMotion();

  return (
    <section id="games" className="border-b border-white/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Projects
        </h2>
        <p className="mt-3 max-w-md text-white/60">
          Everything below is in active development. Nothing here is final.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={i}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative block overflow-hidden border border-white/10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover contrast-110 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                <div className="absolute inset-0 bg-cyan/10 mix-blend-overlay" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60">{project.genre}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
