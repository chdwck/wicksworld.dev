import { Hello } from "./blogs/hello";
import { Simplicity } from "./blogs/simplicity";
import { ContactMe } from "./components/ContactMe/ContactMe";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-prose mx-auto">
        <br />
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
