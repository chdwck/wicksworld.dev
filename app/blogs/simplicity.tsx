import Shell from "@/app/components/shell";
import { attributes, react as Content } from "@/app/content/simplicity.md";

export function Simplicity() {
  return (
    <Shell title={attributes.title} series={attributes.series} createdAt={attributes.createdAt}>
      <Content />
    </Shell>
  );
}
