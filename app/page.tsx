"use client";
import { useState, useEffect } from "react";

interface Team {
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
  time: string;
  scorers: string;
  status: string;
}

const initialTeams: Team[] = [
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

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState<string>("standings");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");

  const [bgColor, setBgColor] = useState<string>("#0f172a"); 
  const [cardBg, setCardBg] = useState<string>("#1e293b");
  const [textColor, setTextColor] = useState<string>("#f8fafc");

  const [standings, setStandings] = useState<Team[]>(initialTeams);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  const [matchMinutes, setMatchMinutes] = useState<number>(0);
  const [matchSeconds, setMatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const teamsList = standings.map((s) => s.team);
  const [homeTeam, setHomeTeam] = useState<string>(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState<string>(teamsList[1]);
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [goalScorer, setGoalScorer] = useState<string>("");

  const [newHome, setNewHome] = useState<string>(teamsList[0]);
  const [newAway, setNewAway] = useState<string>(teamsList[1]);
  const [matchDate, setMatchDate] = useState<string>("");

  // Load from localStorage safely on client mount
  useEffect(() => {
    setIsClient(true);
    const savedStandings = localStorage.getItem("mleague_standings");
    if (savedStandings) {
      try {
        setStandings(JSON.parse(savedStandings));
      } catch (e) {
        console.error(e);
      }
    }

    const savedFixtures = localStorage.getItem("mleague_fixtures");
    if (savedFixtures) {
      try {
        setFixtures(JSON.parse(savedFixtures));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setMatchSeconds((prevSec) => {
          if (prevSec === 59) {
            setMatchMinutes((prevMin) => prevMin + 1);
            return 0;
          }
          return prevSec + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("mleague_standings", JSON.stringify(standings));
    }
  }, [standings, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("mleague_fixtures", JSON.stringify(fixtures));
    }
  }, [fixtures, isClient]);

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
      { home: newHome, away: newAway, date: matchDate || "သတ်မှတ်ရန်", score: "0 - 0", time: "00:00", scorers: "", status: "ယှဉ်ပြိုင်မည်" },
      ...fixtures,
    ]);
    alert("ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  const getLiveCalculatedStandings = () => {
    let tempStandings: Team[] = JSON.parse(JSON.stringify(standings));
    tempStandings = tempStandings.map((item) => {
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

    tempStandings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      let gdA = a.gf - a.ga;
      let gdB = b.gf - b.ga;
      return gdB - gdA;
    });

    return tempStandings;
  };

  const setMatchLive = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    const timeString = `${String(matchMinutes).padStart(2, '0')}:${String(matchSeconds).padStart(2, '0')}`;

    const updatedFixtures = fixtures.map((f) => {
      if (f.home === homeTeam && f.away === awayTeam) {
        return { ...f, score: `${homeScore} - ${awayScore}`, time: timeString, scorers: goalScorer, status: "Live" };
      }
      return f;
    });

    const matchExists = updatedFixtures.some((f) => f.home === homeTeam && f.away === awayTeam);
    if (!matchExists) {
      updatedFixtures.unshift({ home: homeTeam, away: awayTeam, date: "ယခုကန်နေဆဲ", score: `${homeScore} - ${awayScore}`, time: timeString, scorers: goalScorer, status: "Live" });
    }

    setFixtures(updatedFixtures);
    setIsTimerRunning(true);
    alert("Live ပွဲစဉ် စတင်လိုက်ပါပြီ။");
  };

  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }

    setIsTimerRunning(false);
    const updatedStandings = getLiveCalculatedStandings();
    setStandings(updatedStandings);

    const updatedFixtures = fixtures.map((f) => {
      if (f.home === homeTeam && f.away === awayTeam) {
        return { ...f, score: `${homeScore} - ${awayScore}`, time: "FT", scorers: goalScorer, status: "ပြီးဆုံး" };
      }
      return f;
    });

    setFixtures(updatedFixtures);
    setGoalScorer("");
    setMatchMinutes(0);
    setMatchSeconds(0);
    alert("ပွဲသိမ်းပြီးဖြစ်၍ အမှတ်ပေးဇယားသို့ တရားဝင် အပ်ဒိတ်လုပ်ပြီးပါပြီ။");
  };

  if (!isClient) return null;

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
              <span style={{ color: "#38bdf8" }}>M</span> <span style={{ color: textColor }}>League 2026-27</span>
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
            {fixtures.filter(f => f.status === "Live").length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "16px", color: "#ef4444", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                   <span>တိုက်ရိုက်ယှဉ်ပြိုင်နေဆဲ (LIVE)</span>
                </h2>
                {fixtures.filter(f => f.status === "Live").map((f, i) => (
                  <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "2px solid #ef4444", textAlign: "center" }}>
                    <span style={{ fontSize: "12px", color: "#ef4444", fontWeight: "bold", display: "block", marginBottom: "6px", background: "rgba(239, 68, 68, 0.1)", padding: "3px", borderRadius: "4px" }}>
                       ပွဲချိန်: {f.time || "00:00"} မိနစ်
                    </span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: "13px", flex: 1, textAlign: "right" }}>{f.home}</strong>
                      <span style={{ fontSize: "18px", fontWeight: "bold", color: "#ef4444", margin: "0 15px", background: bgColor, padding: "6px 14px", borderRadius: "6px" }}>{f.score}</span>
                      <strong style={{ fontSize: "13px", flex: 1, textAlign: "left" }}>{f.away}</strong>
                    </div>
                    {f.scorers && (
                      <div style={{ marginTop: "8px", fontSize: "12px", color: "#38bdf8", borderTop: "1px dashed #334155", paddingTop: "6px" }}>
                         ဂိုးသွင်းသူ: {f.scorers}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <h2 style={{ fontSize: "16px", color: "#facc15", marginBottom: "15px" }}>ပွဲပြီးရလဒ်များ (Results)</h2>
            {fixtures.filter(f => f.status === "ပြီးဆုံး").length === 0 ? (
              <p style={{ color: "#94a3b8", fontSize: "13px" }}>ပြီးဆုံးသော ပွဲစဉ် ရလဒ်များ မရှိသေးပါ။</p>
            ) : (
              fixtures.filter(f => f.status === "ပြီးဆုံး").map((f, i) => (
                <div key={i} style={{ background: cardBg, padding: "15px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #334155", textAlign: "center" }}>
                  <span style={{
