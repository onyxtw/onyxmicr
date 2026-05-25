export const flows = [
  {
    id: "translate",
    name: "Translate Text",
    description: "Simple text translation flow"
  },
  {
    id: "scan",
    name: "Scan Document",
    description: "OCR scanning flow"
  }
];

export function listFlows() {
  return flows;
}

export function getFlow(id) {
  return flows.find(f => f.id === id);
}
