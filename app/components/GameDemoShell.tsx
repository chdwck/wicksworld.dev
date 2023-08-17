"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type GameDemoShellProps = { title: string; src: string; coverImageSrc: string };
export function GameDemoShell(props: GameDemoShellProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  function handleClick() {
    setIsPlaying(true);
  }

  function handleIframeLoaded() {
    setIsGameLoaded(true);
  }

  function quitGame() {
    setIsPlaying(false);
    setIsGameLoaded(false);
  }

  useEffect(() => {
    if (isGameLoaded) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  });

  return (
    <div className="w-full relative aspect-video">
      {isPlaying && (
        <div className="fixed inset-0 bg-black">
          <button onClick={quitGame} className="fixed z-10 text-white top-0 right-0 p-4">
            Quit Game
          </button>
          <iframe
            onLoad={handleIframeLoaded}
            className="aspect-video w-full"
            width="100%"
            src={props.src}
            title={props.title}
          />
        </div>
      )}
      {!isGameLoaded && (
        <Image
          className="p-4"
          width="2080"
          height="1088"
          loading="eager"
          alt={`${props.title} cover`}
          src={props.coverImageSrc}
        />
      )}
      {!isGameLoaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          {!isPlaying && (
            <button onClick={handleClick} title="Play!" className="group">
              <FaPlay className="text-white h-20 w-20 group-hover:scale-75 transition-transform duration-100" />
            </button>
          )}
          {isPlaying && (
            <AiOutlineLoading3Quarters className="text-white h-20 w-20 animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}
