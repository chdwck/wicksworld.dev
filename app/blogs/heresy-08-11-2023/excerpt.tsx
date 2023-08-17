import Excerpt from "@/app/components/Excerpt";
import { attributes } from "@/app/blogs/heresy-08-11-2023/content.md";

export function HeresyExcerpt() {
  return (
    <Excerpt
      href="/blogs/heresy-08-11-2023"
      title={attributes.title}
      createdAt={attributes.createdAt}
      series={attributes.series}
      description={attributes.description}
    />
  );
}
