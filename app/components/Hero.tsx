import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex flex-col border-b border-white/10 px-6 pt-28 pb-16 md:min-h-[100dvh] md:justify-center md:py-0">
      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Image
          src="/atas.webp"
          alt=""
          width={1257}
          height={402}
          priority
          className="h-10 w-auto self-start [filter:drop-shadow(0_0_6px_rgba(0,240,255,0.8))_drop-shadow(0_0_16px_rgba(0,240,255,0.45))]"
        />
        <h1
          data-text="SHAKA STUDIO"
          className="glitch-text font-display text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl"
        >
          SHAKA STUDIO
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          An independent game studio building bold, fast, community-first
          experiences. Small team, big ambition.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="#"
            className="border border-cyan bg-cyan px-6 py-3 text-sm font-bold tracking-widest text-black transition-transform hover:-translate-y-0.5"
          >
            JOIN DISCORD
          </a>
          <a
            href="#games"
            className="border border-white/30 px-6 py-3 text-sm font-bold tracking-widest text-white transition-colors hover:border-white hover:bg-white/5"
          >
            SEE PROJECTS
          </a>
        </div>
      </div>
    </section>
  );
}
