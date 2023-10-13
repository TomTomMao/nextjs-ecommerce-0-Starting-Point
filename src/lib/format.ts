/**
 * Formats a price value into a string representation of a US dollar amount.
 * @param price - The price value to format, in cents.
 * @returns A string representation of the price value in US dollars.
 */
export function formatPrice(price: number): string {
  return (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
