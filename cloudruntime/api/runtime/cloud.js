export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { flow, input } = req.body || {};

    if (!flow) {
      return res.status(400).json({ ok: false, error: "Missing flow parameter" });
    }

    const result = await runFlow(flow, input);
    return res.status(200).json({ ok: true, result });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}

async function runFlow(flow, input) {
  switch (flow) {
    case "translate":
      return callProvider("gemini", `Translate: ${input}`);
    case "scan":
      return callProvider("copilot", `OCR Scan: ${input}`);
    case "process":
      return callProvider("claude", `Process Data: ${input}`);
    case "sign":
      return callProvider("gemini", `Sign Document: ${input}`);
    case "verify":
      return callProvider("copilot", `Verify Document: ${input}`);
    default:
      throw new Error("Unknown flow: " + flow);
  }
}

async function callProvider(model, prompt) {
  return {
    provider: model,
    output: `Processed by ${model}: ${prompt}`,
  };
}
