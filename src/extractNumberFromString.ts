export function extractNumberFromString(str: string): number {
  return Number(str.replace(/[^\d\.\,]/g, "").replace(/,/g, "."));
}
