import links from "../links";

export function Header() {
  return (
    <header className="max-w-prose mx-auto p-4">
        <h1 className=" text-3xl">
          blog by <a href={links.gh} className="hover:underline">@chdwck</a>
        </h1>
    </header>
  );
}
