# 02 — Arquitectura

## Visão geral

A arquitectura segue uma separação rígida entre entidades:

```txt
Eleitor
  │
  ├── autentica-se ───────▶ Identity Authority
  │                            │
  │                            ▼
  ├── recebe token anónimo ◀ Eligibility Issuer
  │
  ├── cifra boletim localmente
  │
  └── deposita voto ───────▶ Ballot Box ───▶ Bulletin Board ───▶ Auditor CLI
                                      │
                                      ▼
                                Tally Service
```

## Componentes

### 1. Identity Authority
Responsável por validar se uma pessoa pode votar.

Exemplos de fonte de identidade:

- Cartão de Cidadão;
- Chave Móvel Digital;
- eID institucional;
- lista interna de membros de associação;
- caderno eleitoral importado.

A Identity Authority não recebe o voto nem deve ver o boletim.

### 2. Eligibility Issuer
Responsável por emitir o token de voto. Em produção, deve usar uma técnica de emissão cega ou credencial anónima.

Função:

```txt
 eleitor autenticado + prova de elegibilidade
              │
              ▼
 token anónimo de voto, válido para uma eleição específica
```

### 3. Ballot Client
Aplicação usada pelo eleitor para:

- carregar parâmetros públicos da eleição;
- seleccionar opção;
- cifrar boletim localmente;
- submeter boletim cifrado com token.

O ideal é que a cifragem ocorra no dispositivo do eleitor.

### 4. Ballot Box
Serviço que valida:

- se a eleição está aberta;
- se o token é válido;
- se o token ainda não foi usado;
- se o boletim tem formato correcto;
- se a prova criptográfica é válida.

Se tudo estiver correcto, regista o voto e marca o token como gasto.

### 5. Bulletin Board
Registo público append-only. Deve conter apenas informação auditável, nunca dados pessoais.

Exemplo de entrada:

```json
{
  "electionId": "madeira-association-2026",
  "ballotHash": "sha256:...",
  "encryptedBallot": "base64:...",
  "tokenCommitment": "sha256:...",
  "acceptedAt": "2026-05-10T12:30:00Z"
}
```

### 6. Tally Service
Apura os resultados após o fecho da eleição. Em arquitectura avançada, deve usar:

- chaves distribuídas;
- threshold decryption;
- provas de decifragem correcta;
- tally homomórfico quando aplicável.

### 7. Auditor CLI
Ferramenta independente para verificar:

- consistência do bulletin board;
- inexistência de tokens duplicados;
- integridade dos hashes;
- inclusão dos boletins no apuramento;
- validade das provas publicadas.

## Base de dados mínima

### elections

| Campo | Tipo | Descrição |
|---|---|---|
| id | uuid | Identificador interno |
| public_id | text | Identificador público |
| title | text | Título da eleição |
| starts_at | timestamp | Início |
| ends_at | timestamp | Fim |
| public_key | text | Chave pública de cifragem |
| status | enum | draft/open/closed/tallied |

### eligibility_ledger

| Campo | Tipo | Descrição |
|---|---|---|
| election_id | uuid | Eleição |
| voter_hash | text | Hash pseudonimizado do eleitor |
| issued_at | timestamp | Data de emissão |

### spent_tokens

| Campo | Tipo | Descrição |
|---|---|---|
| election_id | uuid | Eleição |
| token_commitment | text | Hash do token usado |
| spent_at | timestamp | Data de uso |

### bulletin_board

| Campo | Tipo | Descrição |
|---|---|---|
| election_id | uuid | Eleição |
| sequence | bigint | Número sequencial append-only |
| ballot_hash | text | Hash do boletim |
| encrypted_ballot | text | Boletim cifrado |
| token_commitment | text | Token anonimizado |
| accepted_at | timestamp | Data de aceitação |
