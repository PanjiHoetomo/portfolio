"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    id: "instagram",
    label: "INSTAGRAM",
    icon: "📷",
    barIcon: "/images/icon1.png",
    href: "https://www.instagram.com/prig.hts",
    handle: "@prig.hts",
    stats: [
      { tag: "FOL", value: "—", color: "#e1306c" },
      { tag: "PST", value: "—", color: "#f77737" },
    ],
    links: [
      { label: "PROFILE", url: "https://www.instagram.com/prig.hts?igsh=cWkzdDZidGFwczIy" },
    ],
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    icon: "💼",
    barIcon: "/images/icon2.png",
    href: "https://www.linkedin.com/in/michael-oladimeji-a284411b7/",
    handle: "Michael Oladimeji",
    stats: [
      { tag: "CON", value: "—", color: "#0077b5" },
      { tag: "EXP", value: "4+", color: "#00a0dc" },
    ],
    links: [
      { label: "PROFILE",    url: "https://www.linkedin.com/in/michael-oladimeji-a284411b7/" },
    ],
  },
  {
    id: "youtube",
    label: "YOUTUBE",
    icon: "🎬",
    barIcon: "/images/icon3.png",
    href: "https://www.youtube.com/@plagedrights2121",
    handle: "@plagedrights2121",
    stats: [
      { tag: "SUB", value: "—", color: "#ff0000" },
      { tag: "VID", value: "—", color: "#ff4444" },
    ],
    links: [
      { label: "CHANNEL", url: "https://www.youtube.com/@plagedrights2121" },
    ],
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Socials() {

  const [active, setActive]           = useState(0);
  const [mounted, setMounted]         = useState(false);
  const [activeLink, setActiveLink]   = useState(0);
  const [focus, setFocus]             = useState<"left" | "right">("left");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (focus === "left") {

        if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));

        if (e.key === "ArrowRight") {
          setFocus("right");
          setActiveLink(0);
        }

        if (e.key === "Enter") {
          window.open(ITEMS[active].href, "_blank");
        }

      } else {

        const linkCount = ITEMS[active].links.length;
        if (e.key === "ArrowUp")   setActiveLink(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveLink(i => Math.min(linkCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");

        if (e.key === "Enter") {
          window.open(ITEMS[active].links[activeLink].url, "_blank");
        }

      }

    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, [active, focus, activeLink]);

  const item = ITEMS[active];

  return (
    <div className="absolute inset-0 overflow-hidden" id="socials-screen">

      {/* BG VIDEO */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/equip.mp4" type="video/mp4" />
      </video>

      {/* ENTRY MASK */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 9,
          overflow: "hidden",
          background: "#0047FF",
          clipPath: "circle(0 at 50% 50%)",
          animation: "socials-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
          pointerEvents: "none",
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/equip.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        @keyframes socials-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(40px); }
          60%  { opacity: 1; transform: translateX(-4px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-arrow-left  { animation: sc-arrow-left  0.8s ease-in-out infinite; display: inline-block; }
        .sc-arrow-right { animation: sc-arrow-right 0.8s ease-in-out infinite; display: inline-block; }
        .sc-right-nav-pop { animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .sc-infobar-in { animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── LEFT: BAR LIST ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {ITEMS.map((it, i) => {

          const isActive = active === i;

          return (
            <div
              key={it.id}
              onClick={() => {
                if (isActive) window.open(it.href, "_blank");
                else { setActive(i); setFocus("left"); }
              }}
              onMouseEnter={() => setActive(i)}
              style={{
                position: "relative",
                flexShrink: 0,
                pointerEvents: "all",
                cursor: "pointer",
                transform: mounted ? "translateX(0)" : "translateX(-100%)",
                transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
              }}
            >

              {/* RED UNDERLAY */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "45vw",
                  height: isActive ? 90 : 64,
                  background: "#c4001a",
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%)",
                  transform: "translateY(-7px)",
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              {/* MAIN BAR */}
              <div
                style={{
                  position: "relative",
                  width: "45vw",
                  height: isActive ? 90 : 64,
                  background: "#111",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.65)",
                  transition: "height 0.3s cubic-bezier(0.22,1,0.36,1)",
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

                {/* CHARACTER */}
                <img
                  src={CHARS[i]}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0, left: 110,
                    height: "100%", width: "auto", maxWidth: 160,
                    objectFit: "cover", objectPosition: "top",
                    pointerEvents: "none",
                    zIndex: 3,
                    clipPath: "polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)",
                  }}
                />

                {/* CONTENT */}
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

                  {/* ROLE */}
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

                  {/* LABEL + ICON */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 22, userSelect: "none" }}>{it.icon}</span>
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
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 14,
                        letterSpacing: 2,
                        color: isActive ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.3)",
                        transition: "color 0.2s ease",
                        userSelect: "none",
                      }}
                    >
                      {it.handle}
                    </div>
                  </div>

                  {/* STATS */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 24, flexShrink: 0 }}>
                    {it.stats.map(s => (
                      <div key={s.tag} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                          <span
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: 9,
                              letterSpacing: 1.5,
                              padding: "1px 4px",
                              border: `1px solid ${s.color}`,
                              color: s.color,
                              lineHeight: 1.4,
                              userSelect: "none",
                            }}
                          >
                            {s.tag}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Bebas Neue', sans-serif",
                              fontSize: 26,
                              fontStyle: "italic",
                              color: isActive ? "#111" : "#fff",
                              transition: "color 0.2s ease",
                              letterSpacing: 1,
                              userSelect: "none",
                            }}
                          >
                            {s.value}
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 2, width: "100%" }}>
                          <div style={{ height: 3, background: s.color, width: "100%" }} />
                          <div style={{ height: 2, background: "#000", width: "100%" }} />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          );

        })}
      </div>

      {/* ── RIGHT NAV LABEL ── */}
      {mounted && (
        <div
          key={active}
          className="sc-right-nav-pop"
          style={{
            position: "fixed",
            top: 40, right: 40,
            display: "flex",
            alignItems: "center",
            gap: 6,
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          <span className="sc-arrow-left" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#c4001a" }}>◄</span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 100,
              letterSpacing: 3,
              lineHeight: 1,
              color: "#fff",
              WebkitTextStroke: "2px #000",
              userSelect: "none",
            }}
          >
            LB
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28,
              letterSpacing: 3,
              color: "#111",
              padding: "0 8px",
              userSelect: "none",
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 100,
              letterSpacing: 3,
              lineHeight: 1,
              color: "#fff",
              WebkitTextStroke: "2px #000",
              userSelect: "none",
            }}
          >
            RB
          </span>
          <span className="sc-arrow-right" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#c4001a" }}>►</span>
        </div>
      )}

      {/* ── RIGHT: LINK BARS ── */}
      {mounted && item.links.map((link, i) => (
        <div
          key={`${active}-${i}`}
          className="sc-infobar-in"
          onClick={() => {
            setFocus("right");
            setActiveLink(i);
            window.open(link.url, "_blank");
          }}
          onMouseEnter={() => { setFocus("right"); setActiveLink(i); }}
          style={{
            position: "fixed",
            right: 0,
            left: "65%",
            top: `${155 + i * 52}px`,
            height: 46,
            background: focus === "right" && activeLink === i ? "#111" : "transparent",
            padding: focus === "right" && activeLink === i ? "1.5px" : 0,
            borderRadius: focus === "right" && activeLink === i ? 8 : 0,
            pointerEvents: "all",
            cursor: "pointer",
            zIndex: 50,
            animationDelay: `${i * 50}ms`,
            transition: "background 0.15s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: focus === "right" && activeLink === i ? "#fff" : "transparent",
              borderRadius: focus === "right" && activeLink === i ? 7 : 0,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {/* RED TOP STRIPE on selected */}
            {focus === "right" && activeLink === i && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#c4001a", zIndex: 1 }} />
            )}

            <img
              src={item.barIcon}
              alt=""
              style={{ height: "55%", width: "auto", flexShrink: 0, marginLeft: 14, objectFit: "contain" }}
            />

            <span
              style={{
                flex: 1,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                letterSpacing: 2,
                color: "#111",
                padding: "0 14px",
                userSelect: "none",
              }}
            >
              {link.label}
            </span>

            <span
              style={{
                height: "70%",
                background: "#000",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                letterSpacing: 1,
                color: "#fff",
                flexShrink: 0,
                borderRadius: 6,
                marginRight: 4,
                userSelect: "none",
              }}
            >
              OPEN
            </span>
          </div>
        </div>
      ))}

      {/* FOOTER HINTS */}
      <div
        style={{
          position: "fixed",
          bottom: 20, right: 28,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 5,
          fontFamily: "'Bebas Neue', sans-serif",
          zIndex: 50,
          pointerEvents: "none",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s ease 0.6s",
        }}
      >
        {[["↑↓", "SELECT"], ["→", "LINKS"], ["↵", "OPEN"], ["ESC", "BACK"]].map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}