import { Hello } from "./blogs/hello";
import links from './links'

export default function Home() {
  return (
    <>
      <header className="p-4 max-w-prose mx-auto">
        <h1 className="text-3xl">
          Wicks World - a blog by{" "}
          <a
            target="_blank"
            className="hover:underline"
            href={links.gh}
          >
            @chdwck
          </a>
        </h1>
      </header>
      <main className="p-4 max-w-prose mx-auto">
        <Hello />
      </main>
    </>
  );
}
