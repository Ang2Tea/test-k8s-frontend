import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Не найдено</h1>
      <Link href="/">← К списку</Link>
    </>
  );
}
