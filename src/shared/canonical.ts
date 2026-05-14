/**
 * Produz JSON canónico simples para hashing determinístico.
 *
 * Nota académica:
 * Em produção, deve ser usado um esquema formal de canonicalização,
 * por exemplo JSON Canonicalization Scheme, para evitar divergências subtis
 * entre ambientes. Aqui implementa-se uma versão mínima para demonstração.
 */
export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(",")}]`;
  }

  const objectValue = value as Record<string, unknown>;
  const keys = Object.keys(objectValue).sort();
  const entries = keys.map((key) => `${JSON.stringify(key)}:${canonicalJson(objectValue[key])}`);
  return `{${entries.join(",")}}`;
}
