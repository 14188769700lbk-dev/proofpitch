import type { Assessment, DemoPayload } from "./types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function loadDemo(): Promise<DemoPayload> {
  return request<DemoPayload>("/api/demo");
}

export function assessOpportunity(opportunityId: string): Promise<Assessment> {
  return request<Assessment>("/api/assess", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ opportunity_id: opportunityId }),
  });
}

export function recordApproval(opportunityId: string, draft: string): Promise<{
  state: "recorded";
  external_send: false;
  message: string;
}> {
  return request("/api/approval", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ opportunity_id: opportunityId, draft }),
  });
}

