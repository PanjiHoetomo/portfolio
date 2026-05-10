"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Resume from "./Resume";
import Github from "./Github";
import Socials from "./Socials";
import SideProjects from "./Sideprojects";
import Transition from "./Transition";

const TRACKS = [
  "/audio/reloadost-1.mp3",
  "/audio/reloadost-2.mp3",
  "/audio/reloadost-3.mp3",
  "/audio/reloadost-4.mp3",
];
const menuItems = [
  { label: "ABOUT",         screen: "about",     fontSize: 96, offsetX: 0,  offsetY: 0,  skewX: -6,  skewY: 10,  float: 3  },
  { label: "RESUME",        screen: "resume",    fontSize: 72, offsetX: 20, offsetY: 8,  skewX: -11, skewY: -10, float: 4  },
  { label: "GITHUB LINK",   screen: "github",    fontSize: 74, offsetX: 8,  offsetY: 6,  skewX: 0,   skewY: -4,  float: 3  },
  { label: "SOCIALS",       screen: "socials",   fontSize: 80, offsetX: 16, offsetY: 8,  skewX: -3,  skewY: 5,   float: 4  },
  { label: "SIDE PROJECTS", screen: "sideproj",  fontSize: 60, offsetX: 10, offsetY: 6,  skewX: -4,  skewY: 7,   float: 5  },
];

type Variant = "panel" | "resume" | "stripes" | "default";

const VARIANT_MAP: Record<string, Variant> = {
  about:    "default",
  menu:     "panel",
  resume:   "default",
  github:   "default",
  socials:  "default",
  sideproj: "default",
};

