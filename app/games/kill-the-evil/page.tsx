import { react as Content } from "@/app/games/kill-the-evil/instructions.md";
import { GameDemoShell } from "@/app/components/GameDemoShell";
import { BackToMainPage } from "@/app/components/BackToMainPage";
import { Footer } from "@/app/components/Footer";

export default function KillTheEvil() {
  return (
    <>
      <main className="relative mx-auto max-w-prose">
        <GameDemoShell
          title="Kill the evil"
          src="https://peppy-kheer-f29da5.netlify.app/"
          coverImageSrc="/killtheevilcover.webp"
        />
        <div className="prose dark:prose-invert p-4 max-w-prose mx-auto">
          <BackToMainPage />
          <Content />
        </div>
      </main>
      <Footer />
    </>
  );
}
