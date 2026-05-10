"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    upper: ["name: Michael Oladimeji", "age: 26", "Current Role: Senior Systems Engineer"],
    lower: "major: computer science",
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

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About() {

  const [active, setActive]     = useState(0);
  const [mounted, setMounted]   = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Trigger mount animations on load
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation
  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (e.key === "ArrowUp") {
        setActive(i => Math.max(0, i - 1));
        setRevealed(false);
      }

      if (e.key === "ArrowDown") {
        setActive(i => Math.min(ITEMS.length - 1, i + 1));
        setRevealed(false);
      }

      if (e.key === "Enter" || e.key === "ArrowRight") {
        setRevealed(true);
      }

      if (e.key === "ArrowLeft") {
        setRevealed(false);
      }

    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, []);

  const item = ITEMS[active];

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* BG VIDEO */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/status.mp4" type="video/mp4" />
      </video>

      {/* PAGE TITLE */}
      <div
        className="absolute z-20 top-8 left-10 text-white"
        style={{ fontFamily: "Persona", fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
      </div>

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
              onClick={() => { setActive(i); setRevealed(false); }}
              onMouseEnter={() => { setActive(i); setRevealed(false); }}
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

              {/* RED UNDERLAY — peeks out on active */}
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

                {/* WHITE FILL — slides in on active */}
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

                {/* SHADE on white fill edge */}
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

                {/* CHARACTER PORTRAIT */}
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

                  {/* ROLE LABEL */}
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

                  {/* LABEL */}
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

                  {/* ENTER HINT on active */}
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
                      ENTER TO REVEAL
                    </div>
                  )}

                </div>

              </div>

            </div>
          );

        })}
      </div>

      {/* ── REVEAL PANEL ── */}
      <AnimatePresence>
        {revealed && (
          <>

            {/* DIM */}
            <motion.div
              key={`dim-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.68 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                background: "rgba(40,45,54,0.68)",
                pointerEvents: "none",
              }}
            />

            {/* PANEL */}
            <motion.div
              key={`panel-${active}`}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 0.92, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: "44vh",
                left: "-6vw",
                width: "88vw",
                height: "60vh",
                zIndex: 31,
                pointerEvents: "none",
                background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%)",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%)",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.18), 18px 0 0 rgba(215,13,44,0.82)",
                transform: "rotate(-20deg)",
                transformOrigin: "left bottom",
              }}
            >

              {/* RED TOP STRIPE */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: 8,
                  background: "linear-gradient(180deg, #e03d31 0%, #eb3333 100%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%)",
                }}
              />

              {/* UPPER BLACK BAR */}
              <div
                style={{
                  position: "absolute",
                  top: "10%", left: 0,
                  width: "100%", height: "40%",
                  background: "rgba(0,0,0,0.92)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  color: "#fff",
                  textAlign: "center",
                  padding: "0 40px",
                }}
              >
                {item.upper.map((line) => (
                  <div
                    key={line}
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 300,
                      fontSize: 20,
                      letterSpacing: 0.5,
                      lineHeight: 1.15,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* LOWER BLACK BAR */}
              <div
                style={{
                  position: "absolute",
                  top: "58%", right: 0,
                  width: "48%", height: "20%",
                  background: "rgba(0,0,0,0.92)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)",
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: 22,
                  letterSpacing: 0.4,
                  paddingLeft: 22,
                }}
              >
                {item.lower}
              </div>

            </motion.div>

            {/* CLOSE HINT */}
            <motion.div
              key={`hint-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
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
                pointerEvents: "none",
              }}
            >
              <span>◄ CLOSE</span>
            </motion.div>

          </>
        )}
      </AnimatePresence>

      {/* ── FOOTER HINTS ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          position: "absolute",
          bottom: 20, right: 28,
          display: revealed ? "none" : "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          fontFamily: "'Bebas Neue', sans-serif",
          zIndex: 25,
          pointerEvents: "none",
        }}
      >
        {[["↑↓", "SELECT"], ["↵", "REVEAL"], ["ESC", "BACK"]].map(([key, label]) => (
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
      </motion.div>

    </div>
  );
}