import { SemanticMemory, SemanticGraphNode, SemanticGraph } from "./types";
export class OrionSemanticMemory {
  memory: SemanticMemory = { graph: { nodes: [], edges: [] }, patterns: { dominant_shape: "contract", dominant_vector: "inward", tension_profile: [], coherence_profile: [] }, history: [] };
  updateMemory(node: SemanticGraphNode, graph: SemanticGraph) {
    this.memory.graph = graph;
    this.memory.history.push({ timestamp: Date.now(), node });
    this.updatePatterns();
  }
  updatePatterns() {
    const shapes = this.memory.graph.nodes.map(n => n.shape);
    const vectors = this.memory.graph.nodes.map(n => n.vector);
    const tensions = this.memory.graph.nodes.map(n => n.field.tension);
    const coherences = this.memory.graph.nodes.map(n => n.field.coherence);
    this.memory.patterns.dominant_shape = this.mostCommon(shapes);
    this.memory.patterns.dominant_vector = this.mostCommon(vectors);
    this.memory.patterns.tension_profile = tensions;
    this.memory.patterns.coherence_profile = coherences;
  }
  mostCommon(arr: any[]) {
    const freq: any = {};
    arr.forEach(v => freq[v] = (freq[v] || 0) + 1);
    return Object.entries(freq).sort((a: any, b: any) => b[1] - a[1])[0][0];
  }
}
