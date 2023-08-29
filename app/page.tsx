import Link from "next/link";
import { Header } from "@/app/components/Header";
import { HelloExcerpt } from "./blogs/hello-08-10-2023/excerpt";
import { HeresyExcerpt } from "./blogs/heresy-08-11-2023/excerpt";
import { KteMapBuilderBlogExcerpt } from "./blogs/kte-map-builder-08-18-2023/excerpt";
import { CollisionDetectionExcerpt } from "./blogs/collision-detection-08-28-2023/excerpt";

type ListItem = { text: string; href: string };

const gameItems: ListItem[] = [
  { text: "Kill the Evil (WIP)", href: "/games/kill-the-evil" },
];

const toolItems: ListItem[] = [
  { text: "Kill the Evil Map Builder", href: "/tools/kte-map-builder" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-prose mx-auto">
        <section className="flex gap-2">
          <aside className="flex-grow bg-gradient-to-b to-[#40c9ff] from-[#e81cff] rounded-sm p-1">
            <div className="bg-black p-3">
              <h2 className="text-xl font-bold text-white">🎮 Games</h2>
              <ul className="list-disc text-white ml-4 flex items-center">
                {gameItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:underline text-white"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <aside className="flex-grow bg-gradient-to-b to-[#f74c06] from-[#f9bc2c] rounded-sm p-1">
            <div className="bg-black p-3">
              <h2 className="text-xl font-bold text-white">🛠️ Tools</h2>
              <ul className="list-disc text-white ml-4 flex items-center">
                {toolItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:underline text-white"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
        <br />
        <section>
          <h2 className="text-2xl font-bold">✍️ Blogs</h2>
          <CollisionDetectionExcerpt />
          <br />
          <KteMapBuilderBlogExcerpt />
          <br />
          <HeresyExcerpt />
          <br />
          <HelloExcerpt />
          <br />
        </section>
      </main>
    </>
  );
}
