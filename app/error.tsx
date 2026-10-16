"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <h1>Не удалось загрузить данные</h1>
      <p className="muted">{error.message}</p>
      <button onClick={reset}>Повторить</button>
    </>
  );
}
