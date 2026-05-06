export function formatUsdPrice(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return "—";
  if (x < 0.000001) return x.toExponential(2);
  if (x < 0.01) return x.toFixed(6);
  if (x < 1) return x.toFixed(4);
  return x.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatPctChange(change24h) {
  const x = Number(change24h);
  if (Number.isNaN(x)) return "—";
  const sign = x > 0 ? "+" : "";
  return `${sign}${x.toFixed(2)}%`;
}

export function changeToneClass(change24h) {
  const x = Number(change24h);
  if (x > 0) return "text-green-600";
  if (x < 0) return "text-red-500";
  return "text-gray-500";
}
