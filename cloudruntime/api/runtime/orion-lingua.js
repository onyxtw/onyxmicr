module.exports = async function handler(req, res) {
  const text = req.body.text || "";

  // --- 1. 基本語意模式判斷 ---
  let mode = "social";

  if (/[嗎？?]$/.test(text)) mode = "cognitive"; // 問句
  if (text.includes("我") && (text.includes("覺得") || text.includes("感覺"))) mode = "emotional";
  if (text.length > 30) mode = "structural"; // 長句 → 結構性語意

  // --- 2. 張力判斷（簡易版） ---
  let tension = "low";
  if (text.match(/卡|煩|累|壓力|不知道/)) tension = "medium";
  if (text.match(/痛苦|崩潰|受不了|絕望/)) tension = "high";

  // --- 3. 根據語意生成回應 ---
  let utterance = "";

  if (mode === "emotional") {
    if (tension === "low") utterance = "聽起來你在描述一種細微的感受，你覺得它比較像哪一種方向？";
    if (tension === "medium") utterance = "你現在的感受似乎有些重量，你覺得這個重量來自哪裡？";
    if (tension === "high") utterance = "我感受到你現在的張力很高，你希望我先陪你穩住，還是先幫你理清？";
  }

  if (mode === "cognitive") {
    utterance = "你提出的是一個思考性的問題，你想先從事實、邏輯，還是方向開始？";
  }

  if (mode === "structural") {
    utterance = "你的敘述裡有一個結構，我想先確認：你想釐清的是『狀態』還是『方向』？";
  }

  if (mode === "social") {
    utterance = "我在，你想從哪個角度開始說？";
  }

  return res.json({
    ok: true,
    data: {
      mode,
      tension,
      utterance
    }
  });
};

