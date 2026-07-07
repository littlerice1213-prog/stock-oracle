import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export default function DisclaimerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-yellow-500 transition hover:text-yellow-300"
        >
          ← 返回股市六爻神諭
        </Link>

        <p className="mb-4 tracking-[0.35em] text-yellow-500">
          DISCLAIMER
        </p>

        <h1 className="mb-10 text-4xl font-bold text-yellow-300">
          免責聲明
        </h1>

        <div className="space-y-8 leading-8 text-zinc-300">
          <div className="rounded-3xl border border-yellow-500/40 bg-zinc-950 p-6 sm:p-8">
            <p className="text-lg leading-9">
              本平台／本內容所提供的所有資訊、數據及觀點，
              僅供娛樂與文化體驗參考，不構成投資建議。
              使用者在進行任何直接、間接或相關的投資行為前，
              應自行審慎評估市場風險，
              並針對個人的財務狀況與投資目標做出獨立判斷。
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              投資風險
            </h2>

            <p>
              股票及其他金融商品均具有價格波動與本金損失風險。
              本站不保證任何占問結果、卦象解析、
              文字內容或觀點的正確性、完整性或獲利結果。
            </p>
          </section>

          <section>
            <h2 className="mt-10 text-2xl font-bold text-yellow-300">
  非專業投資顧問聲明
</h2>

<p className="mt-4 text-zinc-200 leading-8">
  本站並非證券投資顧問、財務顧問或任何金融服務機構，亦未提供個別化投資建議、買賣指示或資產配置建議。使用者如有投資需求，應諮詢合格專業人士。
</p>

<h2 className="mt-10 text-2xl font-bold text-yellow-300">
  內容限制
</h2>

<p className="mt-4 text-zinc-200 leading-8">
  本站內容可能因資料整理、文字解讀或系統顯示而產生誤差，所有卦象結果與文字解析僅供參考，本站不保證內容即時性、正確性、完整性或適用性。
</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              文化與娛樂體驗
            </h2>

            <p>
              「股市六爻神諭」以易經文化、
              六爻卦象與數位互動方式提供娛樂及文化體驗。
              占問結果不應取代專業的財務、
              投資、法律或其他專業意見。
            </p>
          </section>

          <p className="border-t border-zinc-800 pt-6 text-sm text-zinc-500">
            使用本站即表示您已閱讀、理解並同意本免責聲明之內容。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}