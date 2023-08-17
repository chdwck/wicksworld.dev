import RootLayout from "@/app/layout";
import { react as Content } from "@/app/content/killtheevilinstructions.md";
import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { GameDemoShell } from "@/app/components/GameDemoShell";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function KillTheEvil() {
  return (
    <RootLayout>
      <Header />
      <main>
        <GameDemoShell title="Kill the evil" src="https://peppy-kheer-f29da5.netlify.app/" coverImageSrc="/killtheevilcover.webp" />
        <div className="prose dark:prose-invert p-4 max-w-prose mx-auto">
          <Link href="/">
            <HiOutlineChevronLeft className="inline" />
            Back to main page
          </Link>
          <Content />
        </div>
      </main>
      <Footer />
    </RootLayout>
  );
}
