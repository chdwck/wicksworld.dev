import Shell from "@/app/components/shell";
import {
  attributes,
  react as Content,
} from "@/app/blogs/heresy-08-11-2023/content.md";

export default function Simplicity() {
  return (
    <Shell
      title={attributes.title}
      series={attributes.series}
      createdAt={attributes.createdAt}
    >
      <Content />
    </Shell>
  );
}
