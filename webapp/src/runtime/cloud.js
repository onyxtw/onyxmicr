export async function invokeCloudRuntime(flow, action, payload) {
  const res = await fetch("https://onyx-cloudruntime.vercel.app/runtime/cloud", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ flow, action, payload })
  });

  return await res.json();
}
