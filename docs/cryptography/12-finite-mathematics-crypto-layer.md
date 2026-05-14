# Finite Mathematics Crypto Layer

Esta camada documenta e implementa componentes educativos de criptografia baseados em Matemática Finita.

## Incluído

- aritmética modular;
- inverso modular por Euclides estendido;
- exponenciação modular rápida;
- corpo finito `F_p`;
- Merkle trees;
- commitments por hash;
- Shamir Secret Sharing;
- toy ElGamal.

## Produção vs educação

O código desta pasta serve para explicar fundamentos. Em produção, usar bibliotecas auditadas e protocolos revistos.

> Criptografia artesanal em produção é como construir um pára-quedas com guardanapos e optimismo: pode parecer leve, mas a auditoria final é vertical.

## Shamir Secret Sharing

A chave privada de apuramento pode ser dividida em `n` partes, exigindo pelo menos `k` autoridades para reconstrução:

```txt
p(x) = s + a1x + a2x² + ... + a(k-1)x^(k-1) mod q
```

## ElGamal homomórfico

Em modelos reais, pode permitir somar votos cifrados sem decifrar boletins individuais:

```txt
Enc(v1) · Enc(v2) · ... · Enc(vn) = Enc(v1 + v2 + ... + vn)
```

A implementação incluída é `toy`. Serve para estudo, não para produção.
