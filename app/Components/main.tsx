"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [noBtnPosition, setNoBtnPosition] = useState({ top: "70%", left: "50%" });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getGif = () => {
    if (yesPressed) return "/anya9.gif"; 
    if (noCount === 0) return "/anya1.gif"; 
    if (noCount === 1) return "/anya2.webp"; 
    if (noCount === 2) return "/anya10.gif"; 
    if (noCount === 3) return "/anya4.gif"; 
    if (noCount === 4) return "/anya5.gif"; 
    if (noCount === 5) return "/anya6.gif"; 
    return "/anya7.gif"; 
  };

  const getMessage = () => {
    if (yesPressed) return "Waku Waku! I love you too! ❤️";
    if (noCount === 0) return "Do you love me? 👉👈";
    if (noCount === 1) return "Wait... what? Are you serious?";
    if (noCount === 2) return "Please? I'll be really good!!";
    if (noCount === 3) return "Why are you being so mean?! 😭";
    if (noCount === 4) return "I'M GONNA TELL MAMA AND PAPA!";
    if (noCount === 5) return "My whole world is ending...";
    return "Heh. You think you can escape me?";
  };

  const moveButton = () => {
    // Stage 6 and beyond is the "Runaway" stage
    if (noCount >= 5) { 
      const padding = 100;
      // Calculate random points within the safe area of the screen
      const x = Math.random() * (windowSize.width - padding * 2) + padding;
      const y = Math.random() * (windowSize.height - padding * 2) + padding;
      setNoBtnPosition({ top: `${y}px`, left: `${x}px` });
    }
    setNoCount(noCount + 1);
  };

  const yesButtonSize = noCount * 15 + 16;

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-lavender-200 p-4 overflow-hidden">
      {yesPressed && <Confetti width={windowSize.width} height={windowSize.height} gravity={0.3} />}

      <div className="flex flex-col items-center max-w-sm w-full z-10 pointer-events-none">
        <div className="relative mb-8 animate-float">
          <img
            src={getGif()}
            alt="Anya Reaction"
            className="h-56 w-56 object-cover rounded-3xl shadow-lg border-8 border-white pointer-events-auto"
          />
          <div className="absolute -bottom-4 -right-4 bg-purple-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-md">
             Anya Forger
          </div>
        </div>

        <h1 className="text-2xl font-black text-purple-700 mb-8 min-h-[3rem] leading-tight text-center">
          {getMessage()}
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-xs">
        {/* YES BUTTON */}
        <button
          className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white font-black rounded-2xl shadow-[0_5px_0_rgb(168,85,247)] transition-all active:translate-y-1 active:shadow-none z-20 px-10 py-3"
          style={{ fontSize: yesPressed ? "2rem" : `${yesButtonSize}px` }}
          onClick={() => setYesPressed(true)}
        >
          YES!
        </button>

        {/* NO BUTTON */}
        <button
          style={noCount >= 6 ? {
            position: 'fixed',
            top: noBtnPosition.top,
            left: noBtnPosition.left,
            transition: 'all 0.15s ease-out',
            transform: 'translate(-50%, -50%)',
          } : {}}
          onMouseEnter={moveButton}
          onClick={moveButton}
          className={`px-6 py-2 bg-purple-200 text-purple-700 font-bold rounded-xl border-2 border-purple-300 transition-colors
            ${noCount >= 6 ? 'z-[100] shadow-2xl opacity-100' : 'z-10 mt-4'}`}
        >
          {noCount < 6 ? "No" : "Try Again! 😝"}
        </button>
      </div>

      {/* Decorative background hearts */}
      <div className="fixed top-10 right-10 text-pink-300 text-6xl opacity-20 pointer-events-none">♥</div>
      <div className="fixed bottom-10 left-10 text-purple-300 text-6xl opacity-20 pointer-events-none">♥</div>
    </main>
  );
}