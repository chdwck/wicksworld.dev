import Excerpt from "@/app/components/Excerpt";
import { attributes } from "./content.md";

export function WebglMapBuilderBlogExcerpt() {
  return (
    <Excerpt
      href="/blogs/webgl-map-builder-09-12-2023"
      title={attributes.title}
      createdAt={attributes.createdAt}
      series={attributes.series}
      description={attributes.description}
    />
  );
}

