"use client";
import { useState, useEffect } from "react";

export default function FootballApp() {
  // Authentication State for Admin
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const ADMIN_PIN = "1234"; // လိုအပ်သလို PIN နံပါတ်ပြောင်းနိုင်သည်

  // App Navigation: "public" (ပရိသတ်ကြည့်ရန်) or "admin" (ကိုယ့်အတွက် ထိန်းချုပ်ရန်)
  const [appMode, setAppMode] = useState("public");
  const [activeTab, setActiveTab] = useState("live");
  
  const bgColor = "#121212"; 
  const cardBg = "#1e1e1e";
  const textColor = "#f8fafc";

  // Initial Standings Data
  const initialStandings = [
    { team: "Dagon Star United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yangon United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Ayeyawady United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yadanarbon FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Myawady FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Thitsar Arman FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yangon City FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Shan United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "I.S.P.E FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Chinland FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Hantharwady United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Sagaing United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ];

  // Load from localStorage if available
  const [standings, setStandings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("m_league_standings");
      return saved ? JSON.parse(saved) : initialStandings;
    }
    return initialStandings;
  });

  const [fixtures, setFixtures] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("m_league_fixtures");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [liveMatch, setLiveMatch] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("m_league_live");
      return saved ? JSON.parse(saved) : { home: "Dagon Star United FC", away: "Yangon United FC", homeScore: 0, awayScore: 0, status: "ယှဉ်ပြိုင်ဆဲ" };
    }
    return { home: "Dagon Star United FC", away: "Yangon United FC", homeScore: 0, awayScore: 0, status: "ယှဉ်ပြိုင်ဆဲ" };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("m_league_standings", JSON.stringify(standings));
  }, [standings]);

  useEffect(() => {
    localStorage.setItem("m_league_fixtures", JSON.stringify(fixtures));
  }, [fixtures]);

  useEffect(() => {
    localStorage.setItem("m_league_live", JSON.stringify(liveMatch));
  }, [liveMatch]);

  const teamsList = standings.map((s: any) => s.team);
  const [newHome, setNewHome] = useState(teamsList[0]);
  const [newAway, setNewAway] = useState(teamsList[1]);
  const [matchDate, setMatchDate] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setAppMode("admin");
    } else {
      alert("PIN နံပါတ် မှားယွင်းနေပါသည်။");
    }
  };

  const addNewFixture = () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    const updated = [
      { home: newHome, away: newAway, date: matchDate || "သတ်မှတ်ရန်", score: "vs", status: "ယှဉ်ပြိုင်မည်" },
      ...fixtures
    ];
    setFixtures(updated);
    alert("ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  const finishMatch = () => {
    if (liveMatch.home === liveMatch.away) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }

    const updatedStandings = standings.map((item: any) => {
      if (item.team === liveMatch.home) {
        let w = item.w + (liveMatch.homeScore > liveMatch.awayScore ? 1 : 0);
        let d = item.d + (liveMatch.homeScore === liveMatch.awayScore ? 1 : 0);
        let l = item.l + (liveMatch.homeScore < liveMatch.awayScore ? 1 : 0);
        let gf = item.gf + liveMatch.homeScore;
        let ga = item.ga + liveMatch.awayScore;
        let pts = (w * 3) + (d * 1);
        return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
      }
      if (item.team === liveMatch.away) {
        let w = item.w + (liveMatch.awayScore > liveMatch.homeScore ? 1 : 0);
        let d = item.d + (liveMatch.awayScore === liveMatch.homeScore ? 1 : 0);
        let l = item.l + (liveMatch.awayScore < liveMatch.homeScore ? 1 : 0);
        let gf = item.gf + liveMatch.awayScore;
        let ga = item.ga + liveMatch.homeScore;
        let pts = (w * 3) + (d * 1);
        return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
      }
      return item;
    });

    updatedStandings.sort((a: any, b: any) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      let gdA = a.gf - a.ga;
      let gdB = b.gf - b.ga;
      return gdB - gdA;
    });

    setStandings(updatedStandings);
    setFixtures([
      { home: liveMatch.home, away: liveMatch.away, date: "ပြီးဆုံး", score: `${liveMatch.homeScore} - ${liveMatch.awayScore}`, status: "ပြီးဆုံး" },
      ...fixtures
    ]);
    setLiveMatch({ ...liveMatch, status: "ပြီးဆုံးပါပြီ" });
    alert("ပွဲသိမ်းဆည်းပြီး အမှတ်ပေးဇယားသို့ အလိုအလျောက် ထည့်သွင်းပြီးပါပြီ။");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", paddingBottom: "70px" }}>
      {/* Top Bar with Mode Switcher */}
      <div style={{ backgroundColor: cardBg, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #333" }}>
        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
          <span style={{ color: "#38bdf8" }}>M</span> League One {appMode === "admin" && "(Admin)"}
        </div>
        <div>
          {appMode === "public" ? (
            <button onClick={() => setAppMode("login")} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>Admin ဝင်ရန်</button>
          ) : (
            <button onClick={() => { setAppMode("public"); setIsAuthenticated(false); }} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>Public သို့ ပြန်သွားရန်</button>
          )}
        </div>
      </div>

      {/* Login Screen for Admin */}
      {appMode === "login" && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh", padding: "16px" }}>
          <form onSubmit={handleLogin} style={{ background: cardBg, padding: "24px", borderRadius: "10px", width: "100%", maxWidth: "350px", border: "1px solid #333", textAlign: "center" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "16px", color: "#38bdf8" }}>Admin Login</h2>
            <input 
              type="password" 
              placeholder="PIN နံပါတ်ထည့်ပါ (1234)" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              style={{ width: "100%", padding: "12px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "16px", marginBottom: "15px", boxSizing: "border-box", textAlign: "center" }}
            />
            <button type="submit" style={{ width: "100%", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>လော့ဂ်အင်ဝင်မည်</button>
          </form>
        </div>
      )}

      {/* Main Content (Public & Admin View) */}
      {appMode !== "login" && (
        <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
          
          {/* LIVE TAB */}
          {activeTab === "live" && (
            <div>
              <h2 style={{ fontSize: "16px", color: "#22c55e", marginBottom: "15px" }}>Live Match</h2>
              <div style={{ background: cardBg, padding: "20px", borderRadius: "10px", textAlign: "center", border: "1px solid #333" }}>
                
                {appMode === "admin" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
                    <select value={liveMatch.home} onChange={(e) => setLiveMatch({...liveMatch, home: e.target.value})} style={{ padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                    <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e" }}>{liveMatch.homeScore} - {liveMatch.awayScore}</div>
                    <select value={liveMatch.away} onChange={(e) => setLiveMatch({...liveMatch, away: e.target.value})} style={{ padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
                      <button onClick={() => setLiveMatch({...liveMatch, homeScore: liveMatch.homeScore + 1})} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Home +1</button>
                      <button onClick={() => setLiveMatch({...liveMatch, homeScore: liveMatch.homeScore > 0 ? liveMatch.homeScore - 1 : 0})} style={{ padding: "8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Home -1</button>
                      <button onClick={() => setLiveMatch({...liveMatch, awayScore: liveMatch.awayScore + 1})} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Away +1</button>
                      <button onClick={() => setLiveMatch({...liveMatch, awayScore: liveMatch.awayScore > 0 ? liveMatch.awayScore - 1 : 0})} style={{ padding: "8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Away -1</button>
                    </div>

                    <button onClick={finishMatch} style={{ marginTop: "15px", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲသိမ်းမည် (Standings သို့ ပို့မည်)</button>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: "11px", color: "#22c55e", fontWeight: "bold", background: "rgba(34, 197, 94, 0.1)", padding: "4px 8px", borderRadius: "4px" }}> {liveMatch.status}</span>
                    <div style={{ fontSize: "15px", fontWeight: "bold", margin: "15px 0" }}>
                      {liveMatch.home} <span style={{ color: "#22c55e", fontSize: "22px", margin: "0 10px" }}>{liveMatch.homeScore} - {liveMatch.awayScore}</span> {liveMatch.away}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STANDINGS TAB */}
          {activeTab === "standings" && (
            <div>
              <h2 style={{ fontSize: "16px", color: "#c084fc", marginBottom: "15px" }}>အမှတ်ပေးဇယား</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", background: cardBg, borderRadius: "8px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ backgroundColor: bgColor, textAlign: "left", fontSize: "12px", color: "#94a3b8" }}>
                      <th style={{ padding: "10px" }}>#</th>
                      <th style={{ padding: "10px" }}>Team</th>
                      <th style={{ padding: "10px" }}>P</th>
                      <th style={{ padding: "10px" }}>GD</th>
                      <th style={{ padding: "10px" }}>PTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((s: any, i: number) => {
                      let gd = s.gf - s.ga;
                      return (
                        <tr key={i} style={{ borderBottom: "1px solid #2a2a2a", fontSize: "13px" }}>
                          <td style={{ padding: "10px", color: "#888" }}>{i + 1}</td>
                          <td style={{ padding: "10px", fontWeight: "500" }}>{s.team}</td>
                          <td style={{ padding: "10px" }}>{s.p}</td>
                          <td style={{ padding: "10px" }}>{gd}</td>
                          <td style={{ padding: "10px", fontWeight: "bold", color: "#22c55e" }}>{s.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FIXTURES TAB */}
          {activeTab === "fixtures" && (
            <div>
              <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>ပွဲစဉ်များနှင့် ရလဒ်များ</h2>
              
              {appMode === "admin" && (
                <div style={{ background: cardBg, padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #333" }}>
                  <h3 style={{ fontSize: "14px", marginBottom: "10px", color: "#38bdf8" }}>ပွဲစဉ်အသစ် ထည့်ရန်</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px" }}>
                    <select value={newHome} onChange={(e) => setNewHome(e.target.value)} style={{ padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px" }}>
                      {teamsList.map((t: string, i: number) => <option key={i} value={t}>{t}</option>)}
                    </select>
                    <select value={newAway} onChange={(e) => setNewAway(e.target.value)} style={{ padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px" }}>
                      {teamsList.map((t: string, i: number) => <option key={i} value={t}>{t}</option>)}
                    </select>
                    <input type="text" placeholder="ရက်စွဲ (ဥပမာ - June 10)" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} style={{ padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px" }} />
                  </div>
                  <button onClick={addNewFixture} style={{ width: "100%", padding: "8px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ထည့်မည်</button>
                </div>
              )}

              {fixtures.length === 0 ? (
                <p style={{ color: "#888", fontSize: "13px", textAlign: "center" }}>ပွဲစဉ်များ မရှိသေးပါ။</p>
              ) : (
                fixtures.map((f, i) => (
                  <div key={i} style={{ background: cardBg, padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333" }}>
                    <div>
                      <span style={{ fontSize: "11px", color: "#38bdf8", display: "block" }}>{f.date}</span>
                      <span style={{ fontSize: "13px", fontWeight: "bold", display: "block" }}>{f.home} vs {f.away}</span>
                      <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "12px" }}>{f.score} ({f.status})</span>
                    </div>
                    {appMode === "admin" && (
                      <button onClick={() => deleteFixture(i)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>ဖျက်မည်</button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      )}

      {/* Bottom Navigation */}
      {appMode !== "login" && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: cardBg, display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
          <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer", fontWeight: "bold" }}>Live</button>
          <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer", fontWeight: "bold" }}>Standings</button>
          <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer", fontWeight: "bold" }}>Fixtures</button>
        </div>
      )}
    </div>
  );
}
