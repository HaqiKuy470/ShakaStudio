import type { Metadata } from "next";
import { VerifyClient } from "./VerifyClient";

export const metadata: Metadata = {
  title: "Verifikasi Member",
  robots: { index: false, follow: false },
};

// Cek cepat apakah HTTP server bot (Pterodactyl) lagi online, sebelum
// nampilin tombol verifikasi -- biar user langsung liat peringatan yang
// jelas daripada baru gagal setelah klik.
async function checkBotOnline(): Promise<boolean> {
  const callbackUrl = process.env.BOT_VERIFY_CALLBACK_URL;
  if (!callbackUrl) return false;

  try {
    const healthUrl = new URL(callbackUrl);
    healthUrl.pathname = "/health";
    const res = await fetch(healthUrl, {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const botOnline = await checkBotOnline();

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
          {botOnline ? (
            <VerifyClient token={token} />
          ) : (
            <p className="border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
              Layanan verifikasi sedang offline. Coba lagi dalam beberapa saat.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
