import type { Metadata } from "next";
import { VerifyClient } from "./VerifyClient";

export const metadata: Metadata = {
  title: "Verifikasi Member",
  robots: { index: false, follow: false },
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/[0.02] p-8 text-center">
        <h1 className="font-display text-2xl font-extrabold uppercase tracking-wider">
          Verifikasi Akun
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Selesaikan verifikasi untuk membuka akses penuh ke server Discord.
        </p>
        <div className="mt-8">
          <VerifyClient token={token} />
        </div>
      </div>
    </main>
  );
}
