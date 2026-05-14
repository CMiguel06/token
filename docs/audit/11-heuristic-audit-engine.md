# Heuristic Audit Engine

A auditoria heurística prioriza verificações técnicas sobre o bulletin board. Não decide votos, não altera resultados e não substitui provas criptográficas.

## Função de risco

```txt
riskScore(entry) =
  w1·duplicateTokenRisk +
  w2·malformedBallotRisk +
  w3·timingAnomalyRisk +
  w4·missingProofRisk +
  w5·sequenceGapRisk
```

## Estratégias implementadas

- `bestFirstAuditPlan`: ordena entradas por risco descendente.
- `aStarAuditPlan`: combina custo acumulado com heurística.
- `weightedAStarAuditPlan`: dá mais peso à heurística quando a prioridade é velocidade de triagem.

## O que pode ser assinalado

- tentativa de reutilização de token;
- proof log em falta;
- boletim malformado;
- lacuna de sequência;
- submissão fora da janela temporal;
- inconsistência entre hash e payload canónico.

## Limite ético e técnico

A heurística recomenda onde olhar primeiro. Não decide se uma pessoa votou bem, mal, muito ou com a alma ligeiramente comprometida. O apuramento continua a ser criptográfico, verificável e determinístico.
