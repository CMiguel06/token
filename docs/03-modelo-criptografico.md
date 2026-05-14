# 03 — Modelo criptográfico

## Objectivo

O objectivo criptográfico é permitir que um eleitor prove o direito de votar sem revelar a sua identidade no momento em que deposita o voto.

## Conceitos

### Token de elegibilidade
Credencial anónima, limitada a uma eleição, que autoriza exactamente um depósito de voto.

Propriedades desejadas:

- **Unforgeability**: não deve ser possível criar tokens falsos.
- **Unlinkability**: a entidade que emite não deve conseguir reconhecer o token quando ele é usado.
- **Single-use**: cada token só deve poder ser usado uma vez.
- **Election binding**: o token só deve funcionar numa eleição concreta.

## Estratégia recomendada em produção

### Opção A — Privacy Pass
Usar Privacy Pass como protocolo de emissão e redenção de tokens anónimos. Esta opção é adequada porque já existe normalização IETF para arquitectura e protocolos de emissão.

Fluxo conceptual:

```txt
1. Eleitor autentica-se perante Identity Authority.
2. Cliente cria pedido de token cego.
3. Eligibility Issuer assina/produz token sem conhecer o valor final.
4. Eleitor guarda token.
5. Ballot Box verifica token no momento do voto.
6. TokenCommitment é registado como gasto.
```

### Opção B — Blind signatures
Usar assinatura cega, inspirada em Chaum, para assinar uma mensagem sem revelar essa mensagem ao emissor.

Fluxo conceptual:

```txt
m = random_token || election_id
b = blind(m)
s' = sign_issuer(b)
s = unblind(s')
VoteToken = (m, s)
```

A Ballot Box verifica `s` contra a chave pública do emissor, mas o emissor não consegue ligar `m` ao pedido original.

## Boletim cifrado

O voto nunca deve ser enviado em claro.

Modelo recomendado:

```txt
ballot = {
  election_id,
  selected_option,
  nonce
}

encrypted_ballot = Encrypt(election_public_key, ballot)
ballot_hash = SHA-256(canonical(encrypted_ballot))
```

## Apuramento

Para eleições simples, é possível cifrar cada boletim e decifrar no fim com cerimónia de chave. Para desenho mais robusto, deve ser usado:

- ElGamal homomórfico;
- threshold decryption;
- provas de conhecimento-zero;
- bulletin board público.

## Porque não blockchain pública?

Uma blockchain pública pode servir para ancorar hashes, mas não deve conter identidade, votos ou tokens reutilizáveis. Publicar dados errados numa blockchain é como gravar um erro administrativo em mármore: tecnicamente impressionante, juridicamente embaraçoso e humanamente estúpido.

Uso aceitável:

- ancorar hash diário do bulletin board;
- publicar raiz Merkle;
- demonstrar imutabilidade externa.

Uso desaconselhado:

- token ERC-20 de voto;
- NFT de voto;
- voto em claro on-chain;
- carteira pública associada a eleitor.
