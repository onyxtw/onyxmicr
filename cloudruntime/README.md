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
