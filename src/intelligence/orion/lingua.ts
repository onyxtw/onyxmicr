// ORION‑LINGUA v2.1+
// Semantic Compression + Field + Graph + Memory Engine

import {
  Mode,
  SemanticState,
  CompressedSemantic,
  ToneTemplateId,
  SemanticField,
} from "./types";

import { OrionSemanticGraph } from "./lingua-graph";
import { OrionSemanticMemory } from "./lingua-memory";

export class OrionLinguaV2_1 {
  graph = new OrionSemanticGraph();
  memory = new OrionSemanticMemory();

  // === Public API ===
  async route(input: { text: string; language?: string }) {
    const language = input.language ?? "zh-TW";

    // 1. Detect mode + semantic state
    const { mode, state } = this.detectMode(input.text);

    // 2. Compress semantics
    const compressed = this.compress(state);

    // 3. Detect semantic field (v2.1)
    const field = this.detectField(input.text);

    // 4. Build graph node (v2.2)
    const node = this.graph.buildNode(state, field);
    this.graph.addNode(node);

    // 5. Update semantic memory (v3.0)
    this.memory.updateMemory(node, this.graph.graph);

    // 6. Select tone (now influenced by memory + field)
    const tone = this.selectTone(mode, compressed, field);

    // 7. Expand semantics
    const utterance = this.expand(compressed, tone, field, language);

    return {
      mode,
      state,
      compressed,
      field,
      node,
      graph: this.graph.graph,
      memory: this.memory.memory,
      tone_template: tone,
      utterance,
    };
  }

  // === Step 1: Detect Mode ===
  detectMode(text: string): { mode: Mode; state: SemanticState } {
    const state: SemanticState = {
      density: this.estimateDensity(text),
      has_structure: this.detectStructure(text),
      reference_scope: this.detectScope(text),
      raw_text: text,
    };

    const mode = this.inferMode(state);
    return { mode, state };
  }

  estimateDensity(text: string) {
    return Math.min(1, text.length / 200);
  }

  detectStructure(text: string) {
    return ["系統", "流程", "架構", "module", "pipeline"].some(w =>
      text.includes(w)
    );
  }

  detectScope(text: string) {
    if (text.includes("我們") || text.toLowerCase().includes("we")) return "we";
    if (text.includes("系統") || text.toLowerCase().includes("system"))
      return "system";
    return "self";
  }

  inferMode(state: SemanticState): Mode {
    if (state.reference_scope === "we") return "collaboration";
    if (state.has_structure || state.density >= 0.6) return "technical";
    return "social";
  }

  // === Step 2: Compress Semantics ===
  compress(state: SemanticState): CompressedSemantic {
    return {
      shape: this.detectShape(state),
      vector: this.detectVector(state),
      node: this.extractNode(state),
    };
  }

  detectShape(state: SemanticState) {
    if (state.raw_text.includes("卡")) return "bottleneck";
    if (state.raw_text.includes("展開")) return "expand";
    return "contract";
  }

  detectVector(state: SemanticState) {
    if (state.raw_text.includes("往前")) return "forward";
    if (state.raw_text.includes("往內")) return "inward";
    return "inward";
  }

  extractNode(state: SemanticState) {
    return "semantic-node";
  }

  // === Step 3: Semantic Field (v2.1) ===
  detectField(text: string): SemanticField {
    return {
      intensity: Math.min(1, text.length / 200),
      tension: ["但是", "可是", "不過", "矛盾"].some(w => text.includes(w))
        ? 0.7
        : 0.2,
      coherence: 1 -
        (["但是", "可是", "不過", "矛盾"].some(w => text.includes(w))
          ? 0.7
          : 0.2),
      gradient: text.includes("往前")
        ? "forward"
        : text.includes("往內")
        ? "inward"
        : "inward",
    };
  }

  // === Step 4: Tone Selection (influenced by memory + field) ===
  selectTone(
    mode: Mode,
    compressed: CompressedSemantic,
    field: SemanticField
  ): ToneTemplateId {
    if (field.tension > 0.6) return "social.shape-rhythm";
    if (mode === "technical") return "technical.module-bottleneck";
    if (mode === "collaboration") return "collab.center-vector";
    return "social.shape-rhythm";
  }

  // === Step 5: Expansion ===
  expand(
    compressed: CompressedSemantic,
    tone: ToneTemplateId,
    field: SemanticField,
    language: string
  ) {
    if (tone === "social.shape-rhythm") {
      const shape = compressed.shape === "bottleneck" ? "卡住" : "展開";
      return `你現在的狀態比較像${shape}，還是比較像收束。`;
    }

    if (tone === "technical.module-bottleneck") {
      return `你覺得現在的瓶頸是在資料層還是語意層。`;
    }

    return `你覺得我們現在的共同重心在哪裡？下一步的向量會往哪裡走。`;
  }
}
