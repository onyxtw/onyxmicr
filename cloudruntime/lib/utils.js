export const ok = data => ({ status: "ok", data });
export const err = msg => ({ status: "error", message: msg });
