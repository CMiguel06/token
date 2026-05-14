# Failure Modes and Effects Analysis — FMEA

| Falha | Efeito | Severidade | Probabilidade | Detectabilidade | Mitigação |
|---|---|---:|---:|---:|---|
| Perda de ligação durante submissão | Eleitor não sabe se o voto foi aceite | Alta | Média | Alta | Recibo de inclusão e consulta ao bulletin board |
| Token reutilizado | Tentativa de voto duplicado | Alta | Média | Alta | Commitments de tokens gastos |
| Lacuna na sequência pública | Possível truncagem de log | Alta | Baixa | Alta | Sequência append-only e Merkle root |
| Prova criptográfica em falta | Boletim não verificável | Alta | Média | Alta | Rejeição ou sinalização de auditoria |
| Autoridade de apuramento indisponível | Atraso no resultado | Média | Média | Média | Threshold tally com múltiplas autoridades |
| Relógio do servidor errado | Aceitação fora de janela | Média | Baixa | Média | Tempo assinado e validação redundante |
| Ataque DoS | Indisponibilidade | Alta | Média | Média | Rate limiting, filas e mitigação de rede |
