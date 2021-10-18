export default function roundedToFixed(input: number, digits: number): string {
  const rounded = Math.pow(10, digits);
  return (Math.round(input * rounded) / rounded).toFixed(digits);
}
