import Link from "next/link";

export function GameNav() {
  return (
    <section className="border p-2 magic-border rounded-lg">
      <h2 className="text-xl font-semibold">🎮 Games</h2>
      <ul className="ml-4 list-disc">
        <li>
          <Link href="/games/kill-the-evil" className="hover:underline">
            Kill the Evil (WIP)
          </Link>
        </li>
      </ul>
    </section>
  );
}
