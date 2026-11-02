// ═══════════════════════════════════════════════════════════
// NYC POLICY WATCH — everything in one file.
// To update bills: edit the "bills" list in PART 1 below. Nothing else needs touching.
// ═══════════════════════════════════════════════════════════
import { useEffect, useState } from "react";

// ─── PART 1: YOUR BILL DATA ───────────────────────────────
// ─────────────────────────────────────────────────────────────
// YOUR BILL DATA — no API key needed.
// To add a bill: copy one { ... } block, paste it below, and edit it.
// stage: 0 = Introduced, 1, 2, 3, 4 = Signed into law
// level: "city" (NYC Council) or "state" (NY Senate/Assembly)
// boro: "Citywide", "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"
// The bills below are SAMPLES. Replace them with real ones.
// ─────────────────────────────────────────────────────────────

const lastUpdated = "November 2026";

const steps = {
  city: [
    "Introduced",
    "Committee hearing",
    "Committee vote",
    "Full Council vote",
    "Mayor signs",
  ],
  state: [
    "Introduced",
    "Committee",
    "Passed one house",
    "Passed both houses",
    "Governor signs",
  ],
};

const topics = [
  "Housing",
  "Health",
  "Tech & AI",
  "Transit",
  "Defense",
  "Financial Services",
];

const bills = [
  {
    id: "c1",
    level: "city",
    number: "Int. 0101-2026",
    title: "Disclosure of AI tools used by city agencies",
    sponsor: "Council Member (sample)",
    topic: "Tech & AI",
    boro: "Citywide",
    stage: 1,
    summary:
      "Would require each city agency to publish a yearly list of the AI and algorithmic tools it uses and what decisions they inform.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "c2",
    level: "city",
    number: "Int. 0214-2026",
    title: "Limits on facial recognition in residential buildings",
    sponsor: "Council Member (sample)",
    topic: "Tech & AI",
    boro: "Citywide",
    stage: 2,
    summary:
      "Would bar landlords from using facial recognition as the only way for tenants to enter their building.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "c3",
    level: "city",
    number: "Int. 0330-2026",
    title: "Street safety redesigns near schools",
    sponsor: "Council Member (sample)",
    topic: "Transit",
    boro: "Bronx",
    stage: 0,
    summary:
      "Directs DOT to prioritize traffic-calming redesigns within a quarter mile of public schools, starting in the Bronx.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "c4",
    level: "city",
    number: "Int. 0412-2026",
    title: "Right to counsel outreach for tenants",
    sponsor: "Council Member (sample)",
    topic: "Housing",
    boro: "Brooklyn",
    stage: 3,
    summary:
      "Funds door-to-door outreach so tenants facing eviction know they can get a free lawyer.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "c5",
    level: "city",
    number: "Int. 0507-2026",
    title: "Fee disclosure for check-cashing businesses",
    sponsor: "Council Member (sample)",
    topic: "Financial Services",
    boro: "Queens",
    stage: 4,
    summary:
      "Requires check cashers to post all fees in large print and in the neighborhood's most common languages before a transaction.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "c6",
    level: "city",
    number: "Int. 0618-2026",
    title: "Critical infrastructure protection plan",
    sponsor: "Council Member (sample)",
    topic: "Defense",
    boro: "Citywide",
    stage: 1,
    summary:
      "Requires NYC Emergency Management to publish a plan for protecting bridges, tunnels and the power grid from drone and cyber threats.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "s1",
    level: "state",
    number: "S.0101 / A.0102",
    title: "Algorithmic discrimination protections",
    sponsor: "State Senator (sample)",
    topic: "Tech & AI",
    boro: "Citywide",
    stage: 2,
    summary:
      "Would require companies using AI for major decisions, like housing or credit, to test for bias and give people a way to appeal.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "s2",
    level: "state",
    number: "S.0215 / A.0216",
    title: "Cybersecurity standards for local governments",
    sponsor: "State Senator (sample)",
    topic: "Tech & AI",
    boro: "Citywide",
    stage: 1,
    summary:
      "Sets minimum cybersecurity rules for cities and counties, including incident reporting within 72 hours.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "s3",
    level: "state",
    number: "S.0330 / A.0331",
    title: "Good cause eviction updates",
    sponsor: "Assembly Member (sample)",
    topic: "Housing",
    boro: "Manhattan",
    stage: 3,
    summary:
      "Adjusts how rent increase limits are calculated under the state's good cause eviction law.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "s4",
    level: "state",
    number: "S.0444 / A.0445",
    title: "National Guard cyber response unit",
    sponsor: "State Senator (sample)",
    topic: "Defense",
    boro: "Citywide",
    stage: 0,
    summary:
      "Creates a New York National Guard unit that can help state agencies and local governments respond to major cyberattacks.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "s5",
    level: "state",
    number: "S.0552 / A.0553",
    title: "Staten Island ferry service study",
    sponsor: "Assembly Member (sample)",
    topic: "Transit",
    boro: "Staten Island",
    stage: 4,
    summary:
      "Orders a state study on adding late-night ferry service between Staten Island and Manhattan.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "s6",
    level: "state",
    number: "S.0660 / A.0661",
    title: "Consumer protections for crypto platforms",
    sponsor: "State Senator (sample)",
    topic: "Financial Services",
    boro: "Citywide",
    stage: 1,
    summary:
      "Requires crypto trading platforms licensed in New York to hold customer funds separately and disclose fees in plain language.",
    link: "https://www.nysenate.gov/legislation",
  },
  {
    id: "c7",
    level: "city",
    number: "Int. 0725-2026",
    title: "Mental health response teams in every borough",
    sponsor: "Council Member (sample)",
    topic: "Health",
    boro: "Citywide",
    stage: 2,
    summary:
      "Expands teams of EMTs and mental health workers who answer some 911 mental health calls instead of police, so each borough has round-the-clock coverage.",
    link: "https://legistar.council.nyc.gov/Legislation.aspx",
  },
  {
    id: "s7",
    level: "state",
    number: "S.0770 / A.0771",
    title: "Price transparency for hospital bills",
    sponsor: "Assembly Member (sample)",
    topic: "Health",
    boro: "Citywide",
    stage: 3,
    summary:
      "Requires hospitals to give patients an itemized bill in plain language and a good-faith cost estimate before scheduled procedures.",
    link: "https://www.nysenate.gov/legislation",
  },
];

