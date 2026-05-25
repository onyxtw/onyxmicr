import { useState } from "react";

export default function SignFlow() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  async function run() {
    const res = await fetch("https://onyx-cloudruntime.vercel.app/api/runtime/cloud", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flow: "sign", input })
    });

    const json = await res.json();
    setResult(json.result.output);
  }

  return (
    <div>
      <h2>Sign Flow</h2>
      <textarea value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={run}>Run</button>
      <pre>{result}</pre>
    </div>
  );
}
