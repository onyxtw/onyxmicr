import { getFlow } from "../../../lib/flows.js";

export default function handler(req, res) {
  const { id } = req.query;
  const flow = getFlow(id);

  if (!flow) {
    res.status(404).json({ error: "Flow not found" });
    return;
  }

  res.json(flow);
}
