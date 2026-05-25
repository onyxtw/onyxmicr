import { runtimeRequest } from "./client";

export const getRuntimeStatus = () => runtimeRequest("/status");