// ─── PART 2: SKYLINE ──────────────────────────────────────
// NYC skyline scene for the header.
// Light theme: sunset. Dark theme: moon, stars and lit windows.
// The CSS (PolicyWatch.css) decides what shows in each theme.

// Small "random" number generator with a fixed seed, so the skyline
// looks the same every time the page loads.
function seeded(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

const GROUND = 196; // y position of the waterline
const rand = seeded(42);

// Background towers (left to right), leaving room for the Empire State Building.
const TOWERS = [];
for (let x = 190; x < 1000; ) {
  if (x > 500 && x < 620) {
    x = 620;
    continue;
  }
  const w = 18 + Math.floor(rand() * 26);
  const nearESB = x > 440 && x < 690;
  const h = (nearESB ? 34 : 40) + Math.floor(rand() * (nearESB ? 50 : 80));
  TOWERS.push({ x, w: w - 3, h, antenna: rand() < 0.18 });
  x += w;
}

// Windows on each tower. About a third light up at night.
const WINDOWS = [];
TOWERS.forEach((t) => {
  const top = GROUND - t.h;
  for (let r = 0; top + 6 + r * 9 < GROUND - 6; r++) {
    for (let c = 0; t.x + 4 + c * 7 < t.x + t.w - 4; c++) {
      if (rand() < 0.34)
        WINDOWS.push({ x: t.x + 4 + c * 7, y: top + 6 + r * 9 });
    }
  }
});

// Stars scattered across the upper sky.
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: Math.floor(rand() * 1000),
  y: Math.floor(rand() * 120),
  r: rand() < 0.2 ? 1.6 : 0.9,
  twinkle: i % 5 === 0,
}));

