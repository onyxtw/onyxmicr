export default function handler(req, res) {
  res.json({
    name: "OnyxMicr CloudRuntime",
    version: "1.0.0",
    endpoints: ["/flows", "/status"]
  });
}
