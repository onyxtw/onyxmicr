import { runtimeRequest } from "./client";

export const listFlows = () => runtimeRequest("/flows");

export const runFlow = (id, body) =>
  runtimeRequest(`/flows/${id}/run`, {
    method: "POST",
    body: JSON.stringify(body),
  });
