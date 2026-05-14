# Security Policy

Este projecto é académico e experimental. Não deve ser usado em eleições oficiais sem auditoria externa, revisão jurídica, certificação e substituição dos componentes demonstrativos por protocolos de produção.

## Componentes críticos

- `src/shared/crypto.ts`: assinatura e hashing da demo.
- `src/crypto-edu/`: criptografia educativa, não produtiva.
- `src/reasoning/`: invariantes formais e DPLL didáctico.
- `src/audit/`: heurística de auditoria, sem poder de decisão eleitoral.
- `src/bulletin-board/`: Merkle root e inclusão verificável.
- `src/event-store/`: encadeamento de eventos por hash.

## Vulnerabilidades esperadas em investigação

Reportar qualquer problema relacionado com:

- ligação entre identidade e boletim;
- possibilidade de double-spend;
- alteração silenciosa do bulletin board;
- exposição de chaves privadas;
- logs que revelem dados sensíveis;
- recebidos que possam provar a opção eleitoral;
- divergência entre boletins publicados e apuramento.

## Princípio

O sistema deve provar propriedades por desenho. “Confia em mim” não é controlo de segurança; é epitáfio técnico.
