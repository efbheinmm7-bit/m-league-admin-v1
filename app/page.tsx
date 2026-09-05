"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [teams, setTeams] = useState(["Dagon Star United FC", "Yangon United FC", "Shan United", "Hanthawaddy United"]);
  const [newTeam, setNewTeam] = useState("");
  
  const [matches, setMatches] = useState([
    { id: 1, home: "Dagon Star United FC", away: "Yangon United FC", score: "0 - 0", status: "Upcoming" }
  ]);
  const [homeTeam, setHomeTeam] = useState(teams[0]);
  const [awayTeam, setAwayTeam] = useState(teams[1]);

  const addTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeam.trim() && !teams.includes(newTeam)) {
      setTeams([...teams, newTeam.trim()]);
      setNewTeam("");
    }
  };

  const addMatch = () => {
    setMatches([...matches, { id: matches.length + 1, home: homeTeam, away: awayTeam, score: "0 - 0", status: "Live" }]);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "10px" }}>M-League Admin Dashboard</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Manage teams, fixtures, and live match controls.</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <button onClick={() => setActiveTab("dashboard")} style={{ padding: "10px 20px", background: activeTab === "dashboard" ? "#2563eb" : "#1e293b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Dashboard</button>
        <button onClick={() => setActiveTab("teams")} style={{ padding: "10px 20px", background: activeTab === "teams" ? "#2563eb" : "#1e293b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Teams</button>
        <button onClick={() => setActiveTab("fixtures")} style={{ padding: "10px 20px", background: activeTab === "fixtures" ? "#2563eb" : "#1e293b", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Fixtures</button>
      </div>

      {activeTab === "dashboard" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
            <h3>Total Teams</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>{teams.length}</p>
          </div>
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
            <h3>Total Matches</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>{matches.length}</p>
          </div>
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
            <h3>Status</h3>
            <p style={{ fontSize: "18px", color: "#22c55e", fontWeight: "bold", marginTop: "10px" }}>Active / Live</p>
          </div>
        </div>
      )}

      {activeTab === "teams" && (
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h3>Add New Team</h3>
          <form onSubmit={addTeam} style={{ display: "flex", gap: "10px", marginTop: "15px", marginBottom: "20px" }}>
            <input type="text" value={newTeam} onChange={(e) => setNewTeam(e.target.value)} placeholder="Team name..." style={{ padding: "10px", borderRadius: "6px", border: "1px solid #475569", background: "#0f172a", color: "#fff", flex: 1 }} />
            <button type="submit" style={{ padding: "10px 20px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Add</button>
          </form>
          <h3>Teams List ({teams.length})</h3>
          <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
            {teams.map((t, i) => <li key={i} style={{ padding: "4px 0", color: "#cbd5e1" }}>{t}</li>)}
          </ul>
        </div>
      )}

      {activeTab === "fixtures" && (
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h3>Create Match</h3>
          <div style={{ display: "flex", gap: "15px", marginTop: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Home Team</label>
              <select value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0f172a", color: "#fff", border: "1px solid #475569", borderRadius: "6px" }}>
                {teams.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Away Team</label>
              <select value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0f172a", color: "#fff", border: "1px solid #475569", borderRadius: "6px" }}>
                {teams.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={addMatch} style={{ marginTop: "15px", padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Publish Match</button>

          <h3 style={{ marginTop: "30px" }}>Matches List</h3>
          {matches.map((m) => (
            <div key={m.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "#0f172a", marginTop: "10px", borderRadius: "6px", border: "1px solid #334155" }}>
              <span>{m.home} vs {m.away}</span>
              <span>{m.score}</span>
              <span style={{ color: "#22c55e" }}>{m.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