// Empire State Building, built from stacked setbacks.
const ESB = [
  [518, 122, 84, 74],
  [528, 98, 64, 26],
  [538, 74, 44, 26],
  [547, 54, 26, 22],
  [552, 42, 16, 14],
];

function Skyline() {
  return (
    <svg
      className="npw-scene"
      viewBox="0 0 1000 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="npw-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1b8" />
          <stop offset="55%" stopColor="#ffb347" />
          <stop offset="100%" stopColor="#f2652b" />
        </radialGradient>
        <radialGradient id="npw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffc66b" stopOpacity=".55" />
          <stop offset="100%" stopColor="#ffc66b" stopOpacity="0" />
        </radialGradient>
        <mask id="npw-crescent">
          <rect width="1000" height="220" fill="#000" />
          <circle cx="842" cy="52" r="20" fill="#fff" />
          <circle cx="852" cy="45" r="17" fill="#000" />
        </mask>
      </defs>

      {/* Night sky */}
      <g className="npw-night">
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            className={"npw-star-dot" + (s.twinkle ? " tw" : "")}
          />
        ))}
        <circle cx="842" cy="52" r="34" className="npw-moonglow" />
        <rect
          width="1000"
          height="220"
          mask="url(#npw-crescent)"
          className="npw-moon"
        />
      </g>

      {/* Sunset sky */}
      <g className="npw-day">
        <circle cx="820" cy="138" r="130" fill="url(#npw-glow)" />
        <circle cx="820" cy="138" r="44" fill="url(#npw-sun)" />
      </g>

      {/* Manhattan towers */}
      <g className="npw-sil">
        {TOWERS.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={GROUND - t.h} width={t.w} height={t.h} />
            {t.antenna && (
              <rect
                x={t.x + t.w / 2 - 0.75}
                y={GROUND - t.h - 14}
                width="1.5"
                height="14"
              />
            )}
          </g>
        ))}
        {/* Empire State Building */}
        {ESB.map(([x, y, w, h], i) => (
          <rect key={"e" + i} x={x} y={y} width={w} height={h} />
        ))}
        <rect x="556" y="26" width="8" height="17" />
        <rect x="559.3" y="4" width="1.4" height="24" />
      </g>

      {/* Windows (only visible at night) */}
      <g className="npw-windows">
        {WINDOWS.map((w, i) => (
          <rect key={i} x={w.x} y={w.y} width="3" height="4" />
        ))}
        {[530, 540, 550, 560, 570, 580, 590].map((x) =>
          [130, 145, 160, 175].map((y) => (
            <rect key={x + "-" + y} x={x} y={y} width="3" height="6" />
          ))
        )}
      </g>
      {/* Empire State crown lights (takes the city or state color at night) */}
      <g className="npw-esb-lights">
        <rect x="547" y="54" width="26" height="4" />
        <rect x="552" y="42" width="16" height="3" />
        <rect x="556" y="26" width="8" height="3" />
      </g>

      {/* Statue of Liberty on Liberty Island */}
      <g className="npw-sil">
        <ellipse cx="120" cy="198" rx="74" ry="7" />
        <polygon points="88,197 152,197 146,170 94,170" />
        <rect x="104" y="138" width="32" height="34" />
        <rect x="100" y="134" width="40" height="6" />
        <polygon points="110,134 130,134 126,100 123,90 116,90 113,100" />
        <circle cx="119.5" cy="84" r="5.5" />
        <polygon points="112,82 108,76 115,80 116,74 119,79 121,73 123,79 127,74 125,80 131,77 127,82" />
        <polygon points="121,94 125,93 131,61 127,60" />
        <rect
          x="106"
          y="98"
          width="7"
          height="11"
          transform="rotate(-18 109 103)"
        />
        <rect x="126.5" y="54" width="6" height="7" />
      </g>
      <ellipse cx="129.5" cy="49" rx="4" ry="6.5" className="npw-flame" />

      {/* Harbor */}
      <rect
        x="0"
        y={GROUND}
        width="1000"
        height={220 - GROUND}
        className="npw-water"
      />
      <g className="npw-ripples">
        <rect x="770" y="202" width="100" height="1.5" />
        <rect x="790" y="208" width="60" height="1.5" />
        <rect x="805" y="214" width="30" height="1.5" />
        <rect x="110" y="203" width="40" height="1.2" />
      </g>
    </svg>
  );
}

