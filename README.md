# Civitas Vote Token — Formal & Heuristic Edition

**Civitas Vote Token** é uma arquitectura experimental para voto digital verificável baseada em **token anónimo de elegibilidade**, **raciocínio formal**, **auditoria heurística** e **criptografia educativa assente em Matemática Finita**.

> O token não representa o voto. Representa apenas o direito anónimo de depositar um boletim cifrado uma única vez.

Este repositório foi concebido para GitHub como projecto técnico, académico e de engenharia. Não é um sistema certificado para eleições políticas oficiais. É adequado para investigação, simulação, assembleias internas, protótipos de governação digital e demonstração de arquitectura de sistemas críticos.

---

## Versão 2.0

Esta edição acrescenta oito grandes blocos à versão inicial:

### 1. Formal Reasoning Layer

Regras, invariantes, CNF, DPLL e proof logs para verificar coerência lógica de estados eleitorais simulados.

```txt
src/reasoning/
├── predicates.ts
├── invariants.ts
├── cnf.ts
├── dpll.ts
└── proof-log.ts
```

### 2. Heuristic Audit Engine

Motor de auditoria por heurísticas com `A*`, `Weighted A*`, `best-first search` e scoring de risco. A heurística não decide votos; apenas prioriza auditorias técnicas.

```txt
src/audit/
└── heuristic-engine.ts
```

### 3. Finite Mathematics Crypto Layer

Camada educativa de criptografia: aritmética modular, corpos finitos, árvores de Merkle, Shamir Secret Sharing, commitments e toy ElGamal.

```txt
src/crypto-edu/
├── modular-arithmetic.ts
├── finite-field.ts
├── merkle-tree.ts
├── shamir-secret-sharing.ts
├── commitments.ts
└── toy-elgamal.ts
```

### 4. Simulador de eleição com agentes

Simula eleitores legítimos, tentativas duplicadas, provas inválidas e auditoria automática.

```txt
src/simulation/
├── voter-agent.ts
├── attack-agent.ts
└── election-simulator.ts
```

### 5. Matriz de rastreabilidade

Liga requisitos, componentes, testes, riscos e mitigação.

```txt
docs/requirements/traceability-matrix.md
```

### 6. Máquinas de estado formais

Modela o ciclo de vida de token, boletim, apuramento e auditoria.

```txt
docs/formal-models/state-machines.md
```

### 7. Event sourcing com Merkle roots

Registo imutável de eventos críticos e reconstrução verificável do estado.

```txt
src/event-store/
├── events.ts
├── event-store.ts
└── projections.ts
```

### 8. Property-based testing conceptual

Testes desenhados para propriedades gerais: token só pode ser gasto uma vez, alteração ao bulletin board altera Merkle root, boletim aceite aparece publicado.

```txt
tests/
├── reasoning.test.ts
├── merkle.test.ts
├── shamir.test.ts
├── heuristic-engine.test.ts
└── double-spend.test.ts
```

---

## Ideia central

O sistema separa quatro dimensões que nunca devem ser misturadas:

1. **Identidade** — confirmação de elegibilidade por autoridade externa.
2. **Credencial anónima** — token assinado, não ligável ao eleitor.
3. **Boletim cifrado** — voto cifrado antes do depósito.
4. **Apuramento verificável** — contagem e auditoria independentes.

Em linguagem menos funerária: o sistema deve saber que alguém pode votar, mas nunca deve saber em quem essa pessoa votou.

---

## Princípios de desenho

- Um eleitor elegível recebe no máximo uma credencial por eleição.
- O token é usado uma única vez.
- O boletim é cifrado antes de ser aceite.
- O bulletin board é append-only.
- A integridade pública é demonstrada por hashes e Merkle roots.
- A identidade civil nunca entra no mesmo domínio lógico que o boletim.
- A auditoria é verificável por terceiros.
- A IA/heurística só prioriza investigação técnica; nunca decide votos.
- A criptografia de produção deve usar bibliotecas auditadas, não “genialidade caseira”, esse cemitério onde projectos de segurança vão morrer com confiança excessiva.

---

## Estrutura do repositório

```txt
civitas-vote-token/
├── README.md
├── SECURITY.md
├── LICENSE
├── docker-compose.yml
├── package.json
├── openapi/
│   └── openapi.yaml
├── docs/
│   ├── 00-sobre.md
│   ├── 01-requisitos.md
│   ├── 02-arquitetura.md
│   ├── 03-modelo-criptografico.md
│   ├── 04-modelo-ameacas-stride.md
│   ├── 05-fluxo-votacao.md
│   ├── 06-api.md
│   ├── 07-roadmap.md
│   ├── 08-enquadramento-portugal.md
│   ├── 09-referencias.md
│   ├── architecture/
│   ├── audit/
│   ├── cryptography/
│   ├── devsecops/
│   ├── formal-models/
│   ├── observability/
│   ├── performance/
│   ├── privacy/
│   ├── reasoning/
│   ├── reliability/
│   ├── requirements/
│   └── diagrams/
├── src/
│   ├── audit/
│   ├── bulletin-board/
│   ├── crypto-edu/
│   ├── dev-demo/
│   ├── event-store/
│   ├── production-adapters/
│   ├── reasoning/
│   ├── shared/
│   ├── simulation/
│   └── tally/
├── tests/
└── .github/workflows/
```

---

## Executar

```bash
npm install
npm run typecheck
npm test
npm run demo
npm run simulate
```

Ou tudo de uma vez:

```bash
npm run check
```

---

## O que a demo prova

A demonstração local mostra:

1. criação de eleição;
2. emissão de token assinado;
3. depósito de boletim cifrado simulado;
4. rejeição de reutilização do token;
5. publicação append-only;
6. cálculo de Merkle root;
7. execução de auditoria heurística;
8. verificação de invariantes formais em testes.

> Nota: a demo usa Ed25519 para integridade local. Produção deve usar Privacy Pass, blind signatures ou anonymous credentials para obter não-ligabilidade real entre emissão e uso.

<img width="1229" height="682" alt="image" src="https://github.com/user-attachments/assets/71034d9c-964c-4c83-8c4b-98442a5f5563" />


---

## Camadas de produção recomendadas

- **Identity Authority**: valida identidade civil e elegibilidade.
- **Eligibility Issuer**: emite credencial anónima.
- **Voting Client**: cifra boletim localmente.
- **Ballot Box**: aceita boletim cifrado e valida token.
- **Bulletin Board**: publica boletins cifrados, provas e Merkle roots.
- **Tally Authority**: apura resultados por criptografia verificável.
- **Audit Service**: verifica regras, provas, sequências e risco.
- **Observer CLI**: permite a qualquer auditor externo verificar integridade.

---

## Segurança e honestidade técnica

Este projecto inclui criptografia educativa. Isso é útil para aprender e demonstrar Matemática Finita. Não é autorização moral para inventar criptografia de produção num sábado à noite, entre café e excesso de confiança.

Para produção:

- usar bibliotecas criptográficas auditadas;
- efectuar auditoria externa;
- usar HSM/KMS para chaves críticas;
- separar domínios de identidade e voto;
- documentar threat model;
- executar testes de intrusão;
- validar acessibilidade e usabilidade;
- garantir enquadramento legal.

---

## Frase de identidade

> Uma arquitectura experimental para voto digital verificável que combina credenciais anónimas, raciocínio formal, auditoria heurística e criptografia baseada em Matemática Finita.
