const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Paginated<T> = {
  data: T[];
  total: number;
};

export class NotFoundError extends Error {}

export async function getProducts(offset: number, limit: number): Promise<Paginated<Product>> {
  const res = await fetch(`${API_URL}/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error(`Бэкенд вернул ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  // Бэкенд отдаёт 500 с текстом "not found by id ..." для отсутствующего товара
  if (res.status === 404 || res.status === 500) throw new NotFoundError(await res.text());
  if (!res.ok) throw new Error(`Бэкенд вернул ${res.status}`);
  return res.json();
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB" }).format(price);
