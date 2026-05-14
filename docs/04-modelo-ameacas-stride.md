# 04 — Modelo de ameaças STRIDE

## S — Spoofing

### Risco
Um atacante tenta votar como outra pessoa.

### Mitigações

- Autenticação forte na Identity Authority.
- MFA para administradores.
- Sessões curtas.
- Protecção contra phishing.
- Registo de emissão por eleitor pseudonimizado.

## T — Tampering

### Risco
Alteração de boletins, parâmetros eleitorais ou resultados.

### Mitigações

- Bulletin board append-only.
- Hash canónico de boletins.
- Assinatura dos parâmetros da eleição.
- CI/CD com revisão obrigatória.
- Auditoria externa.

## R — Repudiation

### Risco
Administração ou serviços negam actos praticados.

### Mitigações

- Logs administrativos assinados.
- Separação de funções.
- Registos imutáveis de configuração.
- Cerimónias públicas de abertura e fecho.

## I — Information Disclosure

### Risco
Ligação entre identidade e voto.

### Mitigações

- Separação entre Identity Authority e Ballot Box.
- Tokens anónimos.
- Cifragem local do boletim.
- Não registar IP associado a voto, ou aplicar proxy/mistura com cautelas jurídicas.
- Minimização de dados.

## D — Denial of Service

### Risco
Indisponibilidade da votação.

### Mitigações

- Rate limiting.
- Protecção DDoS.
- Janelas alternativas de votação.
- Procedimento de contingência.
- Backups e replicação.

## E — Elevation of Privilege

### Risco
Administrador ou serviço obtém permissões indevidas.

### Mitigações

- RBAC.
- Princípio do menor privilégio.
- Segredos em cofre próprio.
- Aprovação multi-party para operações críticas.
- Rotação de chaves.

## Ameaça específica: coerção

No voto remoto, é difícil garantir que o eleitor não está a ser coagido. Este é um problema estrutural do voto pela Internet, não uma linha de código esquecida por um júnior com sono.

Mitigações parciais:

- permitir revotação, contando apenas o último voto;
- voto presencial substitutivo;
- recibos não comprovativos da escolha;
- educação do eleitor;
- avaliação caso a caso do contexto eleitoral.
