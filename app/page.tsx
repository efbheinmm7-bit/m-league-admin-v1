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
            style={{ width: "100%", padding:

