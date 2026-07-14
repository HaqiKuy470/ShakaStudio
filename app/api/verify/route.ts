import { NextResponse } from "next/server";

// Diteruskan ke HTTP server kecil yang jalan di sisi bot (lihat
// BotDc/member-verification.js -> startVerifyServer). Bot yang sebenarnya
// menaikkan role Discord user, endpoint ini cuma jembatan dari halaman
// /verify supaya secret callback tidak pernah sampai ke browser.
const BOT_VERIFY_CALLBACK_URL = process.env.BOT_VERIFY_CALLBACK_URL;
const BOT_VERIFY_CALLBACK_SECRET = process.env.BOT_VERIFY_CALLBACK_SECRET;

export async function POST(request: Request) {
  if (!BOT_VERIFY_CALLBACK_URL || !BOT_VERIFY_CALLBACK_SECRET) {
    console.error(
      "[verify] BOT_VERIFY_CALLBACK_URL / BOT_VERIFY_CALLBACK_SECRET belum diset di environment website."
    );
    return NextResponse.json(
      { success: false, error: "Sistem verifikasi belum dikonfigurasi." },
      { status: 500 }
    );
  }

  let token: unknown;
  try {
    const body = await request.json();
    token = body?.token;
  } catch {
    return NextResponse.json(
      { success: false, error: "Body request tidak valid." },
      { status: 400 }
    );
  }

  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { success: false, error: "Token tidak ditemukan." },
      { status: 400 }
    );
  }

  try {
    const botRes = await fetch(BOT_VERIFY_CALLBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, secret: BOT_VERIFY_CALLBACK_SECRET }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await botRes.json().catch(() => ({}));

    if (!botRes.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error || "Verifikasi gagal." },
        { status: botRes.status === 200 ? 400 : botRes.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[verify] Gagal menghubungi bot:", err);
    return NextResponse.json(
      { success: false, error: "Tidak bisa menghubungi server verifikasi. Coba lagi nanti." },
      { status: 502 }
    );
  }
}
