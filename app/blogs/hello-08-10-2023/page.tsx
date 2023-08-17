import Shell from "@/app/components/shell";
import {
  attributes,
  react as Content,
} from "@/app/blogs/hello-08-10-2023/content.md";

export default function Hello() {
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
