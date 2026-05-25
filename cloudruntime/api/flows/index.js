import { listFlows } from "../../../lib/flows.js";

export default function handler(req, res) {
  res.json(listFlows());
}
