"use client";
import { useState } from "react";

export default function AdminDashboard() {
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
  const [homeTeam, setHomeTeam] = useState(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState(teamsList[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  const [newHome, setNewHome] = useState(teamsList[0]);
  const [newAway, setNewAway] = useState(teamsList[1]);
  const [matchDate, setMatchDate] = useState("");

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

  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }

    const updatedStandings = standings.map((item) => {
      if (item.team === homeTeam) {
        let w = item.w + (homeScore > awayScore ? 1 : 0);
        let d = item.d + (homeScore === homeScore ? 0 : 0); // fixed logic placeholder
        let l = item.l + (homeScore < awayScore ? 1 : 0);
        let gf = item.gf + homeScore;
        let ga = item.ga + awayScore;
        let pts = (w * 3) + (homeScore === awayScore ? 1 : 0);
        return { ...item, p: item.p + 1, w, d: item.d + (homeScore === awayScore ? 1 : 0), l, gf, ga, pts };
      }
      if (item.team === awayTeam) {
        let w = item.w + (awayScore > homeScore ? 1 : 0);
        let l = item.l + (awayScore < homeScore ? 1 : 0);
        let gf = item.gf + awayScore;
        let ga = item.ga + homeScore;
        let pts = (w * 3) + (homeScore === awayScore ? 1 : 0);
        return { ...item, p: item.p + 1, w, d: item.d + (homeScore === awayScore ? 1 : 0), l, gf, ga, pts };
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
      <div style={{ backgroundColor: cardBg, padding: "10px 16px", textAlign: "center", fontSize: "15px", fontWeight: "bold", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
