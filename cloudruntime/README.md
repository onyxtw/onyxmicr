# OnyxMicr CloudRuntime

Serverless Cloud Runtime for OnyxMicr WebApp.

## API Endpoint

POST /runtime/cloud

### Request
```json
{
  "flow": "translate | scan | process",
  "action": "string",
  "payload": {}
}
{
  "status": "ok",
  "provider": "gemini | copilot | claude",
  "duration_ms": 123,
  "result": {}
}

---