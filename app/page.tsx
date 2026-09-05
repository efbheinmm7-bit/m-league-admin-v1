"use client";
import { useState, useEffect } from "react";

interface TeamStanding {
  team: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number;
}

interface Fixture {
  id: string; home: string; away: string; date: string; time: string; score: string; status: "ယှဉ်ပြိုင်မည်" | "ပြီးဆုံး";
}

const INITIAL_TEAMS = [
  "Dagon Star United FC", "Yangon United FC", "Ayeyawady United FC", "Yadanarbon FC", 
  "Myawady FC", "Thitsar Arman FC", "Yangon City FC", "Shan United FC", 
  "I.S.P.E FC", "Chinland FC", "Hantharwady United FC", "Sagaing United FC"
];

const DEFAULT_STANDINGS: TeamStanding[] = INITIAL_TEAMS.map((team) => ({
  team, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0
}));

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState("standings");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");

  // LocalStorage မှ ဒေတာများ စတင်ဖတ်ယူခြင်း
  const [standings, setStandings] = useState<TeamStanding[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mleague_standings");
      if (saved) return JSON.parse(saved);
    }
    return DEFAULT_STANDINGS;
  });

  const [fixtures, setFixtures] = useState<Fixture[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mleague_fixtures");
      if (saved) return JSON.parse(saved);
    }
    return [
      { id: "1", home: "Yangon United FC", away: "Shan United FC", date: "2026-09-10", time: "15:30", score: "VS", status: "ယှဉ်ပြိုင်မည်" }
    ];
  });

  // Standings ဒေတာပြောင်းလဲတိုင်း LocalStorage သို့ Auto Save လုပ်ခြင်း
  useEffect(() => {
    localStorage.setItem("mleague_standings", JSON.stringify(standings));
  }, [standings]);

  // Fixtures ဒေတာပြောင်းလဲတိုင်း LocalStorage သို့ Auto Save လုပ်ခြင်း
  useEffect(() => {
    localStorage.setItem("mleague_fixtures", JSON.stringify(fixtures));
  }, [fixtures]);

  const [homeTeam, setHomeTeam] = useState(INITIAL_TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState(INITIAL_TEAMS[1]);
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("15:30");
  const [selectedFixtureId, setSelectedFixtureId] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const handleLogin = () => {
    if (pin === "2364") { setIsAdmin(true); setActiveTab("live"); setPin(""); } 
    else alert("PIN မှားယွင်းနေပါသည်။");
  };

  const addNextMatch = () => {
    if (homeTeam === awayTeam) return alert("အသင်းနှစ်သင်း တူနေ၍မရပါ။");
    if (!matchDate) return alert("ရက်စွဲ ရွေးချယ်ပေးပါ။");

    setFixtures((prev) => [...prev, {
      id: Date.now().toString(), home: homeTeam, away: awayTeam, date: matchDate, time: matchTime, score: "VS", status: "ယှဉ်ပြိုင်မည်"
    }]);
    alert("ပွဲစဉ်အသစ် ထည့်ပြီးပါပြီ။");
  };

  const finishMatch = () => {
    if (homeTeam === awayTeam) return alert("အသင်းနှစ်သင်း တူနေ၍မရပါ။");

    setStandings((prev) => prev.map((item) => {
      const isHome = item.team === homeTeam;
      const isAway = item.team === awayTeam;
      if (!isHome && !isAway) return item;

      const myScore = isHome ? homeScore : awayScore;
      const oppScore = isHome ? awayScore : homeScore;
      const w = item.w + (myScore > oppScore ? 1 : 0);
      const d = item.d + (myScore === oppScore ? 1 : 0);
      const l = item.l + (myScore < oppScore ? 1 : 0);

      return { ...item, p: item.p + 1, w, d, l, gf: item.gf + myScore, ga: item.ga + oppScore, pts: w * 3 + d };
    }).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga)));

    setFixtures((prev) => selectedFixtureId 
      ? prev.map((f) => f.id === selectedFixtureId ? { ...f, score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" } : f)
      : [{ id: Date.now().toString(), home: homeTeam, away: awayTeam, date: "ပြီးဆုံး", time: "", score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" }, ...prev]
    );

    setHomeScore(0); setAwayScore(0); setSelectedFixtureId("");
    alert("ပွဲပြီးရလဒ် သိမ်းပြီးပါပြီ။");
  };

  // ဒေတာအားလုံးကို Reset လုပ်ပြီး မူလအတိုင်း ပြန်စရန်
  const resetAllData = () => {
    if (confirm("ဒေတာများအားလုံးကို မူလအတိုင်း Reset လုပ်မှာ သေချာပါသလား?")) {
      localStorage.removeItem("mleague_standings");
      localStorage.removeItem("mleague_fixtures");
      setStandings(DEFAULT_STANDINGS);
      setFixtures([]);
      alert("ဒေတာအားလုံးကို Reset လုပ်ပြီးပါပြီ။");
    }
  };

  const upcoming = fixtures.filter((f) => f.status === "ယှဉ်ပြိုင်မည်");
  const completed = fixtures.filter((f) => f.status === "ပြီးဆုံး");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#f8fafc", fontFamily: "sans-serif", paddingBottom: "70px" }}>
      <div style={{ backgroundColor: "#1e1e1e", padding: "16px", textAlign: "center", fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #333" }}>
        M-League Live
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "standings" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e1e", borderRadius: "8px" }}>
              <thead>
                <tr style={{ backgroundColor: "#121212", fontSize: "12px", color: "#94a3b8" }}>
                  <th style={{ padding: "8px", textAlign: "left" }}>#</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Team</th>
                  <th style={{ padding: "8px" }}>P</th>
                  <th style={{ padding: "8px" }}>W</th>
                  <th style={{ padding: "8px" }}>D</th>
                  <th style={{ padding: "8px" }}>L</th>
                  <th style={{ padding: "8px" }}>GD</th>
                  <th style={{ padding: "8px" }}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s, i) => (
                  <tr key={s.team} style={{ borderBottom: "1px solid #2a2a2a", fontSize: "13px", textAlign: "center" }}>
                    <td style={{ padding: "8px", textAlign: "left", color: "#888" }}>{i + 1}</td>
                    <td style={{ padding: "8px", textAlign: "left" }}>{s.team}</td>
                    <td style={{ padding: "8px" }}>{s.p}</td>
                    <td style={{ padding: "8px" }}>{s.w}</td>
                    <td style={{ padding: "8px" }}>{s.d}</td>
                    <td style={{ padding: "8px" }}>{s.l}</td>
                    <td style={{ padding: "8px" }}>{s.gf - s.ga}</td>
                    <td style={{ padding: "8px", fontWeight: "bold", color: "#22c55e" }}>{s.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "next" && (
          <div>
            {upcoming.length === 0 ? <p style={{ color: "#888" }}>ပွဲစဉ်များ မရှိသေးပါ။</p> : upcoming.map((f) => (
              <div key={f.id} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "8px", borderRadius: "8px", border: "1px solid #333", textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>{f.date} | {f.time}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                  <span style={{ flex: 1, textAlign: "right" }}>{f.home}</span>
                  <span style={{ margin: "0 10px", color: "#38bdf8", fontWeight: "bold" }}>VS</span>
                  <span style={{ flex: 1, textAlign: "left" }}>{f.away}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "results" && (
          <div>
            {completed.length === 0 ? <p style={{ color: "#888" }}>ရလဒ်များ မရှိသေးပါ။</p> : completed.map((f) => (
              <div key={f.id} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "8px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ flex: 1, textAlign: "right" }}>{f.home}</span>
                <span style={{ fontWeight: "bold", color: "#22c55e", margin: "0 10px" }}>{f.score}</span>
                <span style={{ flex: 1, textAlign: "left" }}>{f.away}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "admin" && !isAdmin && (
          <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
            <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} style={{ width: "100%", padding: "8px", background: "#121212", color: "#fff", border: "1px solid #444", marginBottom: "10px" }} />
            <button onClick={handleLogin} style={{ width: "100%", padding: "8px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "4px" }}>ဝင်မည်</button>
          </div>
        )}

        {activeTab === "live" && isAdmin && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#1e1e1e", padding: "12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#38bdf8", marginBottom: "8px" }}>+ Next Match</div>
              <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ width: "100%", padding: "6px", background: "#121212", color: "#fff", marginBottom: "6px" }}>
                {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ width: "100%", padding: "6px", background: "#121212", color: "#fff", marginBottom: "6px" }}>
                {INITIAL_TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <div style={{ display: "flex", gap: "6px" }}>
                <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} style={{ flex: 1, padding: "6px", background: "#121212", color: "#fff" }} />
                <input type="time" value={matchTime} onChange={(e) => setMatchTime(e.target.value)} style={{ flex: 1, padding: "6px", background: "#121212", color: "#fff" }} />
              </div>
              <button onClick={addNextMatch} style={{ width: "100%", marginTop: "8px", padding: "6px", background: "#0284c7", color: "#fff", border: "none" }}>ထည့်မည်</button>
            </div>

            <div style={{ background: "#1e1e1e", padding: "12px", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#22c55e", fontWeight: "bold" }}>Match Result</span>
                <button onClick={() => setIsAdmin(false)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "2px 6px", fontSize: "12px" }}>Logout</button>
              </div>
              {upcoming.length > 0 && (
                <select value={selectedFixtureId} onChange={(e) => {
                  const f = upcoming.find(x => x.id === e.target.value);
                  if (f) { setSelectedFixtureId(f.id); setHomeTeam(f.home); setAwayTeam(f.away); }
                }} style={{ width: "100%", padding: "6px", background: "#121212", color: "#fff", marginBottom: "8px" }}>
                  <option value="">-- ရွေးပါ --</option>
                  {upcoming.map(f => <option key={f.id} value={f.id}>{f.home} vs {f.away}</option>)}
                </select>
              )}
              <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", color: "#22c55e" }}>{homeScore} - {awayScore}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", margin: "8px 0" }}>
                <button onClick={() => setHomeScore(s => s + 1)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px" }}>Home +1</button>
                <button onClick={() => setAwayScore(s => s + 1)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px" }}>Away +1</button>
              </div>
              <button onClick={finishMatch} style={{ width: "100%", padding: "8px", background: "#2563eb", color: "#fff", border: "none" }}>ပွဲသိမ်းမည်</button>
            </div>

            {/* Reset Data Button */}
            <button onClick={resetAllData} style={{ background: "#7f1d1d", color: "#fca5a5", border: "none", padding: "8px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
              ⚠️ Reset All Data (ဒေတာများ မူလအတိုင်း ပြန်စမည်)
            </button>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e1e1e", display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888" }}>Table</button>
        <button onClick={() => setActiveTab("next")} style={{ background: "none", border: "none", color: activeTab === "next" ? "#38bdf8" : "#888" }}>Next</button>
        <button onClick={() => setActiveTab("results")} style={{ background: "none", border: "none", color: activeTab === "results" ? "#facc15" : "#888" }}>Results</button>
        <button onClick={() => setActiveTab(isAdmin ? "live" : "admin")} style={{ background: "none", border: "none", color: activeTab === "live" || activeTab === "admin" ? "#22c55e" : "#888" }}>Admin</button>
      </div>
    </div>
  );
}
