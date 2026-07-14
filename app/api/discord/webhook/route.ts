import { NextResponse } from "next/server";

// Dipanggil oleh bot Discord (lihat BotDc/index.js -> notifyNewGuild) tiap
// kali bot di-invite ke server baru. Kita cuma mencatat & (opsional) meneruskan
// notifikasi ke channel Discord admin -- persetujuan/verifikasi server tetap
// manual lewat env var VERIFIED_GUILD_IDS (lihat /api/discord/verified-guilds).
const WEBHOOK_SECRET = process.env.DISCORD_WEBHOOK_SECRET;
const ADMIN_NOTIFY_WEBHOOK_URL = process.env.DISCORD_ADMIN_NOTIFY_WEBHOOK_URL;

type GuildJoinedPayload = {
  event?: string;
  guildId?: string;
  guildName?: string;
  ownerId?: string;
  memberCount?: number;
  joinedAt?: string;
};

async function notifyAdmin(payload: GuildJoinedPayload) {
  if (!ADMIN_NOTIFY_WEBHOOK_URL) return;
  try {
    await fetch(ADMIN_NOTIFY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "Server baru pasang bot",
            description: `**${payload.guildName}** (\`${payload.guildId}\`) baru saja invite bot.\n\nTambahkan \`${payload.guildId}\` ke \`VERIFIED_GUILD_IDS\` kalau mau diizinkan pakai fitur Join-to-Create.`,
            color: 0x00f0ff,
            fields: [
              { name: "Owner ID", value: String(payload.ownerId ?? "-"), inline: true },
              { name: "Member Count", value: String(payload.memberCount ?? "-"), inline: true },
            ],
            timestamp: payload.joinedAt,
          },
        ],
      }),
    });
  } catch (err) {
    console.error("[discord-webhook] Gagal kirim notifikasi admin:", err);
  }
}

export async function POST(request: Request) {
  if (WEBHOOK_SECRET) {
    const provided = request.headers.get("x-webhook-secret");
    if (provided !== WEBHOOK_SECRET) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  let payload: GuildJoinedPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Body tidak valid" }, { status: 400 });
  }

  if (!payload.guildId) {
    return NextResponse.json({ success: false, error: "guildId wajib diisi" }, { status: 400 });
  }

  console.log(
    `[discord-webhook] ${payload.event ?? "guild_joined"}: ${payload.guildName} (${payload.guildId})`
  );

  await notifyAdmin(payload);

  return NextResponse.json({ success: true });
}
