export function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
