import Shell from "@/app/components/shell";
import {
  attributes,
  react as Content,
} from "@/app/blogs/kte-map-builder-08-18-2023/content.md";

export default function KteMapBuilderBlog() {
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
