"use client";
import Link from "next/link";
import { useState } from "react";

const games = "games";
const tools = "tools";
const closed = "closed";
type MenuState = typeof games | typeof tools | typeof closed;

type ListItem = { text: string; href: string };
type SliderProps = { gradient: string; isOpen: boolean; lis: ListItem[] };
const Slider = (props: SliderProps) => (
  <div
    className={`overflow-hidden absolute sm:w-full sm:top-[3.75rem] top-[3.25rem] right-0 transition-[max-width] ${
      props.gradient
    } ${props.isOpen ? "max-w-[100vw]" : "max-w-[0vw]"}`}
  >
    <ul className="list-disc p-4 ml-4 whitespace-nowrap">
      {props.lis.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="hover:underline">
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export function Header() {
  const [menuState, setMenuState] = useState<MenuState>(closed);
  const isGamesMenuOpen = menuState === games;
  const isToolsMenuOpen = menuState === tools;

  function toggleMenu(toggleState: MenuState) {
    if (toggleState === menuState) {
      setMenuState(closed);
      return;
    }

    setMenuState(toggleState);
  }

  const gameItems: ListItem[] = [
    { text: "Kill the Evil (WIP)", href: "/games/kill-the-evil" },
  ];

  const toolItems: ListItem[] = [
    { text: "Kill the Evil Map Builder", href: "/tools/kte-map-builder" },
  ];

  return (
    <header className="relative transition-all flex justify-between">
      <Link className="p-4" href="/" title="Back to home">
        <h1 className="hover:underline text-3xl relative inline-block">
          blog by @chdwck
        </h1>
      </Link>
      <nav className="relative z-10">
        <ul className="flex items-center sm:pointer-events-auto">
          <li>
            <button
              onClick={() => toggleMenu(games)}
              className="text-xl font-semibold p-3 sm:p-4 bg-gradient-to-b from-[#40c9ff] to-[#e81cff]"
            >
              🎮 <span className="hidden sm:inline-block">Games</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleMenu(tools)}
              className="text-xl font-semibold p-3 sm:p-4 bg-gradient-to-b from-[#f74c06] to-[#f9bc2c]"
            >
              🛠️ <span className="hidden sm:inline-block">Tools</span>
            </button>
          </li>
        </ul>
        <Slider
          lis={gameItems}
          isOpen={isGamesMenuOpen}
          gradient="bg-gradient-to-b to-[#40c9ff] from-[#e81cff]"
        />
        <Slider
          lis={toolItems}
          isOpen={isToolsMenuOpen}
          gradient="bg-gradient-to-b to-[#f74c06] from-[#f9bc2c]"
        />
      </nav>
    </header>
  );
}
