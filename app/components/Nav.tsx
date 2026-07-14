"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";


export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#"
          aria-label="Shaka Studio home"
          className="font-display text-lg font-extrabold uppercase tracking-wider"
        >
          Shaka Studio
        </a>
        <a
          href="#"
          className="hidden border border-cyan px-4 py-2 text-xs font-bold tracking-widest text-cyan transition-colors hover:bg-cyan hover:text-black md:inline-block"
        >
          JOIN DISCORD
        </a>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-6 py-6 md:hidden">
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="mt-6 block border border-cyan px-4 py-3 text-center text-xs font-bold tracking-widest text-cyan transition-colors hover:bg-cyan hover:text-black"
          >
            JOIN DISCORD
          </a>
        </div>
      )}
    </header>
  );
}
