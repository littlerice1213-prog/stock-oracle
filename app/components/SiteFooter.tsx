import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-auto w-full border-t border-yellow-500/20 bg-black px-6 py-8 text-center">
      <p className="mb-4 text-sm text-zinc-500">
        © 2026 股市六爻神諭．All Rights Reserved.
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-zinc-400">
        <Link
          href="/about"
          className="transition hover:text-yellow-300"
        >
          關於本站
        </Link>

        <span className="text-zinc-700">｜</span>

        <Link
          href="/privacy"
          className="transition hover:text-yellow-300"
        >
          隱私權政策
        </Link>

        <span className="text-zinc-700">｜</span>

        <Link
          href="/contact"
          className="transition hover:text-yellow-300"
        >
          聯絡我們
        </Link>

        <span className="text-zinc-700">｜</span>

        <Link
          href="/disclaimer"
          className="transition hover:text-yellow-300"
        >
          免責聲明
        </Link>
      </nav>
    </footer>
  );
}