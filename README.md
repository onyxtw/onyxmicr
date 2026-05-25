# OnyxMicr — Mobile Micro‑System  
A lightweight, modular, cloud‑connected micro‑workflow system designed for mobile-first document processing, translation, verification, and AI‑assisted micro‑automation.

Website: https://onyxmicr.vercel.app  
CloudRuntime: https://onyx-cloudruntime.vercel.app  

---

## 📦 Overview

**OnyxMicr** is a minimal, fast‑deployable micro‑system consisting of：

- **WebApp (React + Vite)** — Mobile‑first UI  
- **CloudRuntime (Vercel Serverless)** — Flow Router + Provider Layer  
- **Five Core Flows**  
  - Translate  
  - Scan (OCR)  
  - Process  
  - Sign  
  - Verify  

The system is designed for **rapid deployment**, **low maintenance**, and **AI‑assisted document workflows**.

---

## 🏗 System Architecture

<img src="./onyxmicr-architecture.svg" width="720"/>

---

## 📁 Repository Structure



onyxmicr/ ├── .github/workflows/        # GitHub Pages deployment ├── cloudruntime/             # Vercel Serverless API backend │   └── api/runtime/cloud.js ├── webapp/                   # React + Vite frontend │   ├── src/ │   │   ├── App.jsx │   │   ├── main.jsx │   │   └── pages/ │   │       ├── TranslateFlow.jsx │   │       ├── ScanFlow.jsx │   │       ├── ProcessFlow.jsx │   │       ├── SignFlow.jsx │   │       └── VerifyFlow.jsx │   ├── index.html │   ├── package.json │   └── vite.config.js ├── LICENSE └── README.md


---

## ⚙️ CloudRuntime (Backend)

The backend is a **single Vercel Serverless Function** that handles:

- Flow routing  
- Provider abstraction (Gemini / Copilot / Claude)  
- JSON API  
- CORS  
- Error handling  

### API Endpoint



POST https://onyx-cloudruntime.vercel.app/api/runtime/cloud (onyx-cloudruntime.vercel.app in Bing)


### Request Body

```json
{
  "flow": "translate",
  "input": "Hello world"
}


Response

{
  "ok": true,
  "result": {
    "provider": "gemini",
    "output": "Processed by gemini: Translate: Hello world"
  }
}


---

🧩 WebApp (Frontend)

The WebApp is built with React + Vite and contains five micro‑flows.

Available Flows

Flow	Description	
Translate	Text translation via AI provider	
Scan	OCR / file recognition	
Process	Data processing / transformation	
Sign	Document signing	
Verify	Signature or document verification	


Each Flow calls CloudRuntime through:

fetch("https://onyx-cloudruntime.vercel.app/api/runtime/cloud", { ... })


---

🚀 Deployment

Frontend — GitHub Pages

GitHub Actions workflow:

.github/workflows/deploy.yml


Build output:

webapp/dist


Backend — Vercel

Vercel settings:

Setting	Value	
Root Directory	webapp	
Build Command	npm run build	
Output Directory	dist	
Install Command	npm install	


---

🛠 Development

Install

cd webapp
npm install


Run Dev Server

npm run dev


Build

npm run build


---

📜 License

MIT License
© OnyxMicr / ONYX Deep Tech Studio
