# Máquinas de estado formais

## Token

```txt
CREATED → ISSUED → BLINDED → SIGNED → UNBLINDED → REDEEMED → SPENT
                                      ↘ EXPIRED
                                      ↘ REVOKED
```

Estados inválidos:

- `SPENT → REDEEMED` novamente;
- `EXPIRED → SPENT`;
- `REVOKED → SPENT`.

## Boletim

```txt
DRAFT → ENCRYPTED → SUBMITTED → VALIDATED → PUBLISHED → INCLUDED_IN_TALLY
                              ↘ REJECTED
```

## Auditoria

```txt
PENDING → TRIAGED → UNDER_REVIEW → RESOLVED
                         ↘ ESCALATED
```

## Apuramento

```txt
NOT_STARTED → LOCKED → TALLYING → VERIFIED → PUBLISHED
                         ↘ FAILED
```
