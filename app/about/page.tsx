import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export default function AboutPage() {
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
          ABOUT
        </p>

        <h1 className="mb-10 text-4xl font-bold text-yellow-300">
          關於股市六爻神諭
        </h1>

        <div className="space-y-8 leading-8 text-zinc-300">
          <p>
            「股市六爻神諭」是一個以《易經》六十四卦為文化基礎，
            結合股市情境與數位互動體驗所創作的線上占問平台。
          </p>

          <p>
            使用者在心中專注想著想占問的股票標的後，
            透過六次擲幣完成六爻起卦，
            再依所得卦象觀看對應的股市神諭解析。
          </p>

          <div className="rounded-3xl border border-yellow-500/30 bg-zinc-950 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-300">
              創作理念
            </h2>

            <p>
              市場充滿資訊、情緒與不確定性。
              「股市六爻神諭」並不是要取代投資研究，
              而是希望透過易經文化與占問儀式，
              提供一個重新整理思緒、觀察自身判斷與思考市場的有趣方式。
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-500/30 bg-zinc-950 p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-bold text-yellow-300">
              🍄 關於鮮菇老師
            </h2>

            <p>
              鮮菇老師長期研習易經與占卜，
              並將卦理轉化為貼近現代生活的語言。
              本站的股市情境解析與「鮮菇說」，
              以易經卦理結合股市情境進行內容創作，
              希望讓古老的易經智慧能以更直覺、
              更有趣的方式被理解與體驗。
            </p>
          </div>

          <p className="text-sm leading-7 text-zinc-500">
            本站所呈現的原創文字內容、網站編排及具原創性的視覺素材，
            其相關權利依法受到保護。未經授權，
            請勿擅自重製、轉載或作商業使用。
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}