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
  };

  const [standings, setStandings] = useState([
    { team: "Dagon Star United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yangon United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Ayeyawady United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Yadanarbon FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Myawady FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Thitsar Arman FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Shan United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { team: "Hantharwady United FC", p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
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

  const finishMatch = () => {
    setFixtures([{ home: homeTeam, away: awayTeam, score: `${homeScore} - ${awayScore}`, status: "ပြီးဆုံး" }, ...fixtures]);
    alert(`${homeTeam} (${homeScore} - ${awayScore}) ${awayTeam} ပွဲရလဒ်ကို သိမ်းဆည်းပြီးပါပြီ။`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#f8fafc", fontFamily: "sans-serif", paddingBottom: "60px" }}>
      <div style={{ backgroundColor: "#1e1e1e", padding: "16px", textAlign: "center", fontSize: "18px", fontWeight: "bold", borderBottom: "1px solid #333" }}>
        M-League Admin Control
      </div>

      <div style={{ padding: "20px" }}>
        {activeTab === "live" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#22c55e", marginBottom: "15px" }}>Admin Live Match Control</h2>
            <div style={{ background: "#1e1e1e", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "14px" }}>{homeTeam}</p>
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>
                  {homeScore} - {awayScore}
                </div>
                <div>
                  <p style={{ fontWeight: "bold", fontSize: "14px" }}>{awayTeam}</p>
                </div>
              </div>
              <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => setHomeScore(homeScore + 1)} style={{ padding: "8px 12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px" }}>Home +1</button>
                <button onClick={() => setAwayScore(awayScore + 1)} style={{ padding: "8px 12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px" }}>Away +1</button>
              </div>
              <button onClick={finishMatch} style={{ width: "100%", marginTop: "20px", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px", fontWeight: "bold" }}>ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)</button>
            </div>
          </div>
        )}

        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#c084fc", marginBottom: "15px" }}>အမှတ်ပေးဇယား (Standings)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e1e" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #333", textAlign: "left", fontSize: "12px", color: "#94a3b8" }}>
                    <th style={{ padding: "10px" }}>Team</th>
                    <th style={{ padding: "10px" }}>P</th>
                    <th style={{ padding: "10px" }}>W</th>
                    <th style={{ padding: "10px" }}>D</th>
                    <th style={{ padding: "10px" }}>L</th>
                    <th style={{ padding: "10px" }}>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #262626", fontSize: "13px" }}>
                      <td style={{ padding: "10px" }}>{s.team}</td>
                      <td style={{ padding: "10px" }}>{s.p}</td>
                      <td style={{ padding: "10px" }}>{s.w}</td>
                      <td style={{ padding: "10px" }}>{s.d}</td>
                      <td style={{ padding: "10px" }}>{s.l}</td>
                      <td style={{ padding: "10px", fontWeight: "bold", color: "#22c55e" }}>{s.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "fixtures" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>ပွဲစဉ်များ စီမံရန်</h2>
            {fixtures.map((f, i) => (
              <div key={i} style={{ background: "#1e1e1e", padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{f.home} vs {f.away}</span>
                <span style={{ color: "#22c55e", fontWeight: "bold" }}>{f.score} ({f.status})</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>နောက်လာမည့်ပွဲစဉ်များ</h2>
            {fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").map((f, i) => (
              <div key={i} style={{ background: "#1e1e1e", padding: "15px", marginBottom: "10px", borderRadius: "8px", textAlign: "center" }}>
                <strong>{f.home}</strong> vs <strong>{f.away}</strong>
                <p style={{ color: "#2dd4bf", marginTop: "5px", fontSize: "12px" }}>ယှဉ်ပြိုင်မည်</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#1e1e1e", display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer" }}>Live</button>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer" }}>Standings</button>
        <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer" }}>Fixtures</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#888", cursor: "pointer" }}>နောက်လာမည်</button>
      </div>
    </div>
  );
}
