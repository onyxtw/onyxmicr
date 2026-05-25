import React, { useState } from "react";

export default function App() {
  const [flow, setFlow] = useState("home");

  return (
    <div className="app">
      <h1>OnyxMicr</h1>
      <p>Mobile Micro‑System</p>

      <div className="flow-list">
        <button onClick={() => setFlow("translate")}>翻譯 Flow</button>
        <button onClick={() => setFlow("scan")}>掃描 Flow</button>
        <button onClick={() => setFlow("process")}>PDF Flow</button>
        <button onClick={() => setFlow("sign")}>文件簽署</button>
        <button onClick={() => setFlow("verify")}>簽名驗證</button>
      </div>

      <div className="result">
        {flow !== "home" && <p>目前 Flow：{flow}</p>}
      </div>
    </div>
  );
}
