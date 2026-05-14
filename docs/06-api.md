# 06 — API

A API deve ser pública apenas onde necessário. Operações administrativas exigem autenticação forte.

## Endpoints públicos

### GET /elections/{electionId}
Obtém parâmetros públicos da eleição.

### POST /tokens/issue
Solicita emissão de token anónimo.

Em produção, o corpo deve conter pedido cego ou payload Privacy Pass, não o token final em claro.

### POST /ballots/cast
Deposita boletim cifrado.

### GET /bulletin-board/{electionId}
Lista boletins cifrados aceites.

### GET /tally/{electionId}
Obtém resultados e provas de apuramento.

## Endpoints administrativos

### POST /admin/elections
Cria eleição.

### POST /admin/elections/{electionId}/open
Abre eleição.

### POST /admin/elections/{electionId}/close
Fecha eleição.

### POST /admin/elections/{electionId}/tally
Inicia apuramento.

## Regras de resposta

Erros devem ser explícitos mas não revelar informação sensível.

Exemplo correcto:

```json
{
  "error": "TOKEN_INVALID_OR_ALREADY_USED"
}
```

Exemplo errado:

```json
{
  "error": "O token deste eleitor chamado João Silva já foi usado às 13:42 a partir do IP x.x.x.x"
}
```

Porque sim, há sistemas que parecem escritos por alguém que confundiu logs com confissão pública.
