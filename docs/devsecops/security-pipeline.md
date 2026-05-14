# DevSecOps

Pipeline recomendado:

```txt
lint → typecheck → unit tests → property tests → dependency audit → secret scan → build → documentation check
```

## Controlos

- GitHub Actions para `typecheck`, `test`, `demo` e `simulate`.
- Revisão obrigatória de alterações em `src/crypto-edu`, `src/reasoning` e `src/tally`.
- Proibição de secrets no repositório.
- Dependências fixadas por lockfile.
- Releases assinadas quando aplicável.