// ─── PART 3: THE TRACKER ──────────────────────────────────
// NYC Policy Watch — a self-contained section for your portfolio.
// It reads bills from ../data/bills.js. No API key, no internet calls.
// City tab uses NYC orange + blue; State tab switches to navy + gold.
// The torch switch flips between sunset (light) and night (dark).

const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];

// Remembers which bills the visitor starred (saved in their own browser only).
function useFollows() {
  const [follows, setFollows] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("npw-follows") || "[]"));
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("npw-follows", JSON.stringify([...follows]));
    } catch {
      /* storage blocked: stars still work until the page reloads */
    }
  }, [follows]);
  const toggle = (id) =>
    setFollows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return [follows, toggle];
}

// Light/dark choice, saved in the visitor's browser. Starts on light (sunset).
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("npw-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("npw-theme", theme);
    } catch {
      /* storage blocked: the switch still works until the page reloads */
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// The theme switch, shaped like Lady Liberty's torch. The flame lights up at night.
function TorchToggle({ theme, onToggle }) {
  const night = theme === "dark";
  return (
    <button
      className="npw-toggle"
      role="switch"
      aria-checked={night}
      aria-label="Night mode"
      onClick={onToggle}
    >
      <svg viewBox="0 0 24 40" width="20" height="34" aria-hidden="true">
        <path
          className="npw-toggle-flame"
          d="M12 1c3 5 6 7 6 11a6 6 0 0 1-12 0c0-3 2-5 3-7 0 3 1 4 2 4 0-3-1-5 1-8z"
        />
        <path className="npw-toggle-cup" d="M5 17h14l-2 5H7z" />
        <path className="npw-toggle-handle" d="M9 22h6l-1.5 16h-3z" />
      </svg>
      <span>{night ? "Night" : "Sunset"}</span>
    </button>
  );
}

// A little NYC cab that drives along the line under the skyline.
function TaxiCab() {
  return (
    <svg className="npw-cab" viewBox="0 0 64 24" width="64" height="24">
      <polygon className="npw-beam" points="45,13 64,8 64,21" />
      <path
        d="M4 18v-5l5-1 4-6h16l5 6 6 1v5z"
        fill="#f7b500"
        stroke="#1a1a1a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect
        x="17"
        y="2.5"
        width="8"
        height="3.5"
        rx="1"
        fill="#f7b500"
        stroke="#1a1a1a"
        strokeWidth="0.8"
      />
      <path className="npw-cab-glass" d="M14 7h6v5h-9z M22 7h6l4 5h-10z" />
      {[12, 15, 18, 21, 24, 27].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={i % 2 ? 14.5 : 13.5}
          width="1.5"
          height="1"
          fill="#1a1a1a"
        />
      ))}
      <rect x="43" y="13" width="2" height="2" fill="#fff3b0" />
      <rect x="3.5" y="13" width="1.5" height="2" fill="#e2231a" />
      <circle
        cx="12"
        cy="18"
        r="3.2"
        fill="#1a1a1a"
        stroke="#555"
        strokeWidth="1"
      />
      <circle
        cx="33"
        cy="18"
        r="3.2"
        fill="#1a1a1a"
        stroke="#555"
        strokeWidth="1"
      />
    </svg>
  );
}

