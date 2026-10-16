import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { NotFoundError, formatPrice, getProduct } from "@/lib/api";

export default function ProductPage({ params }: PageProps<"/products/[id]">) {
  return (
    <>
      <Link href="/">← К списку</Link>
      <Suspense fallback={<p className="muted">Загрузка…</p>}>
        <ProductDetails params={params} />
      </Suspense>
    </>
  );
}

async function ProductDetails({ params }: { params: PageProps<"/products/[id]">["params"] }) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) notFound();

  const product = await getProduct(numericId).catch((e) => {
    if (e instanceof NotFoundError) notFound();
    throw e;
  });

  return (
    <>
      <h1>{product.name}</h1>
      <p className="card-price">{formatPrice(product.price)}</p>
      <p className="muted">ID: {product.id}</p>
    </>
  );
}
