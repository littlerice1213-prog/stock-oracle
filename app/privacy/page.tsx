import Link from "next/link";
import SiteFooter from "../components/SiteFooter";

export default function PrivacyPage() {
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
          PRIVACY POLICY
        </p>

        <h1 className="mb-10 text-4xl font-bold text-yellow-300">
          隱私權政策
        </h1>

        <div className="space-y-8 leading-8 text-zinc-300">
          <p>
            「股市六爻神諭」重視使用者的隱私。
            本隱私權政策說明您使用本站時，
            可能涉及的資訊收集與使用方式。
          </p>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              一、本站可能收集的資訊
            </h2>

            <p>
              本站目前不要求使用者註冊帳號，
              也不要求使用者輸入所占問的股票名稱或個人財務資訊。
            </p>

            <p className="mt-3">
              為維持網站運作、分析流量及改善使用體驗，
              網站服務或第三方服務可能自動取得部分技術資訊，
              例如瀏覽器類型、裝置類型、IP 位址、
              瀏覽時間與網站互動資訊。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              二、Cookie
            </h2>

            <p>
              本站及第三方服務可能使用 Cookie
              或類似技術，以維持網站功能、
              分析網站使用情形及提供相關廣告內容。
              使用者可透過瀏覽器設定管理或停用 Cookie，
              但部分網站功能可能因此受到影響。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              三、Google AdSense 與第三方廣告
            </h2>

            <p>
              本站未來可能使用 Google AdSense
              或其他第三方廣告服務。
              第三方廣告服務供應商可能使用 Cookie
              或其他技術，依據使用者造訪本站或其他網站的情形，
              提供、衡量及改善廣告內容。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              四、第三方服務
            </h2>

            <p>
              本站可能使用網站託管、流量分析、
              廣告或其他第三方服務。
              相關第三方服務對資訊的處理，
              可能另受其各自的隱私權政策規範。
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-yellow-300">
              五、政策更新
            </h2>

            <p>
              本站可能因服務內容、技術或相關規範變更，
              適時更新本隱私權政策。
              更新後的內容將公布於本頁面。
            </p>
          </section>

          <p className="border-t border-zinc-800 pt-6 text-sm text-zinc-500">
            最後更新日期：2026 年 7 月
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}