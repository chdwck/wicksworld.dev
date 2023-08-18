import Excerpt from "@/app/components/Excerpt";
import { attributes } from "@/app/blogs/kte-map-builder-08-18-2023/content.md";

export function KteMapBuilderBlogExcerpt() {
  return (
    <Excerpt
      href="/blogs/kte-map-builder-08-18-2023"
      title={attributes.title}
      createdAt={attributes.createdAt}
      series={attributes.series}
      description={attributes.description}
    />
  );
}

