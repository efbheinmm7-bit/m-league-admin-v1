"use client";
import { useState } from "react";

// Types သတ်မှတ်ခြင်း
interface TeamStanding {
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
  status: "ယှဉ်ပြိုင်မည်" | "ပြီးဆုံး";
}

export default function MLeagueApp() {
  const [activeTab, setActiveTab] = useState<string>("standings");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");

  // Theme Colors
  const [bgColor, setBgColor] = useState<string>("#121212");
  const [cardBg, setCardBg] = useState<string>("#1e1e1e");
  const [textColor, setTextColor] = useState<string>("#f8fafc");

  // Initial Standings
  const [standings, setStandings] = useState<TeamStanding[]>([
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

  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const teamsList = standings.map((s) => s.team);
  const [homeTeam, setHomeTeam] = useState<string>(teamsList[0]);
  const [awayTeam, setAwayTeam] = useState<string>(teamsList[1]);
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [matchMinute, setMatchMinute] = useState<string>("1'");

  const [newHome, setNewHome] = useState<string>(teamsList[0]);
  const [newAway, setNewAway] = useState<string>(teamsList[1]);
  const [matchDate, setMatchDate] = useState<string>("");

  const handleLogin = () => {
    if (pin === "2364") {
      setIsAdmin(true);
      setActiveTab("live");
      setPin("");
    } else {
      alert("PIN နံပါတ် မှားယွင်းနေပါသည်။");
    }
  };

  const addNewFixture = () => {
    if (newHome === newAway) {
      alert("အိမ်ကွင်းနှင့် အဝေးကွင်း အသင်းတူနေ၍မရပါ။");
      return;
    }
    setFixtures([
      {
        home: newHome,
        away: newAway,
        date: matchDate || "သတ်မှတ်ရန်",
        score: "vs",
        status: "ယှဉ်ပြိုင်မည်",
      },
      ...fixtures,
    ]);
    setMatchDate("");
    alert("ပွဲစဉ်အသစ် ထည့်သွင်းပြီးပါပြီ။");
  };

  const deleteFixture = (index: number) => {
    const updated = fixtures.filter((_, i) => i !== index);
    setFixtures(updated);
  };

  // Live Standings တွက်ချက်ခြင်း
  const getLiveStandings = () => {
    let tempStandings = standings.map((item) => ({ ...item }));

    // Admin မုဒ်တွင် Live ပွဲစဉ် ရလဒ်များကို ခေတ္တပေါင်းစပ်ပြသပေးခြင်း
    if (isAdmin && homeTeam !== awayTeam) {
      tempStandings = tempStandings.map((item) => {
        if (item.team === homeTeam) {
          const w = item.w + (homeScore > awayScore ? 1 : 0);
          const d = item.d + (homeScore === awayScore ? 1 : 0);
          const l = item.l + (homeScore < awayScore ? 1 : 0);
          const gf = item.gf + homeScore;
          const ga = item.ga + awayScore;
          const pts = w * 3 + d * 1;
          return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
        }
        if (item.team === awayTeam) {
          const w = item.w + (awayScore > homeScore ? 1 : 0);
          const d = item.d + (awayScore === homeScore ? 1 : 0);
          const l = item.l + (awayScore < homeScore ? 1 : 0);
          const gf = item.gf + awayScore;
          const ga = item.ga + homeScore;
          const pts = w * 3 + d * 1;
          return { ...item, p: item.p + 1, w, d, l, gf, ga, pts };
        }
        return item;
      });
    }

    // ရမှတ်နှင့် ဂိုးကွာခြားချက်အလိုက် စီစဉ်ခြင်း
    tempStandings.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      const gdA = a.gf - a.ga;
      const gdB = b.gf - b.ga;
      return gdB - gdA;
    });

    return tempStandings;
  };

  // ပွဲသိမ်းဆည်းခြင်း
  const finishMatch = () => {
    if (homeTeam === awayTeam) {
      alert("အိမ်ကွင်းနှင့် အဝေးကွင်း အသင်းတူနေ၍မရပါ။");
      return;
    }

    const finalUpdated = getLiveStandings();
    setStandings(finalUpdated);

    const updatedFixtures = fixtures.map((f) => {
      if (
        f.home === homeTeam &&
        f.away === awayTeam &&
        f.status === "ယှဉ်ပြိုင်မည်"
      ) {
        return {
          ...f,
          score: `${homeScore} - ${awayScore}`,
          status: "ပြီးဆုံး" as const,
        };
      }
      return f;
    });

    const matchExists = updatedFixtures.some(
      (f) => f.home === homeTeam && f.away === awayTeam && f.status === "ပြီးဆုံး"
    );

    if (!matchExists) {
      updatedFixtures.unshift({
        home: homeTeam,
        away: awayTeam,
        date: "ပြီးဆုံး",
        score: `${homeScore} - ${awayScore}`,
        status: "ပြီးဆုံး",
      });
    }

    setFixtures(updatedFixtures);
    setHomeScore(0);
    setAwayScore(0);
    setMatchMinute("1'");
    alert("ပွဲရလဒ်ကို သိမ်းဆည်းပြီး အမှတ်ပေးဇယားသို့ ထည့်သွင်းပြီးပါပြီ။");
  };

  const currentDisplayStandings = getLiveStandings();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: "sans-serif",
        paddingBottom: "80px",
        transition: "background 0.3s",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: cardBg,
          padding: "16px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          borderBottom: "1px solid #333",
          display: "flex",
          justify: "space-between",
          alignItems: "center",
        }}
      >
        <span>M-League Live</span>

        {/* Theme Switcher Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => {
              setBgColor("#121212");
              setCardBg("#1e1e1e");
              setTextColor("#f8fafc");
            }}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#121212",
              border: "2px solid #fff",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => {
              setBgColor("#0f172a");
              setCardBg("#1e293b");
              setTextColor("#f8fafc");
            }}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#0f172a",
              border: "2px solid #38bdf8",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => {
              setBgColor("#f1f5f9");
              setCardBg("#ffffff");
              setTextColor("#0f172a");
            }}
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "2px solid #cbd5e1",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Tab 1: Standings */}
        {activeTab === "standings" && (
          <div>
            <h2 style={{ fontSize: "16px", marginBottom: "15px" }}>
              <span style={{ color: "#3b82f6" }}>M</span> League 2026-27 (Live Table)
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  background: cardBg,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: bgColor,
                      textAlign: "left",
                      fontSize: "12px",
                      color: "#94a3b8",
                    }}
                  >
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
                  {currentDisplayStandings.map((s, i) => {
                    const gd = s.gf - s.ga;
                    return (
                      <tr
                        key={s.team}
                        style={{ borderBottom: "1px solid #2a2a2a", fontSize: "13px" }}
                      >
                        <td style={{ padding: "10px", color: "#888" }}>{i + 1}</td>
                        <td style={{ padding: "10px", fontWeight: "500" }}>{s.team}</td>
                        <td style={{ padding: "10px" }}>{s.p}</td>
                        <td style={{ padding: "10px" }}>{s.w}</td>
                        <td style={{ padding: "10px" }}>{s.d}</td>
                        <td style={{ padding: "10px" }}>{s.l}</td>
                        <td style={{ padding: "10px" }}>{gd > 0 ? `+${gd}` : gd}</td>
                        <td style={{ padding: "10px", fontWeight: "bold", color: "#22c55e" }}>
                          {s.pts}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Results */}
        {activeTab === "results" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#facc15", marginBottom: "15px" }}>
              ပွဲပြီးရလဒ်များ (Results)
            </h2>
            {fixtures.filter((f) => f.status === "ပြီးဆုံး").length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>ပြီးဆုံးသော ပွဲစဉ် ရလဒ်များ မရှိသေးပါ။</p>
            ) : (
              fixtures
                .filter((f) => f.status === "ပြီးဆုံး")
                .map((f, i) => (
                  <div
                    key={i}
                    style={{
                      background: cardBg,
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      border: "1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>
                      ပွဲပြီးရလဒ်
                    </span>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: "13px", flex: 1, textAlign: "right" }}>{f.home}</strong>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#22c55e",
                          margin: "0 15px",
                          background: bgColor,
                          padding: "6px 12px",
                          borderRadius: "6px",
                        }}
                      >
                        {f.score}
                      </span>
                      <strong style={{ fontSize: "13px", flex: 1, textAlign: "left" }}>{f.away}</strong>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Tab 3: Upcoming */}
        {activeTab === "upcoming" && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#2dd4bf", marginBottom: "15px" }}>
              နောက်လာမည့်ပွဲစဉ်များ
            </h2>
            {fixtures.filter((f) => f.status === "ယှဉ်ပြိုင်မည်").length === 0 ? (
              <p style={{ color: "#888", fontSize: "13px" }}>ယှဉ်ပြိုင်ရန် ကျန်ရှိသော ပွဲစဉ် မရှိသေးပါ။</p>
            ) : (
              fixtures
                .filter((f) => f.status === "ယှဉ်ပြိုင်မည်")
                .map((f, i) => (
                  <div
                    key={i}
                    style={{
                      background: cardBg,
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      border: "1px solid #333",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#2dd4bf", display: "block", marginBottom: "4px" }}>
                      {f.date}
                    </span>
                    <div style={{ textAlign: "center" }}>
                      <strong style={{ fontSize: "13px" }}>{f.home}</strong> vs{" "}
                      <strong style={{ fontSize: "13px" }}>{f.away}</strong>
                      <p style={{ color: "#2dd4bf", marginTop: "5px", fontSize: "12px" }}>ယှဉ်ပြိုင်မည်</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Tab 4: Admin Login */}
        {activeTab === "admin" && !isAdmin && (
          <div
            style={{
              background: cardBg,
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              border: "1px solid #333",
              marginTop: "40px",
            }}
          >
            <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>Admin Login</h3>
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "15px" }}>
              ထိန်းချုပ်ရန် Secret PIN ထည့်ပါ
            </p>
            <input
              type="password"
              placeholder="PIN နံပါတ်ထည့်ပါ"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                background: bgColor,
                color: textColor,
                border: "1px solid #444",
                borderRadius: "6px",
                fontSize: "14px",
                marginBottom: "12px",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "10px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "10px",
              }}
            >
              ဝင်မည်
            </button>
          </div>
        )}

        {/* Admin Tab: Live Match Control */}
        {activeTab === "live" && isAdmin && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2 style={{ fontSize: "16px", color: "#22c55e", margin: 0 }}>Admin Live Control</h2>
              <button
                onClick={() => setIsAdmin(false)}
                style={{
                  padding: "6px 12px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>

            <div style={{ background: cardBg, padding: "16px", borderRadius: "10px", textAlign: "center", border: "1px solid #333" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "15px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>
                    Home Team
                  </label>
                  <select
                    value={homeTeam}
                    onChange={(e) => setHomeTeam(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: bgColor,
                      color: textColor,
                      border: "1px solid #444",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    {teamsList.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "12px", color: "#facc15" }}>ပွဲချိန် မိနစ်:</span>
                  <input
                    type="text"
                    value={matchMinute}
                    onChange={(e) => setMatchMinute(e.target.value)}
                    placeholder="ဥပမာ - 45+2'"
                    style={{
                      width: "90px",
                      padding: "6px",
                      textAlign: "center",
                      background: bgColor,
                      color: textColor,
                      border: "1px solid #444",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e", margin: "5px 0" }}>
                  {homeScore} - {awayScore}{" "}
                  <span style={{ fontSize: "12px", color: "#facc15", display: "block" }}>
                    ({matchMinute})
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px", textAlign: "left" }}>
                    Away Team
                  </label>
                  <select
                    value={awayTeam}
                    onChange={(e) => setAwayTeam(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: bgColor,
                      color: textColor,
                      border: "1px solid #444",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    {teamsList.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "15px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button onClick={() => setHomeScore((s) => s + 1)} style={{ padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home +1</button>
                <button onClick={() => setHomeScore((s) => (s > 0 ? s - 1 : 0))} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Home -1</button>
                <button onClick={() => setAwayScore((s) => s + 1)} style={{ padding: "10px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away +1</button>
                <button onClick={() => setAwayScore((s) => (s > 0 ? s - 1 : 0))} style={{ padding: "10px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Away -1</button>
              </div>

              <button
                onClick={finishMatch}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "12px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ပွဲသိမ်းမည် (Standings သို့ Auto ထည့်မည်)
              </button>
            </div>
          </div>
        )}

        {/* Admin Tab: Manage Fixtures */}
        {activeTab === "fixtures" && isAdmin && (
          <div>
            <h2 style={{ fontSize: "16px", color: "#38bdf8", marginBottom: "15px" }}>ပွဲစဉ်များ စီမံရန်</h2>

            <div style={{ background: cardBg, padding: "16px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #333" }}>
              <h3 style={{ fontSize: "14px", marginBottom: "12px", color: "#38bdf8" }}>ပွဲစဉ်အသစ် ထည့်ရန်</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Home Team</label>
                  <select value={newHome} onChange={(e) => setNewHome(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>Away Team</label>
                  <select value={newAway} onChange={(e) => setNewAway(e.target.value)} style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px" }}>
                    {teamsList.map((t, i) => (
                      <option key={i} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>ရက်စွဲနှင့် အချိန်</label>
                  <input
                    type="text"
                    placeholder="ဥပမာ - June 10, 5:00 PM"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    style={{ width: "100%", padding: "10px", background: bgColor, color: textColor, border: "1px solid #444", borderRadius: "6px", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <button onClick={addNewFixture} style={{ width: "100%", padding: "10px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                ပွဲစဉ်စာရင်းသို့ ထည့်မည်
              </button>
            </div>

            {fixtures.map((f, i) => (
              <div key={i} style={{ background: cardBg, padding: "12px", marginBottom: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#38bdf8", display: "block", marginBottom: "2px" }}>{f.date}</span>
                  <span style={{ fontSize: "13px", display: "block", fontWeight: "bold" }}>{f.home} vs {f.away}</span>
                  <span style={{ color: "#22c55e", fontWeight: "bold", fontSize: "12px" }}>{f.score} ({f.status})</span>
                </div>
                <button onClick={() => deleteFixture(i)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                  ဖျက်မည်
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: cardBg,
          display: "flex",
          justify: "space-around",
          padding: "12px 0",
          borderTop: "1px solid #333",
          zIndex: 1000,
        }}
      >
        <button onClick={() => setActiveTab("standings")} style={{ background: "none", border: "none", color: activeTab === "standings" ? "#c084fc" : "#888", cursor: "pointer", fontWeight: "bold" }}>
          Standings
        </button>
        <button onClick={() => setActiveTab("results")} style={{ background: "none", border: "none", color: activeTab === "results" ? "#facc15" : "#888", cursor: "pointer", fontWeight: "bold" }}>
          Results
        </button>
        <button onClick={() => setActiveTab("upcoming")} style={{ background: "none", border: "none", color: activeTab === "upcoming" ? "#2dd4bf" : "#888", cursor: "pointer", fontWeight: "bold" }}>
          နောက်လာမည်
        </button>

        {isAdmin ? (
          <>
            <button onClick={() => setActiveTab("live")} style={{ background: "none", border: "none", color: activeTab === "live" ? "#22c55e" : "#888", cursor: "pointer", fontWeight: "bold" }}>
              Live Control
            </button>
            <button onClick={() => setActiveTab("fixtures")} style={{ background: "none", border: "none", color: activeTab === "fixtures" ? "#38bdf8" : "#888", cursor: "pointer", fontWeight: "bold" }}>
              Edit Fixtures
            </button>
          </>
        ) : (
          <button onClick={() => setActiveTab("admin")} style={{ background: "none", border: "none", color: activeTab === "admin" ? "#3b82f6" : "#888", cursor: "pointer", fontWeight: "bold" }}>
            TH
          </button>
        )}
      </div>
    </div>
  );
}

