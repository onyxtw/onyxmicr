import { useState } from "react";

export default function OrionLinguaDebug() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  async function run() {
    const res = await fetch("http://localhost:3000/api/runtime/cloud?path=orion-lingua", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const json = await res.json();
    setResult(json.data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ORION-LINGUA Debug Panel</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入一句話"
        style={{ width: "100%", height: 120, marginBottom: 20 }}
      />

      <button onClick={run}>Run</button>

      {result && (
        <pre style={{ marginTop: 20, background: "#111", color: "#0f0", padding: 20 }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
