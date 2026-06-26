"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const ITEMS = [
  { id: "i",   badge: "I",   title: "EDUCATION",   subtitle: "University / Certifications", rank: 3 },
  { id: "ii",  badge: "II",  title: "SKILLS",       subtitle: "Frontend / Backend / Cloud",  rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS",     subtitle: "Featured Work",               rank: 5 },
  { id: "iv",  badge: "IV",  title: "EXPERIENCE",   subtitle: "Internships / Roles",         rank: 2 },
];

// Summary shown in right panel by default
const SUMMARY_PANELS = [
  {
    index: "01", title: "EDUCATION LOG", progress: "UCC",
    rows: [
      { index: "01", title: "D3 Teknik Informatika — Politeknik Negeri Cilacap",       status: "In progress"  },
      { index: "02", title: "AWD Asisstant Web Developer", status: "Certified" },
      { index: "03", title: "MikroTik Certified Network Associate (MTCNA)",      status: "Certified" },
      { index: "04", title: "Cisco Certified Network Associate (CCNA)", status: "Certified" },
      { index: "05", title: "Java SE 8 Programmer — Oracle",     status: "Certified" },
    ],
    bottom: { title: "COURSEWORK", bullets: [
      "- Object Oriented Programming",
      "- Database",
      "- Framework Programming",
    ]},
  },
  {
    index: "02", title: "SKILL TREE", progress: "MAX",
    rows: [
      { index: "BE", title: "PHP · Laravel · MySQL", status: "Strong" },
      { index: "FE", title: "HTML · CSS · Bootstrap · Tailwind",           status: "Strong" },
      { index: "DB", title: "MySQL",                       status: "Strong" },

    ],
    bottom: { title: "ALSO PROFICIENT IN", bullets: [
      "- LangGraph · Langfuse · Weaviate · RAG / Vector Search",
      "- Git · Agile · Jira · CI/CD Pipelines",
    ]},
  },
  {
    index: "03", title: "PROJECT LOG", progress: "2",
    rows: [
      { index: "01", title: "LockedIN — Pomodoro / Gaming Learning App", status: "In Dev"  },
      { index: "02", title: "Emotional — Facial & Body Emotion Analysis", status: "03/2022" },
    ],
    bottom: { title: "LOCKEDIN FEATURES", bullets: [
      "- Spotify integration · Group chat learning · Stat tracker",
      "- JWT auth · In-app purchases · Unlockable gaming system",
      "- Stack: Full-stack, in active development",
    ]},
  },
  {
    index: "04", title: "EXPERIENCE LOG", progress: "4",
    rows: [
      { index: "01", title: "PROTIC (Programming Technology Informatics Club)", status: "Current" },
      { index: "02", title: "Freelance Software Developer",           status: "2yr"     },
      { index: "03", title: "Associate Consultant — Version1",        status: "1yr"     },
      { index: "04", title: "Software Eng Intern — McAfee",           status: "6mo"     },
    ],
    bottom: { title: "HIGHLIGHTS", bullets: [
      "- OAuth/UAA auth · AI platform engineering (RAG/LangGraph)",
      "- Enterprise Spring Boot microservices · Global Trade compliance",
      "- Full-stack Agile delivery across fintech, security & SaaS",
    ]},
  },
];

