"use client";

import { useState } from "react";
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

  return (
    <div className="w-full relative aspect-video">
      {isPlaying && (
        <iframe
          onLoad={handleIframeLoaded}
          className="aspect-video absolute inset-0"
          width="100%"
          src={props.src}
          title={props.title}
        />
      )}
      {!isGameLoaded && (
        <Image
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
