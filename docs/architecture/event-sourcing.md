# Event sourcing

Em vez de guardar apenas estado final, o sistema regista eventos imutáveis.

## Eventos críticos

```txt
ElectionCreated
TokenIssued
TokenRedeemed
BallotSubmitted
BallotRejected
BallotPublished
MerkleRootUpdated
TallyStarted
TallyCompleted
AuditFindingCreated
```

## Vantagens

- reconstrução verificável do estado;
- auditoria temporal;
- detecção de lacunas;
- compatibilidade com Merkle roots;
- separação entre comandos e factos.

## Regra

Um evento depois de assinado e publicado não é editado. Corrige-se com novo evento. Isto evita a velha técnica administrativa conhecida como “ninguém viu nada”, mas em JSON.