const triClip = (w: number, h: number) =>
  `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

export default function Menu() {

  const [started, setStarted]             = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [showMenu, setShowMenu]           = useState(false);
  const [active, setActive]               = useState(0);
  const [animKey, setAnimKey]             = useState(0);
  const [currentScreen, setCurrentScreen] = useState("menu");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Use a ref for variant so it's always current when Transition mounts
  const variantRef = useRef<Variant>("panel");
  const [transitionVariant, setTransitionVariant] = useState<Variant>("panel");

  const [randomTrack, setRandomTrack] = useState(TRACKS[0]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const track = TRACKS[Math.floor(Math.random() * TRACKS.length)];
    setRandomTrack(track);
    // Must reload the element so it picks up the new src
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  const activate = (idx: number) => {
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  /* ---------------- START ---------------- */

  const handleStart = async () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      try { await audioRef.current.play(); } catch {}
    }
  };

  /* ---------------- MENU DELAY ---------------- */

  useEffect(() => {
    if (!started) return;
    if (currentScreen === "menu") {
      setShowMenu(false);
      const timer = setTimeout(() => setShowMenu(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen, started]);

  /* ---------------- SFX ---------------- */

  const playNavigationSfx = () => {
    const sfx = new Audio("/sfx/deck_ui_navigation.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  const playSelectSfx = () => {
    const sfx = new Audio("/sfx/selectSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  /* ---------------- TRANSITION ---------------- */

  const transitionTo = (screen: string, skipSelectSfx = false) => {
    if (isTransitioning) return;

    if (!skipSelectSfx) playSelectSfx();

    // Set the variant on the ref AND state synchronously before mounting
    const variant = VARIANT_MAP[screen] ?? "default";
    variantRef.current = variant;
    setTransitionVariant(variant);

    // Small rAF delay ensures the state has flushed before Transition mounts
    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });

    const swapDelay = screen === "menu" ? 580 : 220;
    setTimeout(() => {
      if (screen === "menu") {
        setIntroFinished(false);
        setShowMenu(false);
        setActive(0);
      }
      setCurrentScreen(screen);
    }, swapDelay);

    const panelHoldExtra = screen === "menu" ? 1500 : 0;
    const unmountDelay = screen === "menu" ? 1200 + panelHoldExtra : 650;
    setTimeout(() => setIsTransitioning(false), unmountDelay);
  };

  /* ---------------- KEYBOARD ---------------- */

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape" && currentScreen !== "menu") {
        const sfx = new Audio("/sfx/closeSfx.wav");
        sfx.volume = 0.85;
        sfx.play().catch(() => {});
        transitionTo("menu", true);
        return;
      }

      if (currentScreen === "menu") {
        if (e.key === "ArrowDown") {
          playNavigationSfx();
          activate(Math.min(menuItems.length - 1, active + 1));
        }
        if (e.key === "ArrowUp") {
          playNavigationSfx();
          activate(Math.max(0, active - 1));
        }
        if (e.key === "Enter") {
          transitionTo(menuItems[active].screen);
        }
      }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentScreen, isTransitioning, started, active]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">

      <audio ref={audioRef} loop preload="auto">
        <source src={randomTrack} type="audio/mpeg" />
      </audio>

      {/* ── SPLASH ── */}
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleStart}
            className="absolute inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none"
            style={{ background: "#000" }}
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontFamily: "Persona", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "#67e8f9", letterSpacing: "0.2em" }}
            >
              PRESS START
            </motion.div>
            <div style={{ marginTop: 16, fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
              CLICK OR TAP ANYWHERE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>

          {/* INTRO VIDEO */}
          {currentScreen === "menu" && !introFinished && (
            <video autoPlay muted playsInline onEnded={() => setIntroFinished(true)} className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/menu-intro.mp4" type="video/mp4" />
            </video>
          )}

          {/* LOOP VIDEO */}
          {currentScreen === "menu" && introFinished && (
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/videos/menu.mp4" type="video/mp4" />
            </video>
          )}

          {/* ── MENU ── */}
          {showMenu && currentScreen === "menu" && (
            <>
              <style>{`
                @keyframes p3-shadow-pop {
                  0%   { transform: translateY(-50%) translateX(-12px) scaleX(0)    scaleY(1); }
                  55%  { transform: translateY(-56%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
                  75%  { transform: translateY(-48%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
                  100% { transform: translateY(-50%) translateX(-12px) scaleX(1)    scaleY(1); }
                }
                .tri-pop {
                  animation: p3-shadow-pop 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards;
                }
              `}</style>

              <nav
                className="absolute z-20 flex flex-col items-center justify-center"
                style={{ inset: 0, pointerEvents: "none" }}
              >
                {menuItems.map((item, i) => {

                  const isActive = active === i;
                  const dist     = Math.abs(i - active);
                  const opacity  = isActive ? 1 : Math.max(0.45, 1 - dist * 0.18);
                  const estW     = item.label.length * item.fontSize * 0.58 + 80;
                  const estH     = item.fontSize * 0.94;

                  return (
                    <motion.div
                      key={item.label}

                      animate={{ y: [0, -item.float, 0] }}
                      transition={{
                        y: { duration: 3 + i * 1.2, repeat: Infinity, ease: "easeInOut" }
                      }}

                      onClick={() => {
                        activate(i);
                        transitionTo(item.screen);
                      }}
                      onMouseEnter={() => { activate(i); playNavigationSfx(); }}

                      style={{
                        position: "relative",
                        cursor: "pointer",
                        pointerEvents: "all",
                        marginRight: item.offsetX,
                        marginTop: item.offsetY,
                        opacity,
                        transition: "opacity 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >

                      {/* PINK GLOW */}
                      {isActive && (
                        <div style={{
                          position: "absolute",
                          top: "50%", left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "120%", height: "200%",
                          background: "radial-gradient(ellipse at center, rgba(255,100,180,0.3) 0%, transparent 70%)",
                          filter: "blur(18px)",
                          zIndex: 0,
                          pointerEvents: "none",
                        }} />
                      )}

                      {/* SKEW WRAPPER */}
                      <div style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        isolation: "isolate",
                        transform: `skewX(${item.skewX}deg) skewY(${item.skewY}deg)`,
                      }}>

                        {/* PINK TRIANGLE POINTER */}
                        <div
                          key={isActive ? `pop-${i}-${animKey}` : `idle-${i}`}
                          className={isActive ? "tri-pop" : ""}
                          style={{
                            position: "absolute",
                            top: "50%",
                            transformOrigin: "left center",
                            background: "rgba(235,80,120,0.85)",
                            zIndex: 1,
                            pointerEvents: "none",
                            width: estW,
                            height: estH,
                            clipPath: triClip(estW, estH),
                            transform: isActive ? undefined : "translateY(-50%) translateX(-12px) scaleX(0)",
                            transition: isActive ? undefined : "transform 0.18s ease",
                          }}
                        />

                        {/* WHITE HIGHLIGHT */}
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          transformOrigin: "left center",
                          background: "#ffffff",
                          zIndex: 2,
                          pointerEvents: "none",
                          width: estW,
                          height: estH,
                          clipPath: triClip(estW, estH),
                          transform: isActive ? "translateY(-50%) scaleX(1)" : "translateY(-50%) scaleX(0)",
                          transition: "transform 0.22s cubic-bezier(0.22,1,0.36,1)",
                        }} />

                        {/* LABEL STACK */}
                        <div style={{ position: "relative", zIndex: 3 }}>
                          <span style={{
                            fontFamily: "Persona",
                            fontSize: item.fontSize,
                            fontStyle: "italic",
                            letterSpacing: 2,
                            lineHeight: 0.85,
                            display: "block",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            color: isActive ? "#6b0010" : "#3ce2ff",
                            transition: "color 0.12s ease",
                            WebkitTextStroke: isActive ? "0px" : "1px rgba(103,232,249,0.4)",
                          }}>
                            {item.label}
                          </span>
                          <span style={{
                            fontFamily: "Persona",
                            fontSize: item.fontSize,
                            fontStyle: "italic",
                            letterSpacing: 2,
                            lineHeight: 0.85,
                            display: "block",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            color: "#ff2a2a",
                            position: "absolute",
                            inset: 0,
                            zIndex: 1,
                            clipPath: triClip(estW, estH),
                            opacity: isActive ? 1 : 0,
                            transition: "opacity 0.12s ease",
                          }}>
                            {item.label}
                          </span>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </nav>

              {/* HINT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                style={{
                  position: "absolute",
                  bottom: 24, right: 28,
                  zIndex: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 5,
                  fontFamily: "Anton, sans-serif",
                  pointerEvents: "none",
                }}
              >
                {[["↑↓", "NAVIGATE"], ["↵", "CONFIRM"], ["ESC", "BACK"]].map(([key, label]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.28)" }}>
                    <span style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>{key}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            </>
          )}

          {/* SCREENS */}
          {currentScreen === "about"   && <About />}
          {currentScreen === "resume"  && <Resume />}
          {currentScreen === "github"  && <Github />}
          {currentScreen === "socials"   && <Socials />}
          {currentScreen === "sideproj"  && <SideProjects />}

          {/* TRANSITION — key forces remount when variant changes */}
          {isTransitioning && (
            <Transition
              key={transitionVariant}
              variant={transitionVariant}
            />
          )}

        </>
      )}

    </main>
  );
}