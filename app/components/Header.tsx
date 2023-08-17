"use client";
import Link from "next/link";
import { useState } from "react";

const games = "games";
const tools = "tools";
const closed = "closed";
const open = "open";
type MenuState = typeof games | typeof tools | typeof closed | typeof open;

export function Header() {
  const [menuState, setMenuState] = useState<MenuState>(closed);
  const isMenuOpen = menuState !== closed;
  const isGamesMenuOpen = menuState === games;
  const isToolsMenuOpen = menuState === tools;

  function toggleMenu(toggleState: MenuState) {
    if (toggleState === menuState) {
      setMenuState(closed);
      return;
    }

    setMenuState(toggleState);
  }
  return (
    <header
      className={`p-4 relative transition-all ${
        isMenuOpen ? "mb-[4.25rem]" : "mb-[0rem]"
      }`}
    >
      <Link className="relative z-10" href="/" title="Back to home">
        <h1 className="hover:underline text-3xl relative inline-block">blog by @chdwck</h1>
      </Link>
      <nav className="absolute top-0 inset-x-0 w-screen flex flex-col items-end">
        <ul className="flex items-center transition-opacity opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto">
          <li>
            <button
              onClick={() => toggleMenu(games)}
              className="text-xl font-semibold p-4 bg-gradient-to-b from-[#40c9ff] to-[#e81cff]"
            >
              🎮 Games
            </button>
          </li>
          <li>
            <button
              onClick={() => toggleMenu(tools)}
              className="text-xl font-semibold p-4 bg-gradient-to-b from-[#f74c06] to-[#f9bc2c]"
            >
              🛠️ Tools
            </button>
          </li>
        </ul>
        <div
          className={`overflow-hidden w-screen bg-gradient-to-tr from-[#40c9ff] to-[#e81cff] transition-[max-height] ${
            isGamesMenuOpen ? "max-h-[4.25rem] " : "max-h-[0]"
          }`}
        >
          <ul className="list-disc p-4 ml-4">
            <li>
              <Link href="/games/kill-the-evil" className="hover:underline">
                Kill the Evil (WIP)
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`overflow-hidden w-screen bg-gradient-to-tr from-[#f74c06] to-[#f9bc2c] transition-[max-height] ${
            isToolsMenuOpen ? "max-h-[4.25rem] " : "max-h-[0]"
          }`}
        >
          <ul className="list-disc p-4 ml-4">
            <li>
              <Link href="/tools/kte-map-builder" className="hover:underline">
                Kill the Evil Map Builder
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
