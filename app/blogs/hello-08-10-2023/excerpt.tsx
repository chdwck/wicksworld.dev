import Excerpt from "@/app/components/Excerpt";
import { attributes } from "@/app/blogs/hello-08-10-2023/content.md";

export function HelloExcerpt() {
  return (
    <Excerpt
      href="/blogs/hello-08-10-2023"
      title={attributes.title}
      createdAt={attributes.createdAt}
      series={attributes.series}
      description={attributes.description}
    />
  );
}
