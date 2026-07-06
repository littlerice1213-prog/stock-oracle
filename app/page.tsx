"use client";

import Image from "next/image";
import { useState } from "react";
import SiteFooter from "./components/SiteFooter";

type CoinFace = "ingot" | "ten";
type Stage = "home" | "divination" | "ad" | "reading";

type LineResult = {
  left: CoinFace;
  right: CoinFace;
  code: 1 | 2;
  line: "陽爻" | "陰爻";
};

type HexagramInfo = {
  name: string;
  trend: string;
  action: string;
  warning: string;
  mushroom: string;
};

const hexagramMap: Record<string, HexagramInfo> = {
  "111111": {
    name: "乾為天",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "如果你的持股已經大漲一波出現此卦代表最後容易得意忘形，需防熱絡之後的回跌喔!",
  },
  "222222": {
    name: "坤為地",
    trend: "築底轉強",
    action: "分批布局",
    warning: "別急著重壓",
    mushroom:
      "如果你的持股在長期跌深後出現此卦，應該注意反轉為升的契機喔。",
  },
  "212221": {
    name: "水雷屯",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情起步漲勢雖強，但在上檔遭逢沉重賣壓，大漲時不可過於樂觀，要隨時保持獲利先跑的警覺心。",
  },
  "122212": {
    name: "山水蒙",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "因行情撲朔迷離，目前雖然仍不佳，已略有逐步做底跡象，未來漲升可期，但時間似乎尚早。\n如果已被硬往上拉，漲幅不多，需有耐心觀望。",
  },
  "212111": {
    name: "水天需",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "無論心理你是想做多還是做空，勸先以觀望為佳，貪小必失、焦躁必敗，此股唯有耐心等待。",
  },
  "111212": {
    name: "天水訟",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "此股暗示多頭與空頭之間鬥爭甚為激烈，可能會出現跟雲霄飛車一樣的走勢，如果怎樣都想買賣，那你可能要眼明手快才有機會賺錢了!",
  },
  "222212": {
    name: "地水師",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "不管做多還是做空，請謹慎按照自己的意思來做買賣，行情可能有與自己判斷相反的短暫變動，市場小道消息又比平日多，請相信自己，才有可能賺錢喔!",
  },
  "212222": {
    name: "水地比",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "可以參考別人的意見，可能比較容易得到獲利的機會喔，千萬別一意孤行哈!",
  },
  "112111": {
    name: "風天小畜",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "表面看起來都很順利，但須預防突發的利空或利多消息發生，雖然這樣的消息看似不太重要，但對日後的行情卻有扭轉的力量喔。",
  },
  "111211": {
    name: "天澤履",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "如果你的持股已大漲或下跌一段的話，千萬別再追高或是低價賣出，以免遭到不必要的損失。",
  },
  "222111": {
    name: "地天泰",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "若目前股市緩漲向上的話，這是多頭向上的行情呀，中長期持有獲利較高。\n如果已大幅度急漲的話，恐好景不長，應該居高思危喔!",
  },
  "111222": {
    name: "天地否",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "為長期整理向下的空頭行情啊!!!持有股票宜早了結觀望，要不然只好耐心等待否極泰來了!!",
  },
  "111121": {
    name: "天火同人",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "買賣操作都可以喔!獲利勝算都很大，恭喜!\n建議與人合夥操作會更加順利，但如果對股友施詐的話，反而會遭到失敗喔!",
  },
  "121111": {
    name: "火天大有",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "強勢多頭市場啊!!!\n但強勢之餘亦須慎防漲多拉回喔!",
  },
  "222122": {
    name: "地山謙",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "目前可能行情低迷不振，但因股價已低或因具有上漲的本質，下跌整理後，後市仍有漲升向上的潛力將會越大，但現在買進還是嫌早，宜耐心稍作觀望喔~",
  },
  "221222": {
    name: "雷地豫",
    trend: "築底轉強",
    action: "分批布局",
    warning: "別急著重壓",
    mushroom:
      "低迷行情已見轉機啦~此後行情否極泰來了，買進做多將會比較有利喔。行情剛反轉確認起漲，適合買進之後長期持有為佳",
  },
  "211221": {
    name: "澤雷隨",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "應該接受別人的意見喔!\n宜買進剛剛突破漲升的強勢股票，至於價低位漲或是尚在盤整的股票，因為缺法主力助益，仍以觀望為佳。",
  },
  "122112": {
    name: "山風蠱",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "行情看似不錯或尚在繼續上漲，但實際上已潛伏著危機，不論是否已經下跌，還是36計先跑再說了喔!!!!!快逃啊~",
  },
  "222211": {
    name: "地澤臨",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "細水長流的長期多頭市場走勢，行情可望有較長期的盤堅，做多耐心投資獲利較佳。",
  },
  "112222": {
    name: "風地觀",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "行情將會不安，不論行情震盪與否，日後趨勢將會向下，此時宜將手上持股了結改採觀望，或選股融券作空是不錯的選擇。",
  },
  "121221": {
    name: "火雷噬嗑",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "空頭市場已經即將形成，近期內的行情恐怕不容易再有太好的上漲表現。",
  },
  "122121": {
    name: "山火賁",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "應該趁高了結觀望了喔，別貪心哈~千萬別為目前漲升的榮景，或為市場利多消息所迷惑喔!",
  },
  "122222": {
    name: "山地剝",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "行情已經隱藏下跌的危機，只要稍有利空極可能用力往下扯，跌停鎖死賣不掉都有可能，應該早點作準備改為觀望為佳。",
  },
  "222221": {
    name: "地雷復",
    trend: "築底轉強",
    action: "分批布局",
    warning: "別急著重壓",
    mushroom:
      "行情看起來已經逐漸脫離跌勢或是盤整了，是買進的好良機，但因為才剛反轉，暫時還不能期望有大幅的漲升或是一飛衝天的衝勁，需要點時間慢慢往上爬喔!",
  },
  "111221": {
    name: "天雷无妄",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "為有心人介入操作的股票雖然好，但缺乏好的基本面或是價位已經漲得離譜的股票，勉強操作則不容易賺錢，應該以具有投資價值的績優股為佳。",
  },
  "122111": {
    name: "山天大畜",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "雖然主力積極作多，但賣壓太重，一時想把行情大幅拉升恐不太容易捏。若行情能夠盤整一段時間，把籌碼洗乾淨一點，後市可往看漲。\n如果故價未盤整就漲，上面恐將反壓過重，宜趁高先了結入袋為安。",
  },
  "122221": {
    name: "山雷頤",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "對於目前的行情不論是做多還是做空，都以暫時觀望為佳，對於有心故意釋出的消息更是不可深信，以免為之所誤。",
  },
  "211112": {
    name: "澤風大過",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "買賣股票都要謹慎量力而為，以免遭到太大的損失喔!",
  },
  "212212": {
    name: "坎為水",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "空頭行情，不論下跌以多或是尚未下跌，都醞釀危機，持股應該賣出並作觀望。",
  },
  "121121": {
    name: "離為火",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "不論做多或是做空，都應該跟著主力走，不需要考慮基本面，只要趁勢而為，就能獲利。",
  },  "211122": {
    name: "澤山咸",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情容易受到消息面或市場情緒影響，操作上不宜太過固執，觀察市場反應再決定進退會比較有利。",
  },
  "221112": {
    name: "雷風恆",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情若能維持穩定趨勢，適合順勢操作，不宜因短線波動而頻繁改變原本的策略。",
  },
  "111122": {
    name: "天山遯",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "行情不利時，退一步並不是失敗，保留資金等待下一次更好的機會，反而比較有利。",
  },
  "221111": {
    name: "雷天大壯",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情強勢向上，但越強勢越容易讓人失去警覺，已有獲利時要記得適度保護成果。",
  },
  "121222": {
    name: "火地晉",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情逐漸轉強，有向上發展的機會，若趨勢持續確認，可順勢操作，但仍不宜過度追高。",
  },
  "222121": {
    name: "地火明夷",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "目前市場環境可能不利於表現，先保護自己、降低曝險，等待情勢明朗會比較適合。",
  },
  "112121": {
    name: "風火家人",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情若能維持原有秩序與節奏，走勢有機會穩定發展，操作上按照自己的計畫進行即可。",
  },
  "121211": {
    name: "火澤睽",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "市場多空看法分歧，行情容易反覆，操作上不要過度相信單一方向，應該提高警覺。",
  },
  "212122": {
    name: "水山蹇",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "目前前進阻力較大，勉強操作可能事倍功半，先等待障礙減少或趨勢明朗再行動。",
  },
  "221212": {
    name: "雷水解",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "原本的壓力有逐漸解除的機會，但行情是否真正轉強仍需觀察，不宜因一時反彈就過度樂觀。",
  },
  "122211": {
    name: "山澤損",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "適度減少部位或降低期待，反而有助於保護成果。現在不是什麼都要抓住的時候。",
  },
  "112221": {
    name: "風雷益",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情若有資金與趨勢配合，可能出現較好的機會，但仍應按照計畫操作，不要因為樂觀而失去紀律。",
  },
  "211111": {
    name: "澤天夬",
    trend: "築底轉強",
    action: "分批布局",
    warning: "別急著重壓",
    mushroom:
      "行情可能來到需要做出決定的時刻，若趨勢已經確認，應果斷依照計畫執行，不宜反覆猶豫。",
  },
  "111112": {
    name: "天風姤",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "突如其來的行情或消息容易讓人心動，但越是突然出現的機會，越要先觀察清楚再決定。",
  },
  "211222": {
    name: "澤地萃",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "市場人氣與資金有聚集的現象，但人多的地方也容易過熱，操作時仍要留意風險。",
  },
  "222112": {
    name: "地風升",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情有逐步向上的機會，適合耐心觀察與分段操作，不需要急著期待短時間內大幅上漲。",
  },
  "211212": {
    name: "澤水困",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "目前行情可能受到壓抑，操作空間有限，與其勉強出手，不如保留實力等待轉機。",
  },
  "212112": {
    name: "水風井",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "與其追逐短線熱門，不如回頭檢視標的本身的價值與基本條件，真正有價值的東西才經得起時間。",
  },
  "211121": {
    name: "澤火革",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情可能正在發生重要轉變，原本有效的策略未必繼續適用，需要觀察趨勢是否真的改變。",
  },
  "121112": {
    name: "火風鼎",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情有重新整理與轉變的機會，若基本條件改善，後續可能出現新的發展，但仍需時間確認。",
  },
  "221221": {
    name: "震為雷",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "突發消息可能造成行情劇烈波動，第一時間不要因驚慌做出決定，先觀察市場真正的方向。",
  },
  "122122": {
    name: "艮為山",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "該停的時候就要停，目前不適合勉強操作。等待比亂動更重要。",
  },
  "112122": {
    name: "風山漸",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "行情若是慢慢走強，反而比較有機會走得長久。不要因為漲得不夠快就失去耐心。",
  },
  "221211": {
    name: "雷澤歸妹",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "目前的機會可能看起來很吸引人，但條件未必成熟，不要因一時衝動做出決定。",
  },
  "221121": {
    name: "雷火豐",
    trend: "偏多",
    action: "續抱留意",
    warning: "漲多別追",
    mushroom:
      "行情可能來到熱絡甚至繁盛的階段，但越熱鬧越要記得盛極可能轉衰，已有獲利要懂得保護。",
  },
  "121122": {
    name: "火山旅",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "目前行情缺乏長期穩定感，適合保持彈性，不宜把所有資金或期待都押在同一個方向。",
  },
  "112112": {
    name: "巽為風",
    trend: "偏空",
    action: "保守應對",
    warning: "控制風險",
    mushroom:
      "行情可能反覆受到消息與市場氣氛影響，方向不夠明確時，應降低部位並保持彈性。",
  },
  "211211": {
    name: "兌為澤",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "市場氣氛可能偏向樂觀，但不要只因大家都在談論就跟著追進去，仍要確認自己的操作依據。",
  },
  "112212": {
    name: "風水渙",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "原本集中的力量可能正在分散，行情容易失去方向，操作上應保持彈性並留意資金動向。",
  },
  "212211": {
    name: "水澤節",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "設定好自己的停利、停損與資金限制，遵守紀律會比猜測行情更重要。",
  },
  "112211": {
    name: "風澤中孚",
    trend: "築底轉強",
    action: "分批布局",
    warning: "別急著重壓",
    mushroom:
      "市場資訊很多，但最後仍要回到可以驗證的事實與自己的判斷。真正可靠的趨勢需要時間證明。",
  },
  "221122": {
    name: "雷山小過",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "目前適合小幅度、謹慎操作，不宜做過大的押注。小心前進反而比較安全。",
  },
  "212121": {
    name: "水火既濟",
    trend: "震盪",
    action: "依計畫操作",
    warning: "避免情緒交易",
    mushroom:
      "事情看起來已經完成或行情已經成熟時，反而最容易放鬆警覺。已有成果更要注意後續變化。",
  },
  "121212": {
    name: "火水未濟",
    trend: "觀望整理",
    action: "等待時機",
    warning: "別急著出手",
    mushroom:
      "行情尚未真正完成轉變，現在仍需要耐心。越接近成功的時候，越不要因急躁而破壞原本的計畫。",
  },
};

