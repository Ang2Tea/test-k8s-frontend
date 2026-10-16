import Link from "next/link";
import { Suspense } from "react";
import { formatPrice, getProducts } from "@/lib/api";

const LIMIT = 10;

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <h1>Продукты</h1>
      <Suspense fallback={<p className="muted">Загрузка…</p>}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ProductList({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const { offset: rawOffset } = await searchParams;
  const parsed = Number.parseInt(
    typeof rawOffset === "string" ? rawOffset : "0",
    10,
  );
  const offset = Math.max(0, Number.isNaN(parsed) ? 0 : parsed);
  const { data: products } = await getProducts(offset, LIMIT);

  let content;
  if (products.length) {
    content = (
      <ul className="grid">
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`} className="card">
              <span className="card-title">{p.name}</span>
              <span className="card-price">{formatPrice(p.price)}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else {
    content = <p className="muted">Ничего не найдено</p>;
  }

  let prev = <span />;
  if (offset > 0) {
    prev = (
      <Link href={`/?offset=${Math.max(0, offset - LIMIT)}`}>← Назад</Link>
    );
  }

  let next = null;
  if (products.length === LIMIT) {
    next = <Link href={`/?offset=${offset + LIMIT}`}>Вперёд →</Link>;
  }

  return (
    <>
      {content}
      <nav className="pager">
        {prev}
        {next}
      </nav>
    </>
  );
}
