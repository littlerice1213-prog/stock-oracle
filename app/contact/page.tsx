import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black px-6 py-14 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 tracking-[0.4em] text-yellow-500">
          CONTACT
        </p>

        <h1 className="mb-16 text-5xl font-bold text-yellow-300">
          聯絡我們
        </h1>

        <section className="rounded-[2rem] border border-yellow-500/40 bg-zinc-950/70 px-8 py-16 text-center">
          <div className="mb-8 text-5xl">🍄</div>

          <h2 className="mb-8 text-3xl font-bold text-yellow-300">
            心易占卜
          </h2>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-zinc-200">
            如有網站相關問題、使用建議、合作、隱私權政策
            <br />
            或其他聯絡需求，歡迎透過 LINE 與我們聯繫。
          </p>

          <div className="mt-10">
            <p className="text-zinc-500">LINE ID 請搜尋</p>

            <p className="mt-2 text-3xl font-bold text-yellow-300">
              @722iklfi
            </p>

            <p className="mt-3 text-zinc-300">
              心易占卜
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-zinc-400">
            本站不提供個別股票買賣建議、投資諮詢或資產配置服務。
            <br />
            若涉及投資決策，請自行評估風險或諮詢合格專業人士。
          </p>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}