// Full expanded detail per card — shown when Enter/→ pressed
const EXPANDED_PANELS = [
  {
    title: "EDUCATION — FULL DETAIL",
    sections: [
      {
        heading: "D3 Teknik Informatika — Politeknik Negeri Cilacap",
        date: "09/2024 – 06/2027",
        bullets: [
          "Major in Teknik Informatika",
          "Relevant coursework: Object Oriented Programming, Database, Framework Programming, Networking, Software Engineering, Functional Programming, Mobile Programming",
        ],
      },
      {
        heading: "CERTIFICATIONS",
        date: "",
        bullets: [
          "AWD Asisstant Web Developer",
          "MikroTik Certified Network Associate (MTCNA)",
          "Cisco Certified Network Associate (CCNA)",
          "Java SE 8 Programmer — Oracle Certified Associate",
        ],
      },
    ],
  },
  {
    title: "SKILLS — FULL DETAIL",
    sections: [
      {
        heading: "LANGUAGES & FRAMEWORKS",
        date: "",
        bullets: [
          "Java · Python · JavaScript · TypeScript · Spring Boot · Node · Angular · Kafka",
          "LangGraph · Langfuse · Weaviate · RAG / Vector Search",
        ],
      },
      {
        heading: "CLOUD & INFRASTRUCTURE",
        date: "",
        bullets: [
          "AWS · Azure · Docker · Microservices · Distributed Systems",
          "Jest · JUnit · Unit / Integration / E2E Testing · CI/CD · Git · Agile · Jira",
        ],
      },
      {
        heading: "DATABASES",
        date: "",
        bullets: ["MongoDB · NoSQL · SQL"],
      },
    ],
  },
  {
    title: "PROJECTS — FULL DETAIL",
    sections: [
      {
        heading: "LockedIN",
        date: "In Development",
        bullets: [
          "Pomodoro application for incremental learning using an unlockable gaming-style system",
          "Spotify integration, group chat learning, statistic tracker, JWT auth, in-app purchases for unlockables",
        ],
      },
      {
        heading: "Emotional",
        date: "03/2022",
        bullets: [
          "Facial and body emotion analysis project using Python, TensorFlow, NumPY and PyTorch",
          "Multi-model application using neural networks for real-time emotion classification",
        ],
      },
    ],
  },
  {
    title: "EXPERIENCE — FULL DETAIL",
    sections: [
      {
        heading: "Senior Systems Engineer — Mphasis HPE",
        date: "01/2025 – Present · Dublin",
        bullets: [
          "Engineered enterprise-scale auth features in Java Spring Boot microservices; owned initiatives from investigation through production rollout",
          "Led remediation of OAuth/UAA auth failure flows; implemented centralized error handling, timeout recovery, redirect workflows",
          "Designed Global Trade compliance validation: RPL enforcement workflows, resilient retry/error-handling, audit/SEL logging pipelines",
          "Transitioned into AI platform engineering — built AI-powered support system using Python, Docker, MongoDB, Weaviate, LangGraph, Langfuse",
        ],
      },
      {
        heading: "Freelance Software Developer",
        date: "09/2023 – 01/2025 · Dublin",
        bullets: [
          "Delivered web applications and e-commerce platforms using JavaScript, Java Spring Boot, Vue.js",
          "Integrated third-party APIs and payment gateways; provided ongoing support and maintenance",
        ],
      },
      {
        heading: "Associate Consultant — Version1",
        date: "10/2022 – 10/2023 · Dublin",
        bullets: [
          "Full-stack development on enterprise application using Java, Angular, SQL in Agile environment",
          "Designed scalable APIs and background workers for farmland management platform serving thousands of daily users",
          "CI/CD pipeline integration, code reviews, load/stress testing, unit/integration/e2e testing",
        ],
      },
      {
        heading: "Software Engineering Intern — McAfee",
        date: "02/2021 – 08/2021 · Cork",
        bullets: [
          "Globalized cloud-based solutions using AWS; implemented multi-region support reducing latency by 30%",
          "Developed Python automation scripts cutting manual tasks and boosting team productivity by 20%",
        ],
      },
    ],
  },
];

// ── SHARED STYLES ─────────────────────────────────────────────────────────────

