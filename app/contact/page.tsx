import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-yellow-500 transition hover:text-yellow-300"
        >
          ← 返回股市六爻神諭
        </Link>

        <p className="mb-4 tracking-[0.35em] text-yellow-500">
          CONTACT
        </p>

        <h1 className="mb-10 text-4xl font-bold text-yellow-300">
          聯絡我們
        </h1>

        <div className="rounded-3xl border border-yellow-500/30 bg-zinc-950 p-8 text-center sm:p-12">
          <div className="mb-6 text-5xl">🍄</div>

          <h2 className="mb-5 text-2xl font-bold text-yellow-300">
            心易占卜
          </h2>

          <p className="mb-3 text-zinc-300">
            如有網站相關問題、合作或其他聯絡需求，
            歡迎透過 LINE 與我們聯繫。
          </p>

          <p className="mt-8 text-sm text-zinc-500">
            LINE ID 請搜尋
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-300">
            @722iklfi
          </p>

          <p className="mt-3 text-zinc-300">
            心易占卜
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}