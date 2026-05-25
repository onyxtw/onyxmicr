import { Shape, VectorDirection, SemanticField, SemanticGraphNode, SemanticGraphEdge, SemanticGraph, SemanticState } from "./types";
export class OrionSemanticGraph {
  graph: SemanticGraph = { nodes: [], edges: [] };
  buildNode(state: SemanticState, field: SemanticField): SemanticGraphNode {
    return { id: "node_" + Date.now(), shape: this.detectShape(state), vector: this.detectVector(state), field, timestamp: Date.now() };
  }
  detectShape(state: SemanticState): Shape {
    if (state.raw_text.includes("卡")) return "bottleneck";
    if (state.raw_text.includes("展開")) return "expand";
    return "contract";
  }
  detectVector(state: SemanticState): VectorDirection {
    if (state.raw_text.includes("往前")) return "forward";
    if (state.raw_text.includes("往內")) return "inward";
    return "inward";
  }
  updateEdges(newNode: SemanticGraphNode) {
    for (const node of this.graph.nodes) {
      const weight = this.computeWeight(node, newNode);
      this.graph.edges.push({ from: node.id, to: newNode.id, weight, relation: this.inferRelation(node, newNode) });
    }
  }
  computeWeight(a: SemanticGraphNode, b: SemanticGraphNode): number {
    let score = 0;
    if (a.shape === b.shape) score += 0.4;
    if (a.vector === b.vector) score += 0.4;
    score += 1 - Math.abs(a.field.intensity - b.field.intensity);
    return Math.min(1, score);
  }
  inferRelation(a: SemanticGraphNode, b: SemanticGraphNode): SemanticGraphEdge["relation"] {
    if (a.shape === "bottleneck" && b.shape === "expand") return "follow";
    if (a.shape !== b.shape) return "contrast";
    return "support";
  }
  addNode(node: SemanticGraphNode) {
    this.graph.nodes.push(node);
    this.updateEdges(node);
  }
}