function randomCoinFace(): CoinFace {
  const randomNumber = new Uint32Array(1);
  crypto.getRandomValues(randomNumber);

  return randomNumber[0] % 2 === 0 ? "ingot" : "ten";
}

function createLineResult(
  left: CoinFace,
  right: CoinFace
): LineResult {
  const isSame = left === right;

  return {
    left,
    right,
    code: isSame ? 1 : 2,
    line: isSame ? "陽爻" : "陰爻",
  };
}

function coinSrc(face: CoinFace) {
  return face === "ingot"
    ? "/coin-ingot.png"
    : "/coin-10.png";
}

function CoinOracle({
  result,
  isTossing,
}: {
  result: LineResult | null;
  isTossing: boolean;
}) {
  const leftFace = result?.left ?? "ingot";
  const rightFace = result?.right ?? "ingot";

  return (
    <div className="mb-8 flex min-h-[250px] items-center justify-center gap-3 sm:gap-8">
      <div
        className={
          isTossing
            ? "coin-toss coin-left"
            : "coin-land-left"
        }
      >
        <Image
          src={coinSrc(leftFace)}
          alt="左側銅板"
          width={240}
          height={240}
          priority
          className="h-auto w-36 drop-shadow-[0_0_25px_rgba(234,179,8,0.35)] sm:w-52"
        />
      </div>

      <div
        className={
          isTossing
            ? "coin-toss coin-right"
            : "coin-land-right"
        }
      >
        <Image
          src={coinSrc(rightFace)}
          alt="右側銅板"
          width={240}
          height={240}
          priority
          className="h-auto w-36 drop-shadow-[0_0_25px_rgba(234,179,8,0.35)] sm:w-52"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [stage, setStage] = useState<Stage>("home");
  const [lines, setLines] = useState<LineResult[]>([]);
  const [lastResult, setLastResult] =
    useState<LineResult | null>(null);
  const [isTossing, setIsTossing] = useState(false);

  const currentLine = lines.length + 1;

  // 起卦順序：第 1 爻 → 第 6 爻
  // Excel 代碼順序：第 6 爻 → 第 1 爻
  // 所以查表前一定要 reverse
  const code = [...lines]
    .reverse()
    .map((item) => item.code)
    .join("");

  const hexagram = hexagramMap[code];

  const tossCoins = () => {
    if (isTossing || lines.length >= 6) return;

    setIsTossing(true);

    setTimeout(() => {
      const left = randomCoinFace();
      const right = randomCoinFace();
      const result = createLineResult(left, right);

      setLastResult(result);
      setLines((previousLines) => [
        ...previousLines,
        result,
      ]);
      setIsTossing(false);
    }, 1400);
  };

  const resetDivination = () => {
    setLines([]);
    setLastResult(null);
    setIsTossing(false);
    setStage("divination");
  };

  const askToRestart = () => {
    const confirmed = confirm(
      "一事不二問，相同一檔股票不要重複占問。\n\n若是問其他股票標的，請按確認鍵再重新起卦。"
    );

    if (confirmed) {
      resetDivination();
    }
  };

  if (stage === "home") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <p className="mb-4 tracking-[0.4em] text-yellow-500">
          STOCK ORACLE
        </p>

        <h1 className="mb-6 text-5xl font-bold text-yellow-300">
          股市六爻神諭
        </h1>

        <p className="mb-10 max-w-md text-lg leading-8 text-zinc-300">
          請專心想著想占問的股票標的，
          <br />
          準備好後，按下擲幣按鍵 6 次完成起卦。
        </p>

        <button
          onClick={() => setStage("divination")}
          className="rounded-full bg-yellow-500 px-10 py-4 font-bold text-black transition hover:bg-yellow-400"
        >
          開始占問
                </button>

        <SiteFooter />
      </main>
    );
  }

  if (stage === "ad") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
        <p className="mb-4 tracking-[0.4em] text-yellow-500">
          STOCK ORACLE
        </p>

        <h1 className="mb-8 text-3xl font-bold text-yellow-300">
          神諭解析準備中…
        </h1>

        <div className="mb-8 flex min-h-[280px] w-full max-w-xl items-center justify-center rounded-3xl border border-dashed border-zinc-600 bg-zinc-950 px-6">
          <div>
            <p className="mb-3 text-lg text-zinc-300">
              廣告預留區
            </p>
            <p className="text-sm leading-7 text-zinc-600">
              未來可在此放置廣告內容
            </p>
          </div>
        </div>

        <button
          onClick={() => setStage("reading")}
          className="rounded-full bg-yellow-500 px-10 py-4 font-bold text-black transition hover:bg-yellow-400"
        >
          查看神諭解析
                </button>

        <SiteFooter />
      </main>
    );
  }

  if (stage === "reading") {
    return (
      <main className="flex min-h-screen flex-col items-center bg-black px-6 py-14 text-white">
        <div className="w-full max-w-xl">
          <p className="mb-4 text-center tracking-[0.4em] text-yellow-500">
            STOCK ORACLE
          </p>

          <h1 className="mb-3 text-center text-2xl font-bold text-zinc-300">
            股市六爻神諭
          </h1>

          <p className="mb-10 text-center text-5xl font-bold text-yellow-300">
            {hexagram?.name}
          </p>

          {hexagram && (
            <div className="rounded-3xl border border-yellow-500 bg-zinc-950 px-6 py-8 sm:px-8">
              <div className="space-y-6 text-lg text-zinc-200">
                <p>
                  <span className="font-bold text-yellow-300">
                    趨勢：
                  </span>
                  {hexagram.trend}
                </p>

                <p>
                  <span className="font-bold text-yellow-300">
                    操作：
                  </span>
                  {hexagram.action}
                </p>

                <p>
                  <span className="font-bold text-yellow-300">
                    注意事項：
                  </span>
                  {hexagram.warning}
                </p>

                <div className="border-t border-yellow-500/30 pt-6">
                  <p className="mb-3 font-bold text-yellow-300">
                    🍄 鮮菇說：
                  </p>

                  <p className="whitespace-pre-line leading-9 text-zinc-200">
                    {hexagram.mushroom}
                  </p>
                </div>
              </div>

              <p className="mt-8 border-t border-zinc-800 pt-6 text-xs leading-6 text-zinc-500">
                本內容為易經卦象與股市情境之趣味參考，不構成投資建議。
              </p>
            </div>
          )}

          <button
            onClick={askToRestart}
            className="mx-auto mt-8 block rounded-full border border-yellow-500 px-8 py-3 text-yellow-300 transition hover:bg-yellow-500 hover:text-black"
          >
            重新起卦
                    </button>
        </div>

        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-black px-6 py-14 text-center text-white">
      <p className="mb-5 tracking-[0.4em] text-yellow-500">
        STOCK ORACLE
      </p>

      <h1 className="mb-4 text-4xl font-bold text-yellow-300">
        股市六爻神諭
      </h1>

      {lines.length < 6 ? (
        <p className="mb-4 text-xl text-zinc-300">
          目前正在擲：第 {currentLine} 爻
        </p>
      ) : (
        <p className="mb-4 text-xl text-yellow-300">
          六爻已完成
        </p>
      )}

      <CoinOracle
        result={lastResult}
        isTossing={isTossing}
      />

      {isTossing && (
        <p className="mb-8 animate-pulse text-xl text-yellow-300">
          銅板翻轉中……
        </p>
      )}

      {lines.length < 6 && (
        <button
          onClick={tossCoins}
          disabled={isTossing}
          className="mb-10 rounded-full bg-yellow-500 px-12 py-5 text-xl font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isTossing
            ? "擲幣中……"
            : `擲第 ${currentLine} 爻`}
        </button>
      )}

      {lines.length < 6 ? (
  <div className="w-full max-w-md space-y-4">
    {[5, 4, 3, 2, 1, 0].map((index) => {
      const result = lines[index];

      return (
        <div
          key={index}
          className="rounded-2xl border border-yellow-500 px-6 py-5"
        >
          <span className="text-xl text-yellow-300">
            第 {index + 1} 爻
          </span>

          <span className="ml-5 text-xl">
            {result
              ? result.line === "陽爻"
                ? "━━━━━━"
                : "━━━　━━━"
              : "尚未擲幣"}
          </span>
        </div>
      );
    })}
  </div>
) : (
  <div className="w-full max-w-md">
    <p className="mb-4 text-lg text-zinc-400">
      你得到的是
    </p>

    <p className="mb-6 text-4xl font-bold text-yellow-300">
      {hexagram?.name ?? "卦名資料尚未建立"}
    </p>

    <div className="mx-auto mb-8 flex w-full max-w-[220px] flex-col gap-3">
      {[5, 4, 3, 2, 1, 0].map((index) => {
        const result = lines[index];

        return (
          <div
            key={index}
            className="text-3xl leading-none text-yellow-100"
          >
            {result?.line === "陽爻"
              ? "━━━━━━"
              : "━━━　━━━"}
          </div>
        );
      })}
    </div>

    <button
      onClick={() => setStage("ad")}
      className="rounded-full bg-yellow-500 px-10 py-4 font-bold text-black transition hover:bg-yellow-400"
    >
      ✨ 觀看股市解卦神諭
    </button>
  </div>
)}

      <style jsx global>{`
        .coin-toss {
          animation: toss 1.4s
            cubic-bezier(0.2, 0.8, 0.3, 1);
        }

        .coin-left {
          animation-delay: 0s;
        }

        .coin-right {
          animation-delay: 0.08s;
        }

        .coin-land-left {
          transform: rotate(-10deg);
        }

        .coin-land-right {
          transform: rotate(12deg);
        }

        @keyframes toss {
          0% {
            transform: translateY(0) rotateX(0deg)
              rotateZ(0deg) scale(1);
          }

          20% {
            transform: translateY(-80px) rotateX(360deg)
              rotateZ(-25deg) scale(0.92);
          }

          45% {
            transform: translateY(-145px) rotateX(900deg)
              rotateZ(18deg) scale(0.82);
          }

          70% {
            transform: translateY(-55px) rotateX(1440deg)
              rotateZ(-12deg) scale(0.95);
          }

          88% {
            transform: translateY(10px) rotateX(1740deg)
              rotateZ(8deg) scale(1.04);
          }

          100% {
            transform: translateY(0) rotateX(1800deg)
              rotateZ(0deg) scale(1);
          }
        }
           `}</style>

      <SiteFooter />
    </main>
  );
}