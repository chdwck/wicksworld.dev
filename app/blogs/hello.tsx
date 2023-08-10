import { attributes, react as Content } from "@/app/content/hello.md";
import Shell from "./shell";

export function Hello() {
  return (
    <Shell title={attributes.title} createdAt={attributes.createdAt}>
      <Content />
    </Shell>
  );
}
