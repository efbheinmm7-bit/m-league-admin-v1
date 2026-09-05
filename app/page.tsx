"use client";
import { useState } from "react";

interface TeamStanding {
  team: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  pts: number;
}

interface Fixture {
  home: string;
  away: string;
  date: string;
  score: string;
  status: "ယှဉ်ပြိုင်မည်" | "ပြီးဆုံး";
}

const INITIAL_TEAMS = [
  "Dagon Star United FC", "Yangon United FC", "Ayeyawady United FC",
  "Yadanarbon FC", "Myawady FC", "Thitsar Arman FC",
  "Yangon City FC", "Shan United FC", "I.S.P.E FC",
  "Chinland FC", "Hantharwady United FC", "Sagaing United FC"
];

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState("standings");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");

  const [standings] = useState<TeamStanding[]>(
    INITIAL_TEAMS.map((team) => ({ team, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }))
  );
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  // Admin Live Control States
  const [homeTeam, setHomeTeam] = useState(INITIAL_TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState(INITIAL_TEAMS[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Next Match Input States
  const [nextHome, setNextHome] = useState(INITIAL_TEAMS[0]);
  const [nextAway, setNextAway] = useState(INITIAL_TEAMS[1]);
  const [nextDate, setNextDate] = useState("");

  const handleLogin = () => {
    if (pin === "2364") {
      setIsAdmin(true);
      setActiveTab("live");
      setPin("");
    } else {
      alert("PIN မှားယွင်းနေပါသည်။");
    }
  };

  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အသင်းနှစ်သင်း တူနေ၍မရပါ။");
      return;
    }

    setFixtures((prev) => [
      { home: homeTeam, away: awayTeam, date: "ပြီးဆုံး", score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" },
      ...prev,
    ]);

    setHomeScore(0);
    setAwayScore(0);
    alert("ပွဲပြီးရလဒ် သိမ်းဆည်းပြီးပါပြီ။");
  };

  // Next Match ထည့်သွင်းသည့် Logic
  const addNextMatch = () => {
    if (nextHome === nextAway) {
      alert("အသင်းနှစ်သင်း တူနေ၍မရပါ။");
      return;
    }
    if (!nextDate) {
      alert("ရက်စွဲနှင့် အချိန် ထည့်ပေးပါ။");
      return;
    }

    setFixtures((prev) => [
      ...prev,
      { home: nextHome, away: nextAway, date: nextDate, score: "VS", status: "ယှဉ်ပြိုင်မည်" }
    ]);

    setNextDate("");
    alert("လာမည့်ပွဲစဉ် ထည့်သွင်းပြီးပါပြီ။");
  };

  // Status အလိုက် ခွဲထုတ်ခြင်း
  const completedMatches = fixtures.filter((f) => f.status === "ပြီးဆုံး");
  const upcomingMatches = fixtures.filter((f) => f.status === "ယှဉ်ပြိုင်မည်");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#f8fafc", fontFamily: "sans-serif", paddingBottom: "70px" }}>
      <div style={{ backgroundColor: "#1e1e1e", padding: "16px", textAlign: "center", fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #333" }}>
        M-League Live
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Standings Tab */}
        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", marginBottom: "15px", color: "#3b82f6" }}>M-League Table</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e1e", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ backgroundColor: "#121212", textAlign: "left", fontSize: "12px", color: "#94a3b8" }}>
                  <th style={{ padding: "10px" }}>#</th>
                  <th style={{ padding: "10px" }}>Team</th>
                  <th style={{ padding: "10px" }}>P</th>
                  <th style={{ padding: "10px" }}>GD</th>
                  <th style={{ padding: "10px" }}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s, i) => (
                  <tr key={s.team} style={{ borderBottom: "1px solid #2a2a2a", fontSize: "13px" }}>
                    <td style={{ padding: "10px", color: "#888" }}>{i + 1}</td>
                    <td style={{ padding: "10px" }}>{s.team}</td>
                    <td style={{ padding: "10px" }}>{s.p}</td>
                    <td style={{ padding: "10px" }}>{s.gf - s.ga}</td>
                    <td style={{ padding: "10px", fontWeight: "bold", color: "#22c55e" }}>{s.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Upcoming Matches Tab */}
        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>လာမည့် ပွဲစဉ်များ</h2>
            {upcomingMatches.length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>လာမည့်ပွဲစဉ်များ မရှိသေးပါ။</p>
            ) : (
              upcomingMatches.map((f, i) => (
                <div key={i} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #333" }}>
                  <div style={{ fontSize: "11px", color: "#38bdf8", marginBottom: "6px", textAlign: "center" }}>{f.date}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", flex: 1, textAlign: "right" }}>{f.home}</span>
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: "#fff", margin: "0 10px", background: "#333", padding: "4px 8px", borderRadius: "4px" }}>VS</span>
                    <span style={{ fontSize: "13px", flex: 1, textAlign: "left" }}>{f.away}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#facc15", marginBottom: "15px" }}>ပွဲပြီးရလဒ်များ</h2>
            {completedMatches.length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>ပွဲရလဒ်များ မရှိသေးပါ။</p>
            ) : (
              completedMatches.map((f, i) => (
                <div key={i} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", flex: 1, textAlign: "right" }}>{f.home}</span>
                  <span style={{ fontSize: "15px", fontWeight: "bold", color: "#22c55e", margin: "0 10px", background: "#121212", padding: "4px 8px", borderRadius: "4px" }}>{f.score}</span>
                  <span style={{ fontSize: "13px", flex: 1, textAlign: "left" }}>{f.away}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Admin Login */}
        {activeTab === "admin" && !isAdmin && (
          <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "10px", textAlign: "center", border: "1px solid #333", marginTop: "30px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Admin Login</h3>
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ width: "100%", padding: "10px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "6px", marginBottom: "12px", boxSizing: "border-box" }}
            />
            <button onClick={handleLogin} style={{ width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              ဝင်မည်
            </button>
          </div>
        )}

        {/* Admin Control */}
        {activeTab === "live" && isAdmin && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Live Score Section */}
            <div style={{ background: "#1e1e1e", padding: "16px", borderRadius: "10px", border: "1px solid #333" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                <h2 style={{ fontSize: "15px", color: "#22c55e", margin: 0 }}>Match Update</h2>
                <button onClick={() => setIsAdmin(false)} style={{ padding: "4px 8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", fontSize: "12px" }}>Logout</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "4px" }}>
                  {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "#22c55e", margin: "5px 0" }}>
                  {homeScore} - {awayScore}
                </div>

                <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "4px" }}>
                  {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                <button onClick={() => setHomeScore(s => s + 1)} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px" }}>Home +1</button>
                <button onClick={() => setAwayScore(s => s + 1)} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px" }}>Away +1</button>
              </div>

              <button onClick={finishMatch} style={{ width: "100%", marginTop: "15px", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
                ပွဲသိမ်းမည်
              </button>
            </div>

            {/* Next Match Input Section */}
            <div style={{ background: "#1e1e1e", padding: "16px", borderRadius: "10px", border: "1px solid #333" }}>
              <h2 style={{ fontSize: "15px", color: "#38bdf8", marginTop: 0, marginBottom: "15px" }}>Next Match ထည့်ရန်</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#888" }}>Home Team</label>
                  <select value={nextHome} onChange={(e) => setNextHome(e.target.value)} style={{ width: "100%", padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "4px", marginTop: "4px" }}>
                    {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#888" }}>Away Team</label>
                  <select value={nextAway} onChange={(e) => setNextAway(e.target.value)} style={{ width: "100%", padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "4px", marginTop: "4px" }}>
                    {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#888" }}>ရက်စွဲနှင့် အချိန်</label>
                  <input
                    type="text"
                    placeholder="ဥပမာ - 15 Oct, 4:00 PM"
                    value={nextDate}
                    onChange={(e) => setNextDate(e.target.value)}
                    style={{ width: "100%", padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "4px", marginTop: "4px", boxSizing: "border-box" }}
                  />
                </div>

                <button onClick={addNextMatch} style={{ width: "100%", marginTop: "5px", padding: "10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                   Next Match သိမ်းမည်
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e1e1e", display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", fontWeight: "bold" }}>Standings</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#38bdf8" : "#888", fontWeight: "bold" }}>Upcoming</button>
        <button onClick={() => setActiveTab("results")} style={{ background: "none", border: "none", color: activeTab === "results" ? "#facc15" : "#888", fontWeight: "bold" }}>Results</button>
        {isAdmin ? (
          <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", fontWeight: "bold" }}>Live Admin</button>
        ) : (
          <button onClick={() => setActiveTab("admin")} style={{ background: "none", border: "none", color: activeTab === "admin" ? "#3b82f6" : "#888", fontWeight: "bold" }}>Admin</button>
        )}
      </div>
    </div>
  );
}

