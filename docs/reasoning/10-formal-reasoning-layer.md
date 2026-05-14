# Formal Reasoning Layer

A camada de raciocínio formal representa propriedades críticas do sistema através de predicados, regras, invariantes, CNF, DPLL e proof logs.

## Objectivo

Detectar estados impossíveis ou contraditórios, por exemplo:

- boletim contado sem ter sido aceite;
- token gasto e simultaneamente reutilizável;
- boletim aceite sem token válido;
- boletim aceite mas não cifrado;
- sequência pública com lacunas.

## Predicados principais

```txt
Eligible(v,e)       — eleitor v é elegível na eleição e
Issued(v,e)         — foi emitida credencial para v em e
ValidToken(t,e)     — token t é válido para e
Spent(t,e)          — token t já foi usado em e
Cast(b,t,e)         — boletim b foi depositado com token t
Counted(b,e)        — boletim b foi incluído no apuramento
Encrypted(b)        — boletim b está cifrado
ProofValid(b)       — prova associada é válida
```

## Invariantes

```txt
Cast(b,t,e) → ValidToken(t,e)
Counted(b,e) → Cast(b,t,e)
Spent(t,e) → ¬CanBeSpentAgain(t,e)
Cast(b,t,e) → Encrypted(b)
Eligible(v,e) → AtMostOneToken(v,e)
```

## DPLL

O motor DPLL incluído é didáctico e valida fórmulas em CNF. Não substitui um provador formal industrial, mas é suficiente para demonstrar ligação entre Matemática Finita, lógica proposicional e engenharia de requisitos.

## Proof logs

Cada verificação pode emitir um registo textual:

```txt
[OK] TOKEN_SPENT_IMPLIES_NOT_REUSABLE
[FAIL] COUNTED_BALLOT_MUST_HAVE_BEEN_CAST
```
