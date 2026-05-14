# 05 — Fluxo de votação

## Fase 1 — Preparação

1. Administrador cria eleição.
2. Comissão eleitoral aprova opções.
3. Sistema gera chave pública da eleição.
4. Parâmetros são assinados e publicados.
5. Caderno eleitoral é carregado na Identity Authority.

## Fase 2 — Emissão do token

1. Eleitor autentica-se.
2. Identity Authority confirma elegibilidade.
3. Eligibility Issuer emite token anónimo.
4. Sistema marca que aquele eleitor recebeu token, mas não conhece o token final utilizável.

## Fase 3 — Voto

1. Eleitor abre Ballot Client.
2. Cliente carrega parâmetros públicos.
3. Eleitor escolhe opção.
4. Cliente cifra boletim localmente.
5. Cliente submete:

```json
{
  "electionId": "demo-2026",
  "anonymousToken": "...",
  "encryptedBallot": "...",
  "ballotProof": "..."
}
```

## Fase 4 — Validação pela urna

A Ballot Box valida:

- eleição aberta;
- token válido;
- token ainda não gasto;
- boletim bem formado;
- prova válida.

Se aceite:

1. calcula `tokenCommitment`;
2. marca token como gasto;
3. publica boletim cifrado no bulletin board;
4. devolve recibo técnico não comprovativo da escolha.

## Fase 5 — Apuramento

1. Eleição fecha.
2. Bulletin board é congelado.
3. Tally Service apura resultados.
4. Provas de apuramento são publicadas.
5. Auditor CLI verifica integridade.

## Fase 6 — Auditoria

Qualquer observador deve poder confirmar:

- quantos boletins foram aceites;
- que não há tokens repetidos;
- que todos os boletins aceites entraram no apuramento;
- que o resultado publicado corresponde aos dados auditáveis.
