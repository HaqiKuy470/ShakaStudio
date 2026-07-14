import Image from "next/image";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <Image
          src="/footer.webp"
          alt="Shaka Studio"
          width={1818}
          height={584}
          className="h-10 w-auto"
        />
        <SocialLinks />
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Shaka Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
