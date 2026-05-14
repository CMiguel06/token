# Plano de benchmarking

Medições propostas:

| Métrica | Objectivo |
|---|---|
| `token_issuance_latency_ms` | Medir tempo médio de emissão de credencial. |
| `ballot_submission_latency_ms` | Medir tempo de validação e publicação. |
| `merkle_update_latency_ms` | Medir custo de actualização do bulletin board. |
| `audit_plan_latency_ms` | Medir custo de priorização heurística. |
| `tally_latency_ms` | Medir custo de apuramento simulado. |
| `memory_usage_mb` | Medir crescimento de memória com número de boletins. |

O objectivo não é dizer “é escalável” com o entusiasmo triste de quem vende SaaS no LinkedIn. O objectivo é medir.
