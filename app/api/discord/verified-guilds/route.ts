import { NextResponse } from "next/server";

// Dipanggil berkala oleh bot (lihat BotDc/index.js -> refreshVerifiedGuilds)
// untuk tahu server mana yang boleh pakai fitur Join-to-Create. Daftar server
// terverifikasi dikelola manual lewat env var VERIFIED_GUILD_IDS (dipisah
// koma) -- tambahkan guild ID di sini lalu redeploy kalau ada server baru
// yang disetujui.
export async function GET() {
  const verifiedGuildIds = (process.env.VERIFIED_GUILD_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  return NextResponse.json({ verifiedGuildIds });
}
