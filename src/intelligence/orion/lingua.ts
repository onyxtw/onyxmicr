import { Mode, SemanticState, CompressedSemantic, ToneTemplateId, SemanticField } from "./types";
import { OrionSemanticGraph } from "./lingua-graph";
import { OrionSemanticMemory } from "./lingua-memory";
export class OrionLinguaV2_1 {
  graph = new OrionSemanticGraph();
  memory = new OrionSemanticMemory();
  async route(input: { text: string; language?: string }) {
    const language = input.language ?? "zh-TW";
    const { mode, state } = this.detectMode(input.text);
    const compressed = this.compress(state);
    const field = this.detectField(input.text);
    const node = this.graph.buildNode(state, field);
    this.graph.addNode(node);
    this.memory.updateMemory(node, this.graph.graph);
    const tone = this.selectTone(mode, compressed, field);
    const utterance = this.expand(compressed, tone, field, language);
    return { mode, state, compressed, field, node, graph: this.graph.graph, memory: this.memory.memory, tone_template: tone, utterance };
  }
  detectMode(text: string): { mode: Mode; state: SemanticState } {
    const state: SemanticState = { density: Math.min(1, text.length / 200), has_structure: ["系統","流程","架構","module"].some(w => text.includes(w)), reference_scope: text.includes("我們") ? "we" : "self", raw_text: text };
    const mode: Mode = state.reference_scope === "we" ? "collaboration" : state.has_structure || state.density >= 0.6 ? "technical" : "social";
    return { mode, state };
  }
  compress(state: SemanticState): CompressedSemantic {
    return { shape: state.raw_text.includes("卡") ? "bottleneck" : "expand", vector: state.raw_text.includes("往前") ? "forward" : "inward", node: "semantic-node" };
  }
  detectField(text: string): SemanticField {
    const tension = ["但是","可是","不過","矛盾"].some(w => text.includes(w)) ? 0.7 : 0.2;
    return { intensity: Math.min(1, text.length / 200), tension, coherence: 1 - tension, gradient: text.includes("往前") ? "forward" : "inward" };
  }
  selectTone(mode: Mode, compressed: CompressedSemantic, field: SemanticField): ToneTemplateId {
    if (field.tension > 0.6) return "social.shape-rhythm";
    if (mode === "technical") return "technical.module-bottleneck";
    if (mode === "collaboration") return "collab.center-vector";
    return "social.shape-rhythm";
  }
  expand(compressed: CompressedSemantic, tone: ToneTemplateId, field: SemanticField, language: string): string {
    if (tone === "social.shape-rhythm") return "你現在的狀態比較像卡住，還是比較像展開？";
    if (tone === "technical.module-bottleneck") return "你覺得現在的瓶頸是在資料層還是語意層？";
    return "你覺得我們現在的共同重心在哪裡？下一步的向量會往哪裡走？";
  }
}