// Small apple used in the footer.
function AppleIcon() {
  return (
    <svg viewBox="0 0 32 32" width="16" height="16" aria-hidden="true">
      <path
        d="M16 9c-2-2-7-2.5-9 1.5-2.2 4.4.2 11.5 3.5 14.5 1.6 1.4 3 1.3 4.2.6.8-.4 1.8-.4 2.6 0 1.2.7 2.6.8 4.2-.6 3.3-3 5.7-10.1 3.5-14.5C23 6.5 18 7 16 9z"
        fill="#e2231a"
      />
      <path
        d="M16 9c0-2 .5-4 2-5.5"
        stroke="#5b3a1e"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M17.5 5.5c2-2.5 5-2.8 6.5-2-1 2.4-3.6 3.6-6.5 2z"
        fill="#3fa34d"
      />
    </svg>
  );
}

// The 5-segment progress bar on each card.
function StageTrack({ stage, labels }) {
  return (
    <div className="npw-track" aria-hidden="true">
      {labels.map((label, i) => (
        <span
          key={label}
          title={label}
          style={{ "--s": i }}
          className={
            "npw-seg" + (stage === 4 ? " done" : i <= stage ? " on" : "")
          }
        />
      ))}
    </div>
  );
}

// One bill card.
function BillCard({ bill, followed, onFollow, index = 0 }) {
  const [open, setOpen] = useState(false);
  const labels = steps[bill.level];
  return (
    <article className="npw-card" style={{ "--i": index }}>
      <div className="npw-row">
        <div>
          <div className="npw-num">{bill.number}</div>
          <h3>{bill.title}</h3>
        </div>
        <button
          className="npw-star"
          aria-pressed={followed}
          aria-label={(followed ? "Unfollow " : "Follow ") + bill.title}
          onClick={() => onFollow(bill.id)}
        >
          {followed ? "★" : "☆"}
        </button>
      </div>
      <div className="npw-tags">
        <span className="npw-tag">{bill.topic}</span>
        <span className="npw-tag">{bill.boro}</span>
      </div>
      <p className="npw-sum">{bill.summary}</p>
      <StageTrack stage={bill.stage} labels={labels} />
      <div className="npw-stage">
        Stage {bill.stage + 1} of 5: <b>{labels[bill.stage]}</b>
      </div>
      <button
        className="npw-more"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide details" : "Details"}
      </button>
      {open && (
        <div className="npw-detail">
          <div>
            <b>Sponsor:</b> {bill.sponsor}
          </div>
          <div>
            <b>Next step:</b>{" "}
            {bill.stage < 4 ? labels[bill.stage + 1] : "Becomes law"}
          </div>
          <a href={bill.link} target="_blank" rel="noopener noreferrer">
            Look it up on the official site ↗
          </a>
        </div>
      )}
    </article>
  );
}

