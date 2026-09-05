"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const ADMIN_SECRET_PASSWORD = "1234";

  const [activeTab, setActiveTab] = useState("live");
  
  const [bgColor, setBgColor] = useState("#121212"); 
  const [cardBg, setCardBg] = useState("#1e1e1e");
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

  const [liveMatches, setLiveMatches] = useState([
    { homeTeam: teamsList[0], awayTeam: teamsList[1], homeScore: 0, awayScore: 0, events: [], eventInput: "", eventTeam: "Home", eventType: " ဂိုး" },
    { homeTeam: teamsList[2], awayTeam: teamsList[3], homeScore: 0, awayScore: 0, events: [], eventInput: "", eventTeam: "Home", eventType: " ဂိုး" },
    { homeTeam: teamsList[4], awayTeam: teamsList[5], homeScore: 0, awayScore: 0, events: [], eventInput: "", eventTeam: "Home", eventType: " ဂိုး" },
    { homeTeam: teamsList[6], awayTeam: teamsList[7], homeScore: 0, awayScore: 0, events: [], eventInput: "", eventTeam: "Home", eventType: " ဂိုး" },
  ]);

  const [newHome, setNewHome] = useState(teamsList[0]);
  const [newAway, setNewAway] = useState(teamsList[1]);
  const [matchDate, setMatchDate] = useState("");

  // အမှားပြင်ဆင်ပြီး (hand လို့ရေးထားတာကို handleLogin လို့ပြောင်းလိုက်သည်)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_SECRET_PASSWORD) {
      setIsAdminAuthenticated(true);
    } else {
      alert("စကားဝှက် မှားယွင်းနေပါသည်။");
    }
  };

  const updateMatchField = (index: number, field: string, value: any) => {
    const updated = [...liveMatches];
    updated[index] = { ...updated[index], [field]: value };
    setLiveMatches(updated);
  };

  const addMatchEvent = (index: number) => {
    const match = liveMatches[index];
    if (!match.eventInput.trim()) return;
    const teamName = match.eventTeam === "Home" ? match.homeTeam : match.awayTeam;
    const detail = `${teamName} | ${match.eventType}: ${match.eventInput.trim()}`;
    
    const updated = [...liveMatches];
    updated[index].events = [...updated[index].events, detail];
    updated[index].eventInput = "";
    setLiveMatches(updated);
  };

  const deleteMatchEvent = (matchIndex: number, eventIndex: number) => {
    const updated = [...liveMatches];
    updated[matchIndex].events = updated[matchIndex].events.filter((_, i) => i !== eventIndex);
    setLiveMatches(updated);
  };

  // အမှားပြင်ဆင်ပြီး (setFixtures ထဲမှာ လိုအပ်တာတွေ ဖြည့်စွက်ပေးထားသည်)
  const addNewFixture = () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    setFixtures([
      { home: newHome, away: newAway, date: matchDate || "သတ်မှတ်ရန်", score: "vs", status: "ယှဉ်ပြိုင်မည်", events: [] }, 
      ...fixtures
    ]);
    alert("ပွဲစဉ်အသစ်နှင့် ရက်စွဲကို ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  const finishMatch = (index: number) => {
    const match = liveMatches[index];
    if (match.homeTeam === match.awayTeam) {
      alert(`ပွဲစဉ် (${index + 1}) - အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။`);
      return;
    }

    const updatedStandings = standings.map((item) => {
      if (item.team === match.homeTeam) {
        let w = item.w + (match.homeScore > match.awayScore ? 1 : 0);
        let d = item.d + (match.homeScore === match.awayScore ? 1 : 0);
        let l = item.l + (match.homeScore < match.awayScore ? 1 : 0);
        let gf = item.gf + match.homeScore;
        let ga = item.ga + match.awayScore;
        let pts = (w * 3) + (d * 1);
        return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
      }
      if (item.team === match.awayTeam) {
        let w = item.w + (match.awayScore > match.homeScore ? 1 : 0);
        let d = item.d + (match.awayScore === match.homeScore ? 1 : 0);
        let l = item.l + (match.awayScore < match.homeScore ? 1 : 0);
        let gf = item.gf + match.awayScore;
        let ga = item.ga + match.homeScore;
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
      { home: match.homeTeam, away: match.awayTeam, date: "ပြီးဆုံး", score: `${match.homeScore} - ${match.awayScore}`, status: "ပြီးဆုံး", events: match.events }, 
      ...fixtures
    ]);

    alert(`ပွဲစဉ် (${index + 1}) - ${match.homeTeam} (${match.homeScore} - ${match.awayScore}) ${match.awayTeam} ပွဲရလဒ်ကို သိမ်းဆည်းပြီးပါပြီ။`);
  };

  if (!isAdminAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#121212", color: "#f8fafc", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", fontFamily: "sans-serif" }}>
        <form onSubmit={handleLogin} style={{ background: "#1e1e1e", padding: "24px", borderRadius: "10px", width: "100%", maxWidth: "350px", border: "1px solid #333", textAlign: "center" }}>
          <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "16px" }}> Admin Login Required</h2>
          <p style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>ဤနေရာကို Admin တစ်ဦးတည်းသာ ထိန်းချုပ်ခွင့်ရှိသည်။</p>
          <input 
            type="password" 
            placeholder="Admin Password ထည့်ပါ" 
            value={adminPasswordInput} 
            onChange={(e) => setAdminPasswordInput(e.target.value)} 
            style={{ width: "100%", padding: "10px", background: "#121212", color: "#fff", border: "1px solid #444", borderRadius: "6px", marginBottom: "12px", fontSize: "14px", boxSizing: "border-box" }} 
          />
          <button type="submit" style={{ width: "100%", padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ဝင်မည်</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: bgColor, color: textColor, fontFamily: "sans-serif", paddingBottom: "70px", transition: "background 0.3s" }}>
      <div style={{ backgroundColor: cardBg, padding: "12px 16px", textAlign: "center", fontSize: "15px", fontWeight: "bold", borderBottom: "1px solid #333", color: "#ffffff" }}>
        <span style={{ color: "#38bdf8" }}>M</span> League One (Admin Control)
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {activeTab === "live" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#22c55e", marginBottom: "15px" }}>Admin Live Match Control (ပွဲစဉ် ၄ ခု)</h2>
            
            {liveMatches.map((match, index) => (
              <div key={index} style={{ background: cardBg, padding: "16px", borderRadius: "10px", marginBottom: "20px", border: "1px solid #333" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold", color: "#38bdf8", marginBottom: "10px", borderBottom: "1px solid #333", paddingBottom: "6px" }}>
                  ပွဲစဉ် - {index + 1}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>Home Team</label>
                    <select value={match.homeTeam} onChange={(e) => updateMatchField(index, "homeTeam", e.target.value)} style={{ width: "100%", padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div style={{ fontSize: "22px", fontWeight: "bold", color: "#22c55e", textAlign: "center", margin: "4px 0" }}>
                    {match.homeScore} - {match.awayScore}
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>Away Team</label>
                    <select value={match.awayTeam} onChange={(e) => updateMatchField(index, "awayTeam", e.target.value)} style={{ width: "100%", padding: "8px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                      {teamsList.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => updateMatchField(index, "homeScore", match.homeScore + 1)} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>Home +1</button>
                    <button onClick={() => updateMatchField(index, "homeScore", match.homeScore > 0 ? match.homeScore - 1 : 0)} style={{ padding: "8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>Home -1</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button onClick={() => updateMatchField(index, "awayScore", match.awayScore + 1)} style={{ padding: "8px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>Away +1</button>
                    <button onClick={() => updateMatchField(index, "awayScore", match.awayScore > 0 ? match.awayScore - 1 : 0)} style={{ padding: "8px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>Away -1</button>
                  </div>
                </div>

                <div style={{ textAlign: "left", borderTop: "1px solid #333", paddingTop: "12px" }}>
                  <label style={{ fontSize: "12px", color: "#38bdf8", display: "block", marginBottom: "6px", fontWeight: "bold" }}> ဂိုး/ကတ်ပြစ်ဒဏ် ထည့်ရန်</label>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                    <select value={match.eventTeam} onChange={(e) => updateMatchField(index, "eventTeam", e.target.value)} style={{ padding: "6px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "4px", fontSize: "11px" }}>
                      <option value="Home">Home</option>
                      <option value="Away">Away</option>
                    </select>

                    <select value={match.eventType} onChange={(e) => updateMatchField(index, "eventType", e.target.value)} style={{ padding: "6px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "4px", fontSize: "11px" }}>
                      <option value=" ဂိုး"> ဂိုး</option>
                      <option value=" အဝါကတ်"> အဝါကတ်</option>
                      <option value=" အနီကတ်"> အနီကတ်</option>
                    </select>

                    <input 
                      type="text" 
                      placeholder="အမည်/မိနစ်" 
                      value={match.eventInput} 
                      onChange={(e) => updateMatchField(index, "eventInput", e.target.value)} 
                      style={{ flex: 1, padding: "6px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "4px", fontSize: "11px" }} 
                    />
                    <button onClick={() => addMatchEvent(index)} style={{ padding: "6px 10px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "11px" }}>ထည့်</button>
                  </div>

                  {match.events.length > 0 && (
                    <div style={{ background: "#18181b", padding: "6px", borderRadius: "4px", marginTop: "6px" }}>
                      {match.events.map((ev: string, evIdx: number) => (
                        <div key={evIdx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", padding: "3px 0", borderBottom: evIdx !== match.events.length - 1 ? "1px solid #27272a" : "none" }}>
                          <span>{ev}</span>
                          <button onClick={() => deleteMatchEvent(index, evIdx)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "10px" }}>ဖျက်</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={() => finishMatch(index)} style={{ width: "100%", marginTop: "15px", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#ffffff", marginBottom: "15px" }}>Standings</h2>
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
                  <input type="text" placeholder="ဥပမာ - June 10, 5:00 PM" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }} />
                </div>
              </div>
              <button onClick={addNewFixture} style={{ width: "100%", padding: "10px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ပွဲစဉ်စာရင်းသို့ ထည့်မည်</button>
            </div>

            {fixtures.map((f, i) => (
              <div key={i} style={{ background: cardBg, padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #333" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#38bdf8", display: "block", marginBottom: "2px" }}> {f.date}</span>
                    <span style={{ fontSize: "13px", display: "block", fontWeight: "bold" }}>{f.home} vs {f.away}</span>
                    <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "12px" }}>{f.score} ({f.status})</span>
                  </div>
                  <button onClick={() => deleteFixture(i)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>ဖျက်မည်</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>နောက်လာမည့်ပွဲစဉ်များ</h2>
            {fixtures.filter(f => f.status === "ယှဉ်ပြိုင်မည်").map((f, i) => (
              <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #333", textAlign: "center" }}>
                <span style={{ fontSize: "11px", color: "#2dd4bf", display: "block", marginBottom: "4px" }}> {f.date}</span>
                <strong style={{ fontSize: "13px" }}>{f.home}</strong> vs <strong style={{ fontSize: "13px" }}>{f.away}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: cardBg, display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #333" }}>
        <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer", fontWeight: "bold" }}>Live</button>
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer", fontWeight: "bold" }}>Standings</button>
        <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer", fontWeight: "bold" }}>Fixtures</button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#888", cursor: "pointer", fontWeight: "bold" }}>နောက်လာမည်</button>
      </div>
    </div>
  );
}
