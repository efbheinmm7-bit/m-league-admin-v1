"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("live");
  
  const teamLogos: { [key: string]: string } = {
    'Yangon United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Yangon_United_FC_logo.svg/220px-Yangon_United_FC_logo.svg.png',
    'Shan United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Shan_United_FC_logo.png/220px-Shan_United_FC_logo.png',
    'Myawady FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Myawady_FC_logo.png/220px-Myawady_FC_logo.png',
    'Dagon Star United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Dagon_FC.png/180px-Dagon_FC.png',
    'Ayeyawady United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Ayeyawady_United_FC_logo.png/220px-Ayeyawady_United_FC_logo.png',
    'Yadanarbon FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Yadanarbon_FC_logo.png/220px-Yadanarbon_FC_logo.png',
    'Thitsar Arman FC': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Thitsar_Arman_FC_logo.png/220px-Thitsar_Arman_FC_logo.png',
    'Hantharwady United FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Hantharwady_United_FC_logo.png/220px-Hantharwady_United_FC_logo.png',
    'Yangon City FC': '',
    'I.S.P.E FC': '',
    'Chinland FC': '',
    'Sagaing United FC': '',
  };

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

  const [fixtures, setFixtures] = useState([
    { home: "Thitsar Arman FC", away: "Myawady FC", score: "2 - 2", status: "ပြီးဆုံး" },
    { home: "Chinland FC", away: "Yadanarbon FC", score: "1 - 2", status: "ပြီးဆုံး" },
    { home: "Yangon United FC", away: "Shan United FC", score: "vs", status: "ယှဉ်ပြိုင်မည်" },
  ]);

  const teamsList = standings.map(s => s.team);
  const [homeTeam, setHomeTeam] = useState(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState(teamsList[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  // Auto Update Standings when match finishes
  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }

    // Update Standings Logic
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

    // Sort by Points, then Goal Difference (GD)
    updatedStandings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      let gdA = a.gf - a.ga;
      let gdB = b.gf - b.ga;
      return gdB - gdA;
    });

    setStandings(updatedStandings);
    setFixtures([{ home: homeTeam, away: awayTeam, score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" }, ...fixtures]);
    alert(`${homeTeam} (${homeScore} - ${awayScore}) ${awayTeam} ပွဲရလဒ်ကို သိမ်းဆည်းပြီး အမှတ်ပေးဇယားသို့ အလိုအလျောက် ထည့်သွင်းပြီးပါပြီ။`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#f8fafc", fontFamily: "sans-serif", paddingBottom: "70px" }}>
      <div style={{ backgroundColor: "#1e1e1e", padding: "16px", textAlign: "center", fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #333" }}>
        M-League Admin Control
      </div>

      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "live" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#22c55e", marginBottom: "15px" }}>Admin Live Match Control</h2>
            <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "10px", textAlign: "center", border: "1px solid #333" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", gap: "10px" }}>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Home Team</label>
                  <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ width: "100%", padding: "8px", background: "#262626", color: "#fff", border: "1px solid #444", borderRadius: "6px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e", marginTop: "15px" }}>
                  {homeScore} - {awayScore}
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Away Team</label>
                  <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ width: "100%", padding: "8px", background: "#262626", color: "#fff", border: "1px solid #444", borderRadius: "6px" }}>
                    {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setHomeScore(homeScore + 1)} style={{ padding: "8px 14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Home +1</button>
                <button onClick={() => setHomeScore(homeScore > 0 ? homeScore - 1 : 0)} style={{ padding: "8px 14px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Home -1</button>
                <button onClick={() => setAwayScore(awayScore + 1)} style={{ padding: "8px 14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Away +1</button>
                <button onClick={() => setAwayScore(awayScore > 0 ? awayScore - 1 : 0)} style={{ padding: "8px 14px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Away -1</button>
              </div>

              <button onClick={finishMatch} style={{ width: "100%", marginTop: "20px", padding: "12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)</button>
            </div>
          </div>
        )}

        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#c084fc", marginBottom: "15px" }}>အမှတ်ပေးဇယား (Standings)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e1e", borderRadius: "8px", overflow: "hidden" }}>
                <thead>
                  <tr style={{ backgroundColor: "#262626", textAlign: "left", fontSize: "12px", color: "#94a3b8" }}>
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
                        <td style={{ padding: "10px", fontWeight: "500" }}>{s.team}</td>
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
            {fixtures.map((f, i) => (
              <div key={i} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333" }}>
                <span style={{ fontSize: "13px" }}>{f.home} vs {f.away}</span>
                <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "13px" }}>{f.score} ({f.status})</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>နောက်လာမည့်ပွဲစဉ်များ</h2>
            {fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>ယှဉ်ပြိုင်ရန် ကျန်ရှိသော ပွဲစဉ် မရှိသေးပါ။</p>
            ) : (
              fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").map((f, i) => (
                <div key={i} style={{ background: "#1e1e1e", padding: "15px", marginBottom: "10px", borderRadius: "8px", textAlign: "center", border: "1px solid #333" }}>
                  <strong style={{ fontSize: "13px" }}>{f.home}</strong> vs <strong style={{ fontSize: "13px" }}>{f.away}</strong>
                  <p style={{ color: "#2dd4bf", marginTop: "5px", fontSize: "12px" }}>ယှဉ်ပြိုင်မည်</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e1e1e", display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer", fontWeight: "bold" }}>Live</button>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer", fontWeight: "bold" }}>Standings</button>
        <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer", fontWeight: "bold" }}>Fixtures</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#888", cursor: "pointer", fontWeight: "bold" }}>နောက်လာမည်</button>
      </div>
    </div>
  );
}
