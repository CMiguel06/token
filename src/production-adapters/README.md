# Production adapters

Esta pasta reserva espaço para adaptações de produção.

## Substituições obrigatórias antes de qualquer piloto real

- Token Ed25519 da demo → Privacy Pass, blind signatures ou anonymous credentials auditadas.
- `toy-elgamal.ts` → biblioteca criptográfica auditada e adequada ao modelo de voto.
- Shamir educativo → threshold cryptography revisto.
- Bulletin board em memória → armazenamento append-only replicado.
- Auditoria local → auditor CLI independente com reproducibilidade.
- Logs simples → observabilidade com políticas de privacidade.

## Regra

Nada nesta pasta deve importar código de `src/crypto-edu` em produção. Essa pasta é quadro de sala de aula, não cofre de banco.
