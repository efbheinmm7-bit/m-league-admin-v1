export default function AdminDashboard() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>M-League Admin Dashboard</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Welcome to the official administration panel.</p>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h3>Total Teams</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>12</p>
        </div>
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h3>Total Matches</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>48</p>
        </div>
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "8px", border: "1px solid #334155" }}>
          <h3>Status</h3>
          <p style={{ fontSize: "18px", color: "#22c55e", fontWeight: "bold", marginTop: "10px" }}>Active / Live</p>
        </div>
      </div>
    </div>
  );
}
