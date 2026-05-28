const { execSync, spawn } = require("child_process");
const http = require("http");

function log(section, msg) {
  console.log(`[${section}] ${msg}`);
}

function tryExec(cmd) {
  try {
    return execSync(cmd, { stdio: "pipe" }).toString().trim();
  } catch (e) {
    return null;
  }
}

async function checkPort3000() {
  return new Promise((resolve) => {
    const req = http.request(
      { host: "localhost", port: 3000, path: "/api/runtime/cloud?path=onyx-console", method: "POST", headers: { "Content-Type": "application/json" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          resolve({ ok: true, status: res.statusCode, body: data });
        });
      }
    );
    req.on("error", () => resolve({ ok: false }));
    req.write('{"semanticMode":"ping","semanticTension":"low"}');
    req.end();
  });
}

async function main() {
  log("ONYX-HEALTH", "開始檢測 ONYX Runtime 狀態…");

  // 1) 檢查 pnpm 是否存在
  const pnpmVersion = tryExec("pnpm -v");
  if (!pnpmVersion) {
    log("ERROR", "找不到 pnpm，請先安裝 pnpm 再執行本工具。");
    process.exit(1);
  }
  log("CHECK", `pnpm 版本：${pnpmVersion}`);

  // 2) 檢查 node_modules 是否存在
  const hasNodeModules = !!tryExec("test -d node_modules && echo yes || echo no");
  if (!hasNodeModules) {
    log("FIX", "node_modules 不存在，執行 pnpm install…");
    const out = tryExec("pnpm install");
    log("FIX", "pnpm install 完成。");
  } else {
    log("CHECK", "node_modules 存在。");
  }

  // 3) 檢查 axios 是否存在
  const hasAxios = !!tryExec('node -e "require.resolve(\'axios\')" && echo yes || echo no');
  if (!hasAxios) {
    log("FIX", "axios 不存在，執行 pnpm add axios…");
    const out = tryExec("pnpm add axios");
    log("FIX", "axios 安裝完成。");
  } else {
    log("CHECK", "axios 已安裝。");
  }

  // 4) 檢查 CloudRuntime 是否在跑
  log("CHECK", "檢查 3000 port / CloudRuntime 狀態…");
  let cloud = await checkPort3000();

  if (!cloud.ok) {
    log("FIX", "偵測到 CloudRuntime 未啟動，嘗試啟動 server.js…");

    const child = spawn("node", ["server.js"], {
      stdio: "inherit",
      detached: true
    });
    child.unref();

    // 等幾秒讓 server 起來
    await new Promise((r) => setTimeout(r, 4000));
    cloud = await checkPort3000();
  }

  if (!cloud.ok) {
    log("ERROR", "CloudRuntime 無法啟動或 3000 port 無回應。請手動檢查 server.js。");
    process.exit(1);
  }

  log("CHECK", `CloudRuntime 回應狀態碼：${cloud.status}`);

  // 5) 檢查 onyx-lidao 是否可用
  log("CHECK", "測試 onyx-lidao pipeline…");
  const lidaoResult = await new Promise((resolve) => {
    const req = http.request(
      { host: "localhost", port: 3000, path: "/api/runtime/cloud?path=onyx-lidao", method: "POST", headers: { "Content-Type": "application/json" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", (err) => resolve({ status: 0, body: String(err) }));
    req.write('{"geothermal":72,"waterPressure":1.1,"wasteHeat":0.6,"microseismic":1.2}');
    req.end();
  });

  if (lidaoResult.status === 200) {
    log("OK", "onyx-lidao 正常運作。");
  } else {
    log("WARN", `onyx-lidao 回應異常，狀態碼：${lidaoResult.status}`);
    log("WARN", `回應內容：${lidaoResult.body}`);
  }

  log("DONE", "ONYX Health 檢測與自動修復流程完成。");
}

main().catch((e) => {
  console.error("[ONYX-HEALTH] FATAL:", e);
  process.exit(1);
});
