"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const CHARS = [
  "/images/char1.png",
  "/images/char2.png",
  "/images/char3.png",
];

const ROLES = [
  { text: "LEADER", color: "#e8c100" },
  { text: "PARTY",  color: "#4a8fff" },
  { text: "PARTY",  color: "#4a8fff" },
];

const ITEMS = [
  {
    id: "about",
    label: "ABOUT ME",
    upper: [
      "name: Panji Parisya Akmal Hoetmo",
      "age: 19",
      "Current Role: Mahasiswa Teknik Informatika",
    ],
    lower: "major: Teknik Informatika Politeknik Negeri Cilacap",
  },
  {
    id: "funfact",
    label: "FUN FACT ABOUT ME",
    upper: [
      "I love just making stuff -- dosn't have to be particularly meaningful at all, just has to be fun (:",
      "I also enjoy sports, videography, video games and art.",
    ],
    lower: "facts about me",
  },
  {
    id: "weirdfact",
    label: "WEIRD FACT ABOUT ME",
    upper: [
      "I sometimes get lost in coding or creating -- before I know It, I havn't left my house in days.",
      "I've never even played the actual game that this entire website is based off.",
    ],
    lower: "Weird facts about me",
  },
];

const TAB_THEMES = [
  {
    image: "/images/mainm.jpeg",
    bgColor: "#0c6b6b", // Pink/Magenta for FeMC Kotone
    accentColor: "#00e5ff",
  },
  {
    image: "/images/mainm2.jpeg",
    bgColor: "#093a8c", // Blue for Makoto
    accentColor: "#00baff",
  },
  {
    image: "/images/mainf.jpeg",
    bgColor: "#bf15a6", // Teal for Makoto alt
    accentColor: "#ff2a85",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Trigger mount animations on load
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

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

  const playCloseSfx = () => {
    const sfx = new Audio("/sfx/closeSfx.wav");
    sfx.volume = 0.85;
    sfx.play().catch(() => {});
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!revealed) {
        // P5 Menu State Keyboard Events
        if (e.key === "ArrowUp") {
          playNavigationSfx();
          setActive(i => Math.max(0, i - 1));
        }
        if (e.key === "ArrowDown") {
          playNavigationSfx();
          setActive(i => Math.min(ITEMS.length - 1, i + 1));
        }
        if (e.key === "Enter" || e.key === "ArrowRight") {
          playSelectSfx();
          setRevealed(true);
        }
      } else {
        // P3 Status State Keyboard Events
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "q") {
          playNavigationSfx();
          setActive(i => (i - 1 + ITEMS.length) % ITEMS.length);
        }
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "e") {
          playNavigationSfx();
          setActive(i => (i + 1) % ITEMS.length);
        }
        if (e.key === "Escape") {
          playCloseSfx();
          setRevealed(false);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed]);

  const item = ITEMS[active];
  const theme = TAB_THEMES[active];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#040c1a]">
      {/* BG VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/status.mp4" type="video/mp4" />
      </video>

      {/* PAGE WRAPPER / BLUE TINT WHEN REVEALED */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#040e22",
          opacity: revealed ? 0.5 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ────────────────────────────────────────────────────────
             1. MENU STATE (PERSONA 5 VERTICAL BARS)
             ──────────────────────────────────────────────────────── */
          <motion.div
            key="p5-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10"
          >
            {/* ── BARS ── */}
            <div
              className="absolute z-20 left-0 flex flex-col gap-[6px]"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              {ITEMS.map((it, i) => {
                const isActive = active === i;

                return (
                  <div
                    key={it.id}
                    onClick={() => {
                      if (active === i) {
                        playSelectSfx();
                        setRevealed(true);
                      } else {
                        playNavigationSfx();
                        setActive(i);
                      }
                    }}
                    onMouseEnter={() => {
                      if (active !== i) {
                        playNavigationSfx();
                        setActive(i);
                      }
                    }}
                    style={{
                      position: "relative",
                      width: "45vw",
                      height: isActive ? 90 : 64,
                      transition: "height 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                      transform: mounted ? "translateX(0)" : "translateX(-100%)",
                      transitionDelay: `${i * 80}ms`,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {/* RED UNDERLAY */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#c4001a",
                        clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%)",
                        transform: "translateY(-7px)",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.2s ease",
                        zIndex: 0,
                        pointerEvents: "none",
                      }}
                    />

                    {/* MAIN BAR */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#111",
                        clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
                        boxShadow: "0 6px 24px rgba(0,0,0,0.65)",
                        overflow: "hidden",
                        zIndex: 1,
                      }}
                    >
                      {/* WHITE FILL */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "#fff",
                          clipPath: isActive
                            ? "polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%)"
                            : "polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%)",
                          transition: "clip-path 0.35s cubic-bezier(0.22,1,0.36,1)",
                          zIndex: 0,
                        }}
                      />

                      {/* SHADE */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0, bottom: 0, left: "73%", width: "6%",
                          background: "linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 100%)",
                          opacity: isActive ? 1 : 0,
                          transition: "opacity 0.35s ease",
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />

                      {/* PORTRAIT */}
                      <img
                        src={CHARS[i]}
                        alt=""
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 110,
                          height: "100%",
                          width: "auto",
                          maxWidth: 160,
                          objectFit: "cover",
                          objectPosition: "top",
                          pointerEvents: "none",
                          zIndex: 3,
                          clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
                        }}
                      />

                      {/* BAR CONTENT */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 4,
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 20px",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: 50,
                            letterSpacing: -2,
                            color: "#fff",
                            transform: "rotate(-30deg)",
                            userSelect: "none",
                            lineHeight: 1,
                            padding: "0 16px 0 8px",
                            flexShrink: 0,
                          }}
                        >
                          {ROLES[i].text}
                        </div>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 78,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: 28,
                              letterSpacing: 4,
                              color: isActive ? "#111" : "rgba(255,255,255,0.85)",
                              transition: "color 0.2s ease",
                              userSelect: "none",
                            }}
                          >
                            {it.label}
                          </span>
                        </div>

                        {isActive && (
                          <div
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: 13,
                              letterSpacing: 2,
                              color: "rgba(0,0,0,0.4)",
                              paddingRight: 8,
                              flexShrink: 0,
                              userSelect: "none",
                            }}
                          >
                            CLICK OR ENTER TO REVEAL
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* P5 FOOTER HINTS */}
            <div
              style={{
                position: "absolute",
                bottom: 20, right: 28,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 5,
                fontFamily: "'Bebas Neue', sans-serif",
                zIndex: 25,
                pointerEvents: "none",
              }}
            >
              {[["↑↓", "SELECT"], ["CLICK/↵", "REVEAL"], ["ESC", "BACK"]].map(([key, label]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    letterSpacing: 2,
                    color: "rgba(255,255,255,0.22)",
                  }}
                >
                  <span
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 3,
                      padding: "1px 6px",
                      fontSize: 11,
                    }}
                  >
                    {key}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* ────────────────────────────────────────────────────────
             2. REVEALED STATUS STATE (PERSONA 3 PORTABLE STYLE)
             ──────────────────────────────────────────────────────── */
          <motion.div
            key="p3-status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            {/* ── DIMMED INTERACTIVE OVERLAY ── */}
            <div
              onClick={() => {
                playCloseSfx();
                setRevealed(false);
              }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                cursor: "pointer",
              }}
            />

            {/* ── HEADER NAVIGATION (LB · RB) ── */}
            <div
              style={{
                position: "absolute",
                top: "6vh",
                left: "4vw",
                display: "flex",
                alignItems: "center",
                gap: 12,
                zIndex: 20,
              }}
            >
              {/* LB BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSelectSfx();
                  setActive(i => (i - 1 + ITEMS.length) % ITEMS.length);
                }}
                onMouseEnter={playNavigationSfx}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 48,
                  color: "#ffffff",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  padding: 0,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                LB
              </button>

              {/* DOT SEPARATOR */}
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: theme.accentColor,
                  boxShadow: `0 0 8px ${theme.accentColor}`,
                  display: "inline-block",
                  userSelect: "none",
                  transition: "background 0.4s ease, box-shadow 0.4s ease",
                }}
              />

              {/* RB BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSelectSfx();
                  setActive(i => (i + 1) % ITEMS.length);
                }}
                onMouseEnter={playNavigationSfx}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 48,
                  color: "#ffffff",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  padding: 0,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                RB
              </button>

              {/* RED PLAY TRIANGLE */}
              <span
                style={{
                  fontSize: 24,
                  color: "#e61c23",
                  userSelect: "none",
                  marginLeft: 6,
                  display: "inline-block",
                  transform: "translateY(-2px)",
                }}
              >
                ►
              </span>
            </div>

            {/* ── CONTENT CONTAINER ── */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "16vh",
                bottom: 0,
                width: "55vw",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "4vw",
                pointerEvents: "none",
              }}
            >
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: "100%",
                  transformOrigin: "left center",
                  pointerEvents: "auto",
                }}
              >
                {/* WHITE ACCENT BANNER */}
                <div
                  style={{
                    background: "#ffffff",
                    padding: "6px",
                    clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* INNER DARK BLUE BOX */}
                  <div
                    style={{
                      background: "#081b37",
                      border: `2px solid ${theme.accentColor}`,
                      padding: "24px 32px",
                      clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                      transition: "border-color 0.4s ease",
                    }}
                  >
                    {/* ACTIVE TAB LABEL HEADER */}
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 22,
                        letterSpacing: 3,
                        color: theme.accentColor,
                        marginBottom: 16,
                        transform: "skewX(-10deg)",
                        transition: "color 0.4s ease",
                      }}
                    >
                      {item.label}
                    </div>

                    {/* BULLET POINTS */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {item.upper.map((line, idx) => (
                        <div
                          key={idx}
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 400,
                            fontSize: 18,
                            color: "#ffffff",
                            letterSpacing: 0.5,
                            lineHeight: 1.3,
                            borderLeft: `4px solid ${theme.accentColor}`,
                            paddingLeft: 12,
                            transition: "border-color 0.4s ease",
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* LOWER BUTTON */}
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "2vw",
                  }}
                >
                  <div
                    style={{
                      background: "#111111",
                      color: "#ffffff",
                      border: "1px solid #fff",
                      padding: "8px 24px",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 20,
                      letterSpacing: 2,
                      transform: "skewX(-15deg)",
                      boxShadow: "4px 4px 0 rgba(0,0,0,0.8)",
                      maxWidth: "80%",
                      textAlign: "center",
                    }}
                  >
                    {item.lower}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT SLANTED CHARACTER PORTRAIT PANEL ── */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "45vw",
                zIndex: 5,
                clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
                transition: "background-color 0.4s ease",
                backgroundColor: theme.bgColor,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={theme.image}
                  alt="Persona 3 Portrait"
                  initial={{ opacity: 0, x: 50, scale: 1.05 }}
                  animate={{ opacity: 0.95, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* ── CLOSE BUTTON/HINT ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                playCloseSfx();
                setRevealed(false);
              }}
              style={{
                position: "absolute",
                bottom: 24, right: 28,
                zIndex: 35,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 13,
                letterSpacing: 2,
                color: "rgba(255,255,255,0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              <span>◄ CLOSE</span>
            </motion.div>

            {/* P3 FOOTER HINTS */}
            <div
              style={{
                position: "absolute",
                bottom: 20, right: 28,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 5,
                fontFamily: "'Bebas Neue', sans-serif",
                zIndex: 25,
                pointerEvents: "none",
              }}
            >
              {[
                ["Q/E or ◄/►", "NAVIGATE"],
                ["ESC/CLICK OUTSIDE", "BACK"],
              ].map(([key, label]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    letterSpacing: 2,
                    color: "rgba(255,255,255,0.22)",
                    marginTop: label === "BACK" ? 22 : 0, // Push down slightly to not overlap with CLOSE hint
                  }}
                >
                  <span
                    style={{
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 3,
                      padding: "1px 6px",
                      fontSize: 11,
                    }}
                  >
                    {key}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}