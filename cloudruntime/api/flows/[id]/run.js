import { runFlow } from "../../../../lib/runtime.js";

export default async function handler(req, res) {
  const { id } = req.query;

  const body = req.body ? JSON.parse(req.body) : {};

  const result = await runFlow(id, body);

  res.json(result);
}
