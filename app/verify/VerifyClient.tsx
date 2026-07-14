"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function VerifyClient({ token }: { token?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  if (!token) {
    return (
      <p className="border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">
        Link verifikasi tidak valid. Minta link baru lewat channel verify di server Discord.
      </p>
    );
  }

  async function handleVerify() {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.error || "Verifikasi gagal, coba lagi.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Tidak bisa menghubungi server. Coba lagi nanti.");
    }
  }

  if (status === "success") {
    return (
      <p className="border border-cyan/40 bg-cyan/10 px-4 py-3 text-sm text-cyan">
        Verifikasi berhasil! Kembali ke Discord, akses kamu sudah terbuka.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={handleVerify}
        disabled={status === "loading"}
        className="border border-cyan px-6 py-3 text-xs font-bold tracking-widest text-cyan transition-colors hover:bg-cyan hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "MEMVERIFIKASI..." : "VERIFIKASI SEKARANG"}
      </button>
      {status === "error" && (
        <p className="border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-magenta">
          {message}
        </p>
      )}
    </div>
  );
}
