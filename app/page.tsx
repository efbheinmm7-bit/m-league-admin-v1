"use client";
import { useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// -------------------------------------------------------------
// ၁။ သင့်ရဲ့ Firebase အချက်အလက်များကို ဤနေရာတွင် ထည့်ပါ
// -------------------------------------------------------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase Initialize လုပ်ခြင်း
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState("standings");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("");

  const [bgColor, setBgColor] = useState("#0f172a"); 
  const [cardBg, setCardBg] = useState("#1e293b");
  const [textColor, setTextColor] = useState("#f8fafc");

  const defaultStandings = [
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

  const [standings, setStandings] = useState(defaultStandings);
  const [fixtures, setFixtures] = useState<any[]>([]);

  // ပွဲချိန် (မိနစ်နှင့် စက္ကန့်)
  const [matchMinutes, setMatchMinutes] = useState(0);
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // -------------------------------------------------------------
  // ၂။ Firebase Realtime Database မှ အချက်အလက်များကို အချိန်နှင့်တစ်ပြေးညီ ဖတ်ရှုခြင်း
  // -------------------------------------------------------------
  useEffect(() => {
    const standingsRef = ref(db, "mleague/standings");
    const unsubscribeStandings = onValue(standingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setStandings(data);
    });

    const fixturesRef = ref(db, "mleague/fixtures");
    const unsubscribeFixtures = onValue(fixturesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setFixtures(data);
    });

    return () => {
      unsubscribeStandings();
      unsubscribeFixtures();
    };
  }, []);

  // Timer logic အတွက် useEffect
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

  const teamsList = standings.map(s => s.team);
  const [homeTeam, setHomeTeam] = useState(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState(teamsList[1]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [goalScorer, setGoalScorer] = useState("");

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

  const addNewFixture = async () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အသင်းအဝေး အသင်းတူနေ၍မရပါ။");
      return;
    }
    const updatedFixtures = [
      { home: newHome, away: newAway, date: matchDate || "သတ်မှတ်ရန်", score: "0 - 0", time: "00:00", scorers: "", status: "ယှဉ်ပြိုင်မည်" }, 
      ...fixtures
    ];
    await set(ref(db, "mleague/fixtures"), updatedFixtures);
    alert("ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = async (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    await set(ref(db, "mleague/fixtures"), updated

