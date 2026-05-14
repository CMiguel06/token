# Requisitos não funcionais

| ID | Categoria | Requisito |
|---|---|---|
| NFR-01 | Privacidade | Não deve existir ligação persistente entre identidade civil e boletim cifrado. |
| NFR-02 | Integridade | Qualquer alteração ao bulletin board deve ser detectável por hash/Merkle root. |
| NFR-03 | Auditabilidade | Operações críticas devem gerar evidência verificável. |
| NFR-04 | Disponibilidade | Componentes críticos devem tolerar falhas parciais. |
| NFR-05 | Usabilidade | O eleitor deve poder verificar inclusão sem conhecer criptografia avançada. |
| NFR-06 | Segurança | Chaves privadas devem ser protegidas e nunca expostas em logs. |
| NFR-07 | Transparência | Regras de aceitação e rejeição devem estar documentadas. |
| NFR-08 | Testabilidade | Invariantes devem estar cobertos por testes automatizados. |
| NFR-09 | Manutenibilidade | O sistema deve separar claramente demo, investigação e produção. |
| NFR-10 | Conformidade | Qualquer uso real exige avaliação jurídica e certificação aplicável. |
