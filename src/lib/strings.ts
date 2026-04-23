export function splitPipe(value: string) {
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}
