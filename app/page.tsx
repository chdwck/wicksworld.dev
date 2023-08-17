import { Hello } from "./blogs/hello";
import { Simplicity } from "./blogs/simplicity";
import { ContactMe } from "./components/ContactMe/ContactMe";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-prose mx-auto">
        <Simplicity />
        <br />
        <Hello />
      </main>
      <Footer />
    </>
  );
}
