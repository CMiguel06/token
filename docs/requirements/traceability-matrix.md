# Matriz de rastreabilidade

| Requisito | Componente | Teste | Risco mitigado | Mitigação |
|---|---|---|---|---|
| FR-04 | Ballot Box | `double-spend.test.ts` | Aceitação de voto inválido | Validação de boletim cifrado e token assinado |
| FR-05 | Token Registry | `double-spend.test.ts` | Voto duplicado | Registo de token gasto por commitment |
| FR-07 | Bulletin Board | `merkle.test.ts` | Alteração silenciosa do registo | Merkle root e hashes canónicos |
| FR-08 | Audit Engine | `heuristic-engine.test.ts` | Auditoria tardia ou mal priorizada | Scoring de risco e procura heurística |
| FR-09 | Reasoning Layer | `reasoning.test.ts` | Estado lógico contraditório | CNF, DPLL e proof logs |
| NFR-01 | Privacy Boundary | revisão documental | Ligação identidade-voto | Separação Identity Authority / Ballot Box |
| NFR-08 | Test Suite | `npm test` | Regressões silenciosas | Testes automatizados e CI |
| NFR-09 | Repository Layout | `README.md` | Confusão entre demo e produção | Separação `crypto-edu` / `production-adapters` |