const panelBg    = "linear-gradient(180deg, rgba(15,28,105,0.96) 0%, rgba(8,16,68,0.97) 100%)";
const panelClip  = "polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%)";
const rowClip    = "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)";

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Resume() {

  const [active, setActive]     = useState(0);
  const [mounted, setMounted]   = useState(false);
  const [expanded, setExpanded] = useState(false); // Enter/→ shows full detail

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp")    { setActive(i => Math.max(0, i - 1)); setExpanded(false); }
      if (e.key === "ArrowDown")  { setActive(i => Math.min(ITEMS.length - 1, i + 1)); setExpanded(false); }
      if (e.key === "ArrowRight" || e.key === "Enter") setExpanded(true);
      if (e.key === "ArrowLeft")  setExpanded(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);

  }, []);

  const summary  = SUMMARY_PANELS[active];
  const detail   = EXPANDED_PANELS[active];

  return (
    <div className="absolute inset-0 overflow-hidden" id="resume-screen">

      {/* BG VIDEO */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/skills.mp4" type="video/mp4" />
      </video>

      {/* ENTRY MASK */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 9, overflow: "hidden",
        background: "#0047FF",
        clipPath: "circle(0 at 50% 50%)",
        animation: "resume-entry-reveal 1.2s cubic-bezier(0.16,1,0.3,1) forwards",
        pointerEvents: "none",
      }}>
        <video autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/videos/skills.mp4" type="video/mp4" />
        </video>
      </div>

      <style>{`
        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
      `}</style>

      {/* ── CARD LIST ── */}
      <div style={{
        position: "absolute", top: "9vh", left: "2.8vw",
        width: "min(47vw, 720px)", display: "flex", flexDirection: "column", gap: 10,
        zIndex: 10, transform: "scale(0.9)", transformOrigin: "top left",
      }}>

        <div style={{
          fontFamily: "'Anton', sans-serif", fontSize: 92, lineHeight: 0.9,
          color: "#f6fbff", letterSpacing: 2, margin: "0 0 6px 12px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateX(0)" : "translateX(-24px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>LIST</div>

        {ITEMS.map((item, index) => {
          const isActive = active === index;
          return (
            <div
              key={item.id}
              onMouseEnter={() => { setActive(index); setExpanded(false); }}
              onClick={() => { setActive(index); setExpanded(v => index === active ? !v : false); }}
              style={{
                position: "relative", cursor: "pointer",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-48px)",
                transition: `opacity 0.4s ease ${index * 55}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${index * 55}ms`,
              }}
            >
              <div style={{
                position: "relative", height: 112,
                background: isActive ? "#ffffff" : "#10185f",
                clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
                boxShadow: isActive ? "10px 8px 0 #d63232" : "0 8px 0 rgba(5,13,59,0.85)",
                transform: isActive ? "translateX(6px)" : "translateX(0)",
                transition: "transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
                overflow: "visible",
              }}>
                {/* BADGE */}
                <div style={{
                  position: "absolute", top: 10, left: -10, width: 56, height: 70,
                  background: isActive ? "#000" : "#0b113d",
                  border: `3px solid ${isActive ? "#000" : "#9cf7ff"}`,
                  clipPath: "polygon(14% 0, 100% 0, 84% 100%, 0 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: "rotate(-8deg)", boxShadow: "0 4px 0 rgba(0,0,0,0.28)", zIndex: 2,
                }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#d2fdff", letterSpacing: 1, transform: "rotate(8deg)", display: "block" }}>{item.badge}</span>
                </div>
                {/* INNER */}
                <div style={{ position: "absolute", inset: 0, padding: "14px 22px 14px 62px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", zIndex: 1 }}>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 56, lineHeight: 0.9, letterSpacing: 1, color: isActive ? "#000" : "#a5f6ff", transition: "color 0.22s ease" }}>{item.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2, flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>RANK</div>
                    <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 70, lineHeight: 0.82, color: isActive ? "#000" : "#9ffbff", transition: "color 0.22s ease" }}>{item.rank}</div>
                  </div>
                </div>
                {/* SUBTITLE */}
                <div style={{
                  position: "absolute", left: 64, right: 14, bottom: 12, height: 34,
                  background: isActive ? "#000" : "#85f4ff",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                  display: "flex", alignItems: "center", padding: "0 18px", zIndex: 1,
                }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, lineHeight: 1, letterSpacing: 1, color: isActive ? "#fff" : "#041238" }}>{item.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* ── RIGHT PANEL ── */}
      <AnimatePresence mode="wait">
        {!expanded ? (

          // ── SUMMARY VIEW ──
          <motion.div
            key={`summary-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", minHeight: "74vh", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "grid", gridTemplateColumns: "70px 1fr auto",
              alignItems: "center", gap: 14, minHeight: 92, padding: "0 18px",
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 46, lineHeight: 1 }}>{summary.index}</div>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 42, lineHeight: 0.92, letterSpacing: 1 }}>{summary.title}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: 2 }}>{summary.progress}</div>
            </div>

            {/* ROWS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {summary.rows.map(row => (
                <div key={row.index} style={{
                  display: "grid", gridTemplateColumns: "50px 1fr auto",
                  alignItems: "center", gap: 14, minHeight: 56, padding: "0 14px",
                  background: "rgba(8,18,72,0.96)", clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, color: "#94f4ff" }}>{row.index}</div>
                  <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, lineHeight: 1.1, color: "#f2fcff" }}>{row.title}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#06133b", background: "#8df6ff", padding: "5px 10px", clipPath: "polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)", whiteSpace: "nowrap" }}>{row.status}</div>
                </div>
              ))}
            </div>

            {/* BOTTOM */}
            <div style={{ marginTop: 22, padding: 18, background: "rgba(5,13,57,0.97)", clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: 2, color: "#91f5ff", marginBottom: 14 }}>{summary.bottom.title}</div>
              {summary.bottom.bullets.map((b, i) => (
                <div key={i} style={{ fontFamily: "'Anton', sans-serif", fontSize: 19, lineHeight: 1.2, color: "#edfaff", marginBottom: 8 }}>{b}</div>
              ))}
            </div>

            {/* EXPAND HINT */}
            <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 2, color: "rgba(133,244,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ border: "1px solid rgba(133,244,255,0.3)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>→</span>
                <span>FULL DETAIL</span>
              </div>
            </div>

          </motion.div>

        ) : (

          // ── EXPANDED VIEW ──
          <motion.div
            key={`expanded-${active}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "9.5vh", right: "4.5vw",
              width: "min(39vw, 620px)", maxHeight: "82vh", zIndex: 10,
              padding: "22px 24px 24px 24px",
              background: panelBg, clipPath: panelClip,
              boxShadow: "inset 0 0 0 1px rgba(133,244,255,0.16), 16px 16px 0 rgba(0,6,30,0.55)",
              overflowY: "auto",
            }}
          >
            {/* TOP BAR */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              minHeight: 72, padding: "0 18px", marginBottom: 0,
              background: "linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%)",
              clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)",
              color: "#08153f", boxShadow: "10px 0 0 rgba(255,94,136,0.88)",
            }}>
              <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 32, lineHeight: 1, letterSpacing: 1 }}>{detail.title}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 2, opacity: 0.6, cursor: "pointer" }} onClick={() => setExpanded(false)}>← BACK</div>
            </div>

            {/* SECTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
              {detail.sections.map((section, si) => (
                <div key={si} style={{
                  padding: 16, background: "rgba(8,18,72,0.96)",
                  clipPath: rowClip,
                  boxShadow: "inset 0 0 0 1px rgba(140,239,255,0.12)",
                }}>
                  {/* SECTION HEADING */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, color: "#8df6ff", letterSpacing: 1 }}>{section.heading}</div>
                    {section.date && (
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "rgba(133,244,255,0.5)", letterSpacing: 1, flexShrink: 0, marginLeft: 8 }}>{section.date}</div>
                    )}
                  </div>
                  {/* BULLETS */}
                  {section.bullets.map((b, bi) => (
                    <div key={bi} style={{
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                      fontSize: 13, lineHeight: 1.5, color: "#cde8ff",
                      marginBottom: 6, paddingLeft: 12,
                      borderLeft: "2px solid rgba(133,244,255,0.25)",
                    }}>{b}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* COLLAPSE HINT */}
            <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 2, color: "rgba(133,244,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ border: "1px solid rgba(133,244,255,0.3)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>←</span>
                <span>SUMMARY</span>
              </div>
            </div>

          </motion.div>

        )}
      </AnimatePresence>

      {/* FOOTER HINTS */}
      <div style={{
        position: "absolute", bottom: 20, right: 28,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5,
        fontFamily: "'Bebas Neue', sans-serif", zIndex: 20, pointerEvents: "none",
        opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease 0.6s",
      }}>
        {(expanded
          ? [["←", "SUMMARY"], ["ESC", "BACK"]]
          : [["↑↓", "SELECT"], ["→", "FULL DETAIL"], ["ESC", "BACK"]]
        ).map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, letterSpacing: 2, color: "rgba(255,255,255,0.22)" }}>
            <span style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 3, padding: "1px 6px", fontSize: 11 }}>{key}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}