function PolicyWatch() {
  const [level, setLevel] = useState("city");
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [boro, setBoro] = useState("all");
  const [follows, toggleFollow] = useFollows();
  const [theme, toggleTheme] = useTheme();

  const levelBills = bills.filter((b) => b.level === level);
  const q = query.toLowerCase();
  const shown = levelBills.filter(
    (b) =>
      (topic === "All" || b.topic === topic) &&
      (boro === "all" || b.boro === boro || b.boro === "Citywide") &&
      (!q ||
        (b.title + b.summary + b.number + b.sponsor).toLowerCase().includes(q))
  );

  return (
    <section
      className="npw"
      id="policy-watch"
      data-level={level}
      data-theme={theme}
    >
      <header className="npw-mast">
        <TorchToggle theme={theme} onToggle={toggleTheme} />
        <div className="npw-mast-inner">
          <div className="npw-mast-text">
            <span className="npw-kicker">
              Project ·{" "}
              {level === "city"
                ? "City Hall, Lower Manhattan"
                : "The Capitol, Albany"}
            </span>
            <h2>
              <span className="npw-hl" key={level}>
                {level === "city" ? "NYC" : "NYS"}
              </span>{" "}
              Policy Watch
            </h2>
            <p>
              Tracking New York City Council and New York State bills on
              housing, health, tech and AI, transit, defense and financial
              services, with plain-English summaries I write myself.
            </p>
            <span className="npw-notice">
              Hand-curated in the Big Apple · updated {lastUpdated}
            </span>
            <div className="npw-tabs" role="tablist" data-active={level}>
              <span className="npw-glider" aria-hidden="true" />
              {[
                ["city", "City Council"],
                ["state", "NY State"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  className="npw-tab"
                  aria-selected={level === key}
                  onClick={() => setLevel(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <dl className="npw-stats">
            <div>
              <dt>Bills tracked</dt>
              <dd key={"t" + levelBills.length}>{levelBills.length}</dd>
            </div>
            <div>
              <dt>Signed into law</dt>
              <dd key={level + "s"}>
                {levelBills.filter((b) => b.stage === 4).length}
              </dd>
            </div>
            <div>
              <dt>You follow</dt>
              <dd key={"f" + follows.size}>{follows.size}</dd>
            </div>
          </dl>
        </div>
        <Skyline />
        <div className="npw-road" aria-hidden="true">
          <TaxiCab />
          <div className="npw-rail" />
        </div>
      </header>

      <div className="npw-body">
        <div className="npw-filterbar">
          <div className="npw-controls">
            <input
              id="npw-search"
              className="npw-search"
              type="search"
              placeholder={
                level === "city"
                  ? "Search Big Apple bills, sponsors, keywords"
                  : "Search Albany bills, sponsors, keywords"
              }
              aria-label="Search bills"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              id="npw-boro"
              className="npw-select"
              aria-label="Filter by borough"
              value={boro}
              onChange={(e) => setBoro(e.target.value)}
            >
              <option value="all">All boroughs</option>
              {BOROUGHS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="npw-chips">
            {["All", ...topics].map((t) => (
              <button
                key={t}
                className="npw-chip"
                aria-pressed={topic === t}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="npw-meta">
          <span>
            {shown.length} bill{shown.length === 1 ? "" : "s"} shown
          </span>
        </div>

        <div className="npw-grid">
          {shown.length ? (
            shown.map((b, i) => (
              <BillCard
                key={level + topic + boro + b.id}
                index={i}
                bill={b}
                followed={follows.has(b.id)}
                onFollow={toggleFollow}
              />
            ))
          ) : (
            <div className="npw-empty">
              No bills match these filters. Even the Big Apple has quiet days.
              Try another sector or clear the search.
            </div>
          )}
        </div>

        <div className="npw-spot">
          <div>
            <span className="npw-kicker npw-muted">Spotlight</span>
            <h3>Local Law 144: NYC's rules for AI in hiring</h3>
          </div>
          <div>
            <p>
              Passed in 2021, this law covers automated tools that employers use
              to screen job candidates. Employers in the city must have these
              tools independently audited for bias each year, publish a summary
              of the results, and tell candidates when a tool is being used.
            </p>
            <p>
              Enforcement began in July 2023. It was one of the first laws in
              the U.S. to regulate AI in hiring, and other cities and states
              have studied it as a model.
            </p>
          </div>
        </div>
      </div>
      <footer className="npw-foot">
        <span className="npw-checker" aria-hidden="true" />
        <span className="npw-foot-text">
          <AppleIcon /> Made in the Big Apple · Data from the NYC Council and NY
          State Legislature
        </span>
      </footer>
    </section>
  );
}

// ─── PART 4: THE PAGE ─────────────────────────────────────
export default function App() {
  return (
    <main>
      <PolicyWatch />
    </main>
  );
}
