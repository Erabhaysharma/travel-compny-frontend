export function formatPrice(price) {
  if (!price || Number(price) <= 0) return null;
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export function formatDateRange(startDate, endDate) {
  if (!startDate) return null;
  const opts = { day: "numeric", month: "short" };
  const start = new Date(startDate);
  const startLabel = start.toLocaleDateString("en-IN", opts);

  if (!endDate || endDate === startDate) {
    return `${startLabel}, ${start.getFullYear()}`;
  }

  const end = new Date(endDate);
  const endLabel = end.toLocaleDateString("en-IN", opts);
  return `${startLabel} – ${endLabel}, ${end.getFullYear()}`;
}