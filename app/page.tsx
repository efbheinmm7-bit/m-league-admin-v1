"use client";
import { useState } from "react";

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState("standings");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");

  const [bgColor, setBgColor] = useState("#0f172a"); 
  const [cardBg, setCardBg] = useState("#1e293b");
  const [textColor, setTextColor] = useState("#f8fafc");

  const [standings, setStandings] = useState([
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
  ]);

  const [fixtures, setFixtures] = useState<any[]>([]);

  const teamsList = standings.map(s => s.team);
  const [homeTeam, setHomeTeam] = useState(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState(teamsList[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [goalScorer, setGoalScorer] = useState(""); // ဂိုးသွင်းသူ အမည်အတွက်

  const [newHome, setNewHome] = useState(teamsList[0]);
  const [newAway, setNewAway] = useState(teamsList[1]);
  const [matchDate, setMatchDate] = useState("");

  const handleLogin = () => {
    if (pin === "2364") {
      setIsAdmin(true);
      setActiveTab("live");
    } else {
      alert("PIN နံပါတ် မှားယွင်းနေပါသည်။");
    }
  };

  const addNewFixture = () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    setFixtures([
      { home: newHome, away: newAway, date: matchDate || "သတ်မှတ်ရန်", score: "vs", scorers: "", status: "ယှဉ်ပြိုင်မည်" }, 
      ...fixtures
    ]);
    alert("ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }

    const updatedStandings = standings.map((item) => {
      if (item.team === homeTeam) {
        let w = item.w + (homeScore > awayScore ? 1 : 0);
        let d = item.d + (homeScore === awayScore ? 1 : 0);
        let l = item.l + (homeScore < awayScore ? 1 : 0);
        let gf = item.gf + homeScore;
        let ga = item.ga + awayScore;
        let pts = (w * 3) + (d * 1);
        return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
      }
      if (item.team === awayTeam) {
        let w = item.w + (awayScore > homeScore ? 1 : 0);
        let d = item.d + (awayScore === homeScore ? 1 : 0);
        let l = item.l + (awayScore < homeScore ? 1 : 0);
        let gf = item.gf + awayScore;
        let ga = item.ga + homeScore;
        let pts = (w * 3) + (d * 1);
        return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
      }
      return item;
    });

    updatedStandings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      let gdA = a.gf - a.ga;
      let gdB = b.gf - b.ga;
      return gdB - gdA;
    });

    setStandings(updatedStandings);

    const updatedFixtures = fixtures.map(f => {
      if (f.home === homeTeam && f.away === awayTeam && f.status === "ယှဉ်ပြိုင်မည်") {
        return { ...f, score: `${homeScore} - ${awayScore}`, scorers: goalScorer, status: "ပြီးဆုံး" };
      }
      return f;
    });

    const matchExists = updatedFixtures.some(f => f.home === homeTeam && f.away === awayTeam && f.status === "ပြီးဆုံး");
    if (!matchExists) {
      updatedFixtures.unshift({ home: homeTeam, away: awayTeam, date: "ပြီးဆုံး", score: `${homeScore} - ${awayScore}`, scorers: goalScorer, status: "ပြီးဆုံး" });
    }

    setFixtures(updatedFixtures);
    setGoalScorer(""); // Reset input
    alert("ပွဲရလဒ်နှင့် ဂိုးသွင်းသူများကို သိမ်းဆည်းပြီးပါပြီ။");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", paddingBottom: "70px", transition: "background 0.3s" }}>
      <div style={{ backgroundColor: cardBg, padding: "16px", textAlign: "center", fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>M-League Live</span>
        
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => { setBgColor("#121212"); setCardBg("#1e1e1e"); setTextColor("#f8fafc"); }} style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#121212", border: "2px solid #fff", cursor: "pointer" }}></button>
          <button onClick={() => { setBgColor("#0f172a"); setCardBg("#1e293b"); setTextColor("#f8fafc"); }} style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#0f172a", border: "2px solid #38bdf8", cursor: "pointer" }}></button>
          <button onClick={() => { setBgColor("#f1f5f9"); setCardBg("#ffffff"); setTextColor("#0f172a"); }} style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#ffffff", border: "2px solid #cbd5e1", cursor: "pointer" }}></button>
        </div>
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", marginBottom: "15px" }}>
              <span style={{ color: "#38bdf8" }}>M</span> <span style={{ color: "#ffffff" }}>League 2026-27</span>
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: cardBg, borderRadius: "8px", overflow: "hidden" }}>
                <thead>
                  <tr style={{ backgroundColor: bgColor, textAlign: "left", fontSize: "12px", color: "#94a3b8" }}>
                    <th style={{ padding: "10px" }}>#</th>
                    <th style={{ padding: "10px" }}>Team</th>
                    <th style={{ padding: "10px" }}>P</th>
                    <th style={{ padding: "10px" }}>W</th>
                    <th style={{ padding: "10px" }}>D</th>
                    <th style={{ padding: "10px" }}>L</th>
                    <th style={{ padding: "10px" }}>GD</th>
                    <th style={{ padding: "10px" }}>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, i) => {
                    let gd = s.gf - s.ga;
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #334155", fontSize: "13px" }}>
                        <td style={{ padding: "10px", color: "#94a3b8" }}>{i + 1}</td>
                        <td style={{ padding: "10px", fontWeight: "500" }}>{s.team}</td>
                        <td style={{ padding: "10px" }}>{s.p}</td>
                        <td style={{ padding: "10px" }}>{s.w}</td>
                        <td style={{ padding: "10px" }}>{s.d}</td>
                        <td style={{ padding: "10px" }}>{s.l}</td>
                        <td style={{ padding: "10px" }}>{gd}</td>
                        <td style={{ padding: "10px", fontWeight: "bold", color: "#38bdf8" }}>{s.pts}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "results" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#facc15", marginBottom: "15px" }}>ပွဲပြီးရလဒ်များ (Results)</h2>
            {fixtures.filter(f => f.status === "ပြီးဆုံး").length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "13px" }}>ပြီးဆုံးသော ပွဲစဉ် ရလဒ်များ မရှိသေးပါ။</p>
            ) : (
              fixtures.filter(f => f.status === "ပြီးဆုံး").map((f, i) => (
                <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #334155", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>ပွဲပြီးရလဒ်</span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: "13px", flex: 1, textAlign: "right" }}>{f.home}</strong>
                    <span style={{ fontSize: "16px", fontWeight: "bold", color: "#38bdf8", margin: "0 15px", background: bgColor, padding: "6px 12px", borderRadius: "6px" }}>{f.score}</span>
                    <strong style={{ fontSize: "13px", flex: 1, textAlign: "left" }}>{f.away}</strong>
                  </div>
                  {f.scorers && (
                    <div style={{ marginTop: "8px", fontSize: "12px", color: "#38bdf8", borderTop: "1px dashed #334155", paddingTop: "6px" }}>
                       ဂိုးသွင်းသူ: {f.scorers}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>နောက်လာမည့်ပွဲစဉ်များ</h2>
            {fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "13px" }}>ယှဉ်ပြိုင်ရန် ကျန်ရှိသော ပွဲစဉ် မရှိသေးပါ။</p>
            ) : (
              fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").map((f, i) => (
                <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #334155" }}>
                  <span style={{ fontSize: "11px", color: "#2dd4bf", display: "block", marginBottom: "4px" }}>{f.date}</span>
                  <div style={{ textAlign: "center" }}>
                    <strong style={{ fontSize: "13px" }}>{f.home}</strong> vs <strong style={{ fontSize: "13px" }}>{f.away}</strong>
                    <p style={{ color: "#2dd4bf", marginTop: "5px", fontSize: "12px" }}>ယှဉ်ပြိုင်မည်</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "admin" && !isAdmin && (
          <div style={{ background: cardBg, padding: "20px", borderRadius: "10px", textAlign: "center", border: "1px solid #334155", marginTop: "40px" }}>
            <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>TH</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "15px" }}>ထိန်းချုပ်ရန် Secret PIN ထည့်ပါ</p>
            <input 
              type="password" 
              placeholder="PIN နံပါတ်ထည့်ပါ" 
              value={pin} 
              onChange={(e) => setPin(e.target.value)} 
              style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "14px", marginBottom: "12px", boxSizing: "border-box" }} 
            />
            <button onClick={handleLogin} style={{ width: "100%", padding: "10px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ဝင်မည်</button>
          </div>
        )}

        {activeTab === "live" && isAdmin && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>Admin Live Match Control</h2>
            <div style={{ background: cardBg, padding: "16px", borderRadius: "10px", textAlign: "center", border: "1px solid #334155" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "15px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px", textAlign: "left" }}>Home Team</label>
                  <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "14px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38bdf8", margin: "5px 0" }}>
                  {homeScore} - {awayScore}
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px", textAlign: "left" }}>Away Team</label>
                  <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "14px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#94a3b8", display: "block", marginBottom: "4px", textAlign: "left" }}>ဂိုးသွင်းသည့် ကစားသမားအမည်</label>
                  <input 
                    type="text" 
                    placeholder="ဥပမာ - Aung Thu (12', 45')" 
                    value={goalScorer} 
                    onChange={(e) => setGoalScorer(e.target.value)} 
                    style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }} 
                  />
                </div>
              </div>

              <div style={{ marginTop: "15px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button onClick={() => setHomeScore(homeScore + 1)} style={{ padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home +1</button>
                <button onClick={() => setHomeScore(homeScore > 0 ? homeScore - 1 : 0)} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home -1</button>
                <button onClick={() => setAwayScore(awayScore + 1)} style={{ padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away +1</button>
                <button onClick={() => setAwayScore(awayScore > 0 ? awayScore - 1 : 0)} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away -1</button>
              </div>

              <button onClick={finishMatch} style={{ width: "100%", marginTop: "20px", padding: "12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)</button>
            </div>
          </div>
        )}

        {activeTab === "fixtures" && isAdmin && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>ပွဲစဉ်များ စီမံရန်</h2>
            <div style={{ background: cardBg, padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #334155" }}>
              <h3 style={{ fontSize: "14px", marginBottom: "12px", color: "#38bdf8" }}>ပွဲစဉ်အသစ်နှင့် ရက်စွဲ ထည့်ရန်</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>Home Team</label>
                  <select value={newHome} onChange={(e) => setNewHome(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>Away Team</label>
                  <select value={newAway} onChange={(e) => setNewAway(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>ပွဲစဉ်မည့် ရက်စွဲနှင့် အချိန်</label>
                  <input type="text" placeholder="ဥပမာ - June 10, 5:00 PM" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #475569", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }} />
                </div>
              </div>
              <button onClick={addNewFixture} style={{ width: "100%", padding: "10px", background: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲစဉ်စာရင်းသို့ ထည့်မည်</button>
            </div>

            {fixtures.map((f, i) => (
              <div key={i} style={{ background: cardBg, padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #334155" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#38bdf8", display: "block", marginBottom: "2px" }}>{f.date}</span>
                  <span style={{ fontSize: "13px", display: "block", fontWeight: "bold" }}>{f.home} vs {f.away}</span>
                  <span style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "12px" }}>{f.score} ({f.status})</span>
                  {f.scorers && <span style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}> {f.scorers}</span>}
                </div>
                <button onClick={() => deleteFixture(i)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>ဖျက်မည်</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: cardBg, display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #334155", zIndex: 1000 }}>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#38bdf8" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>Standings</button>
        <button onClick={() => setActiveTab("results")} style={{ background: "none", border: "none", color: activeTab === "results" ? "#facc15" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>Results</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>နောက်လာမည်</button>
        
        {isAdmin ? (
          <>
            <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#38bdf8" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>Live Control</button>
            <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>Edit Fixtures</button>
          </>
        ) : (
          <button onClick={() => setActiveTab("admin")} style={{ background: "none", border: "none", color: activeTab === "admin" ? "#3b82f6" : "#94a3b8", cursor: "pointer", fontWeight: "bold" }}>TH</button>
        )}
      </div>
    </div>
  );
}
