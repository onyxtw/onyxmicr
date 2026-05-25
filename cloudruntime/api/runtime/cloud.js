import fetch from "node-fetch";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { flow, action, payload } = req.body;

  const start = Date.now();

  try {
    const provider = selectProvider(flow, action);
    const prompt = buildPrompt(flow, action, payload);

    const result = await callProvider(provider, prompt, payload);

    return res.status(200).json({
      status: "ok",
      provider,
      duration_ms: Date.now() - start,
      result
    });

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}

/* -----------------------------
   Provider Selector
------------------------------ */
function selectProvider(flow, action) {
  if (action === "ocr") return "gemini-vision";
  if (action === "pdf_to_text") return "copilot-pdf";
  if (action === "table") return "gemini-vision-table";
  return "gemini-text";
}

/* -----------------------------
   Prompt Orchestration
------------------------------ */
function buildPrompt(flow, action, payload) {
  if (flow === "translate") {
    return `
You are OnyxMicr Cloud Runtime.
Task: Translate the following text.

Source language: auto
Target language: zh-TW

Text:
${payload.text}
`;
  }

  if (flow === "scan") {
    return `
You are OnyxMicr Cloud Runtime.
Task: OCR the image and return:
- plain text
- detected language
- confidence score
`;
  }

  if (flow === "process" && action === "pdf_to_text") {
    return `
You are OnyxMicr Cloud Runtime.
Task: Extract clean text from the PDF.
`;
  }

  return `
You are OnyxMicr Cloud Runtime.
Task: Process the request.
`;
}

/* -----------------------------
   Provider Layer
------------------------------ */
async function callProvider(provider, prompt, payload) {
  if (provider === "gemini-text") {
    return callGeminiText(prompt);
  }

  if (provider === "gemini-vision") {
    return callGeminiVision(payload.image);
  }

  if (provider === "copilot-pdf") {
    return callCopilotPDF(payload.pdf);
  }

  return { error: "Unknown provider" };
}

/* -----------------------------
   Gemini Text
------------------------------ */
async function callGeminiText(prompt) {
  return {
    text: "（Gemini Text 回應示例）",
    prompt
  };
}

/* -----------------------------
   Gemini Vision
------------------------------ */
async function callGeminiVision(imageBase64) {
  return {
    text: "（OCR 結果示例）",
    confidence: 0.98
  };
}

/* -----------------------------
   Copilot PDF
------------------------------ */
async function callCopilotPDF(pdfBase64) {
  return {
    text: "（PDF 文字內容示例）"
  };
}
