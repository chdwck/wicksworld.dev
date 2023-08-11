import { Hello } from "./blogs/hello";
import { Simplicity } from "./blogs/simplicity";
import { ContactMe } from "./components/ContactMe/ContactMe";
import { GameNav } from "./components/GameNav";
import links from "./links";

export default function Home() {
  return (
    <>
      <header className="p-4 max-w-prose mx-auto">
        <h1 className="text-3xl">
          Wicks World - a blog by{" "}
          <a target="_blank" className="hover:underline" href={links.gh}>
            @chdwck
          </a>
        </h1>
      </header>
      <main className="p-4 max-w-prose mx-auto">
        <GameNav />
        <br />
        {/* <iframe src="https://peppy-kheer-f29da5.netlify.app"></iframe> */}
        <Simplicity />
        <br />
        <Hello />
      </main>
      <footer className="max-w-prose mx-auto">
        <ContactMe />
      </footer>
    </>
  );
}
