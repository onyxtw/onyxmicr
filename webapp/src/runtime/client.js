export async function runtimeRequest(path, options = {}) {
  const base = import.meta.env.VITE_RUNTIME_URL;

  const res = await fetch(base + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  return res.json();
}
