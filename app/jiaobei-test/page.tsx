"use client";

import Image from "next/image";
import { useState } from "react";

type CoinFace = "ingot" | "ten";

type TossResult = {
  left: CoinFace;
  right: CoinFace;
  line: "陽爻" | "陰爻";
  code: 1 | 2;
};

const coinSrc = (face: CoinFace) => {
  return face === "ingot" ? "/coin-ingot.png" : "/coin-10.png";
};

function judgeLine(left: CoinFace, right: CoinFace): TossResult {
  const isSame = left === right;

  return {
    left,
    right,
    line: isSame ? "陽爻" : "陰爻",
    code: isSame ? 1 : 2,
  };
}

export default function JiaobeiTestPage() {
  const [isTossing, setIsTossing] = useState(false);

  const [result, setResult] = useState<TossResult>(
    judgeLine("ingot", "ingot")
  );

  const tossCoins = () => {
    if (isTossing) return;

    setIsTossing(true);

    setTimeout(() => {
      // 左右兩枚銅板各自獨立隨機翻面
      const left: CoinFace =
        Math.random() < 0.5 ? "ingot" : "ten";

      const right: CoinFace =
        Math.random() < 0.5 ? "ingot" : "ten";

      // 同面＝陽爻 1
      // 異面＝陰爻 2
      setResult(judgeLine(left, right));

      setIsTossing(false);
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

        <p className="mb-4 tracking-[0.4em] text-yellow-500">
          COIN ORACLE TEST
        </p>

        <h1 className="mb-12 text-4xl font-bold text-yellow-300 sm:text-5xl">
          金元寶銅板測試
        </h1>

        <div className="relative mb-10 flex min-h-[300px] items-center justify-center gap-4 sm:gap-10">

          <div
            className={
              isTossing
                ? "coin-toss coin-left"
                : "coin-land-left"
            }
          >
            <Image
              src={coinSrc(result.left)}
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
              src={coinSrc(result.right)}
              alt="右側銅板"
              width={240}
              height={240}
              priority
              className="h-auto w-36 drop-shadow-[0_0_25px_rgba(234,179,8,0.35)] sm:w-52"
            />
          </div>

        </div>

        {!isTossing && (
          <div className="mb-10">

            <p className="text-4xl font-bold text-yellow-300">
              {result.line}
            </p>

            <div className="mt-6 text-3xl text-white">
              {result.line === "陽爻"
                ? "━━━━━━"
                : "━━━　━━━"}
            </div>

          </div>
        )}

        {isTossing && (
          <p className="mb-10 animate-pulse text-xl text-yellow-300">
            銅板翻轉中……
          </p>
        )}

        <button
          onClick={tossCoins}
          disabled={isTossing}
          className="rounded-full bg-yellow-500 px-12 py-5 text-xl font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isTossing ? "擲幣中……" : "擲兩枚銅板"}
        </button>

      </div>

      <style jsx>{`
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
            transform:
              translateY(0)
              rotateX(0deg)
              rotateZ(0deg)
              scale(1);
          }

          20% {
            transform:
              translateY(-80px)
              rotateX(360deg)
              rotateZ(-25deg)
              scale(0.92);
          }

          45% {
            transform:
              translateY(-145px)
              rotateX(900deg)
              rotateZ(18deg)
              scale(0.82);
          }

          70% {
            transform:
              translateY(-55px)
              rotateX(1440deg)
              rotateZ(-12deg)
              scale(0.95);
          }

          88% {
            transform:
              translateY(10px)
              rotateX(1740deg)
              rotateZ(8deg)
              scale(1.04);
          }

          100% {
            transform:
              translateY(0)
              rotateX(1800deg)
              rotateZ(0deg)
              scale(1);
          }
        }
      `}</style>

    </main>
  );
}