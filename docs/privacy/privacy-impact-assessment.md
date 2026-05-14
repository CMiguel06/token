# Privacy Impact Assessment — resumo

## Dados tratados

- parâmetros públicos da eleição;
- token anónimo ou commitment do token;
- boletim cifrado;
- hash do boletim;
- proof logs técnicos;
- Merkle roots.

## Dados que não devem ser associados

- identidade civil;
- endereço IP;
- escolha eleitoral;
- token usado;
- recibo de inclusão.

## Risco principal

A ligação entre emissão de token e submissão do boletim compromete o segredo de voto.

## Mitigação

- blind signatures ou anonymous credentials;
- separação de autoridades;
- minimização de logs;
- não emissão de recibo que prove escolha;
- auditoria independente.
