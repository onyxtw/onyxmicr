# ORION‑LINGUA v2.1+
# Semantic Compression + Field + Graph + Memory Engine

from .types import SemanticState, CompressedSemantic, SemanticField
from .lingua_graph import OrionSemanticGraph
from .lingua_memory import OrionSemanticMemory

class OrionLinguaV2_1:
    def __init__(self):
        self.graph = OrionSemanticGraph()
        self.memory = OrionSemanticMemory()

    async def route(self, text: str, language="zh-TW"):
        state = self.detect_state(text)
        mode = self.infer_mode(state)
        compressed = self.compress(state)
        field = self.detect_field(text)

        node = self.graph.build_node(state, field)
        self.graph.add_node(node)

        self.memory.update_memory(node, self.graph.graph)

        tone = self.select_tone(mode, compressed, field)
        utterance = self.expand(compressed, tone, field, language)

        return {
            "mode": mode,
            "state": state,
            "compressed": compressed,
            "field": field,
            "node": node,
            "graph": self.graph.graph,
            "memory": self.memory.memory,
            "tone_template": tone,
            "utterance": utterance,
        }

    # === State Detection ===
    def detect_state(self, text: str) -> SemanticState:
        return SemanticState(
            density=min(1.0, len(text) / 200),
            has_structure=any(k in text for k in ["系統", "流程", "架構"]),
            reference_scope="we" if "我們" in text else "self",
            raw_text=text,
        )

    def infer_mode(self, state: SemanticState):
        if state.reference_scope == "we":
            return "collaboration"
        if state.has_structure or state.density >= 0.6:
            return "technical"
        return "social"

    # === Compression ===
    def compress(self, state: SemanticState) -> CompressedSemantic:
        shape = "bottleneck" if "卡" in state.raw_text else "expand"
        vector = "forward" if "往前" in state.raw_text else "inward"
        return CompressedSemantic(shape=shape, vector=vector, node="semantic-node")

    # === Field Detection ===
    def detect_field(self, text: str) -> SemanticField:
        tension = 0.7 if any(k in text for k in ["但是", "矛盾"]) else 0.2
        return SemanticField(
            intensity=min(1.0, len(text) / 200),
            tension=tension,
            coherence=1 - tension,
            gradient="forward" if "往前" in text else "inward",
        )

    # === Tone Selection ===
    def select_tone(self, mode, compressed, field):
        if field.tension > 0.6:
            return "social.shape-rhythm"
        if mode == "technical":
            return "technical.module-bottleneck"
        if mode == "collaboration":
            return "collab.center-vector"
        return "social.shape-rhythm"

    # === Expansion ===
    def expand(self, compressed, tone, field, language):
        if tone == "social.shape-rhythm":
            return f"你現在的狀態比較像卡住，還是比較像展開。"
        if tone == "technical.module-bottleneck":
            return "你覺得現在的瓶頸是在資料層還是語意層。"
        return "你覺得我們現在的共同重心在哪裡？下一步的向量會往哪裡走。"
