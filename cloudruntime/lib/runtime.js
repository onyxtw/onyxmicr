import { getFlow } from "./flows.js";
import { v4 as uuid } from "uuid";

export async function runFlow(id, input) {
  const flow = getFlow(id);

  if (!flow) {
    return { error: "Flow not found" };
  }

  return {
    runId: uuid(),
    flow: id,
    input,
    output: {
      message: `Flow '${id}' executed successfully`,
      echo: input
    },
    status: "completed",
    timestamp: Date.now()
  };
}
