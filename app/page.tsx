"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("live");
  
  const [bgColor, setBgColor] = useState("#121212"); 
  const [cardBg, setCardBg] = useState("#1e1e1e");
  const [textColor, setTextColor] = useState("#f8fafc");

  const [standings, setStandings] = useState([
    { team: "Dagon Star United FC", color: "#f59e0b", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yangon United FC", color: "#ef4444", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Ayeyawady United FC", color: "#3b82f6", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yadanarbon FC", color: "#eab308", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Myawady FC", color: "#10b981", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Thitsar Arman FC", color: "#8b5cf6", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yangon City FC", color: "#06b6d4", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Shan United FC", color: "#ec4899", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "I.S.P.E FC", color: "#6366f1", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Chinland FC", color: "#14b8a6", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Hantharwady United FC", color: "#f97316", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Sagaing United FC", color: "#84cc16", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ]);

  const [fixtures, setFixtures] = useState<any[]>([]);

  const teamsList = standings.map(s => s.team);
  
  // Live Match အတွက် လက်ရှိ ထိန်းချုပ်နေသော အသင်းများနှင့် ဂိုးများ
  const [homeTeam, setHomeTeam] = useState(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState(teamsList[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [newHome, setNewHome] = useState(teamsList[0]);
  const [newAway, setNewAway] = useState(teamsList[1]);
  const [matchDate, setMatchDate] = useState("");

  const getTeamColor = (teamName: string) => {
    const found = standings.find(s => s.team === teamName);
    return found ? found.color : "#ffffff";
  };

  // Team Badge Component (အသင်းပုံစံ တံဆိပ်လေး)
  const TeamBadge = ({ teamName }: { teamName: string }) => {
    const color = getTeamColor(teamName);
    return (
      <span style={{ 
        backgroundColor: color, 
        color: "#000", 
        padding: "2px 6px", 
        borderRadius: "4px", 
        fontSize: "10px", 
        fontWeight: "bold",
        textTransform: "uppercase",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.3)",
        display: "inline-block"
      }}>
        {teamName.split(" ")[0]}
      </span>
    );
  };

  const addNewFixture = () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    setFixtures([
      { 
        home: newHome, 
        away: newAway, 
        date: matchDate || "သတ်မှတ်ရန်", 
        score: "vs", 
        status: "ယှဉ်ပြိုင်မည်" 
      }, 
      ...fixtures
    ]);
    alert("ပွဲစဉ်အသစ်နှင့် ရက်စွဲကို ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  const startLiveMatch = (home: string, away: string) => {
    setHomeTeam(home);
    setAwayTeam(away);
    setHomeScore(0);
    setAwayScore(0);
    setActiveTab("live");
    alert(`${home} vs ${away} ပွဲစဉ်ကို Live Control သို့ တင်လိုက်ပါပြီ။`);
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
    setFixtures([
      { home: homeTeam, away: awayTeam, date: "ပြီးဆုံး", score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" }, 
      ...fixtures
    ]);
    alert(`${homeTeam} (${homeScore} - ${awayScore}) ${awayTeam} ပွဲရလဒ်ကို သိမ်းဆည်းပြီး အမှတ်ပေးဇယားသို့ အလိုအလျောက် ထည့်သွင်းပြီးပါပြီ။`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", paddingBottom: "70px", transition: "background 0.3s" }}>
      {/* Header Bar */}
      <div style={{ backgroundColor: cardBg, padding: "12px 16px", textAlign: "center", fontSize: "15px", fontWeight: "bold", borderBottom: "1px solid #333" }}>
        <span style={{ color: "#38bdf8" }}>M</span> League One
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "live" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#22c55e", marginBottom: "15px" }}>Admin Live Match Control</h2>
            <div style={{ background: cardBg, padding: "16px", borderRadius: "10px", textAlign: "center", border: "1px solid #333" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "15px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>Home Team</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: getTeamColor(homeTeam) }}></span>
                    <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "14px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e", margin: "5px 0" }}>
                  {homeScore} - {awayScore}
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>Away Team</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: getTeamColor(awayTeam) }}></span>
                    <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "14px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "15px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button onClick={() => setHomeScore(homeScore + 1)} style={{ padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home +1</button>
                <button onClick={() => setHomeScore(homeScore > 0 ? homeScore - 1 : 0)} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home -1</button>
                <button onClick={() => setAwayScore(awayScore + 1)} style={{ padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away +1</button>
                <button onClick={() => setAwayScore(awayScore > 0 ? awayScore - 1 : 0)} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away -1</button>
              </div>

              <button onClick={finishMatch} style={{ width: "100%", marginTop: "20px", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)</button>
            </div>
          </div>
        )}

        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#c084fc", marginBottom: "15px" }}>M League 2026-27</h2>
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
                      <tr key={i} style={{ borderBottom: "1px solid #2a2a2a", fontSize: "13px" }}>
                        <td style={{ padding: "10px", color: "#888" }}>{i + 1}</td>
                        <td style={{ padding: "10px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
                          <TeamBadge teamName={s.team} />
                          <span>{s.team}</span>
                        </td>
                        <td style={{ padding: "10px" }}>{s.p}</td>
                        <td style={{ padding: "10px" }}>{s.w}</td>
                        <td style={{ padding: "10px" }}>{s.d}</td>
                        <td style={{ padding: "10px" }}>{s.l}</td>
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

        {activeTab === "fixtures" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>ပွဲစဉ်များ စီမံရန်</h2>
            
            <div style={{ background: cardBg, padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #333" }}>
              <h3 style={{ fontSize: "14px", marginBottom: "12px", color: "#38bdf8" }}>ပွဲစဉ်အသစ် ထည့်ရန်</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Home Team</label>
                  <select value={newHome} onChange={(e) => setNewHome(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Away Team</label>
                  <select value={newAway} onChange={(e) => setNewAway(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>ပွဲစဉ်မည့် ရက်စွဲနှင့် အချိန်</label>
                  <input 
                    type="text" 
                    placeholder="ဥပမာ - June 10, 5:00 PM" 
                    value={matchDate} 
                    onChange={(e) => setMatchDate(e.target.value)} 
                    style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }} 
                  />
                </div>
              </div>

              <button onClick={addNewFixture} style={{ width: "100%", padding: "10px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲစဉ်စာရင်းသို့ ထည့်မည်</button>
            </div>

            {fixtures.length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px", textAlign: "center" }}>ပွဲစဉ်များ မရှိသေးပါ။ အထက်ပါပုံစံမှတဆင့် ပွဲစဉ်အသစ် ထည့်ပါ။</p>
            ) : (
              fixtures.map((f, i) => (
                <div key={i} style={{ background: cardBg, padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#38bdf8", display: "block", marginBottom: "2px" }}> {f.date}</span>
                    <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold", margin: "3px 0" }}>
                      <TeamBadge teamName={f.home} />
                      <span>{f.home}</span>
                      <span style={{ color: "#888", fontWeight: "normal" }}>vs</span>
                      <TeamBadge teamName={f.away} />
                      <span>{f.away}</span>
                    </div>
                    <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "12px" }}>{f.score} ({f.status})</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: "6px" }}>
                    {f.status === "ယှဉ်ပြိုင်မည်" && (
                      <button onClick={() => startLiveMatch(f.home, f.away)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>Live ထိန်းမည်</button>
                    )}
                    <button onClick={() => deleteFixture(i)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>ဖျက်မည်</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>နောက်လာမည့်ပွဲစဉ်များ</h2>
            {fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>ယှဉ်ပြိုင်ရန် ကျန်ရှိသော ပွဲစဉ် မရှိသေးပါ။</p>
            ) : (
              fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").map((f, i) => (
                <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#2dd4bf", display: "block", marginBottom: "4px" }}> {f.date}</span>
                    <div style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
                      <TeamBadge teamName={f.home} />
                      <span>{f.home}</span>
                      <span style={{ color: "#888", fontWeight: "normal" }}>vs</span>
                      <TeamBadge teamName={f.away} />
                      <span>{f.away}</span>
                    </div>
                    <p style={{ color: "#2dd4bf", marginTop: "5px", fontSize: "12px" }}>ယှဉ်ပြိုင်မည်</p>
                  </div>
                  <button onClick={() => startLiveMatch(f.home, f.away)} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: "bold" }}>Live ထိန်းမည်</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: cardBg, display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer", fontWeight: "bold" }}>Live</button>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer", fontWeight: "bold" }}>Standings</button>
        <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer", fontWeight: "bold" }}>Fixtures</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#888", cursor: "pointer", fontWeight: "bold" }}>နောက်လာမည်</button>
      </div>
    </div>
  );
}

