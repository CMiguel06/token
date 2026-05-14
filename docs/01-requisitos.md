# 01 — Requisitos

## Requisitos funcionais

### RF01 — Criar eleição
O administrador deve poder criar uma eleição com identificador único, período de votação, lista de opções e chave pública de cifragem.

### RF02 — Registar caderno eleitoral
A autoridade de identidade deve manter uma lista de eleitores elegíveis. Esta lista não deve ser pública com dados pessoais.

### RF03 — Emitir token de elegibilidade
O sistema deve emitir um token a cada eleitor elegível sem que a entidade emissora consiga ligar esse token ao voto depositado.

### RF04 — Depositar boletim cifrado
O eleitor deve poder depositar um boletim cifrado acompanhado de token válido.

### RF05 — Prevenir voto duplicado
A urna digital deve rejeitar tokens já utilizados.

### RF06 — Publicar prova auditável
Cada voto aceite deve gerar um registo público contendo hash do boletim, token comprometido, timestamp e prova verificável.

### RF07 — Apurar resultados
No fim da eleição, o sistema deve permitir apuramento verificável, idealmente sem decifrar votos individualmente.

### RF08 — Auditoria independente
Qualquer observador deve conseguir verificar que todos os boletins publicados foram incluídos no apuramento.

---

## Requisitos não funcionais

### RNF01 — Segredo do voto
Nenhum componente isolado deve conseguir associar identidade civil a escolha eleitoral.

### RNF02 — Integridade
Boletins aceites não devem poder ser alterados sem detecção.

### RNF03 — Disponibilidade
O sistema deve tolerar falhas de serviço durante o período de votação.

### RNF04 — Transparência
O código, os parâmetros criptográficos e os artefactos de eleição devem ser publicáveis.

### RNF05 — Acessibilidade
A interface de voto deve respeitar boas práticas de acessibilidade.

### RNF06 — Protecção de dados
O tratamento de identidade deve ser minimizado e separado do tratamento do voto.

### RNF07 — Observabilidade segura
Logs técnicos não podem conter escolha eleitoral nem dados suficientes para reidentificar o voto.
