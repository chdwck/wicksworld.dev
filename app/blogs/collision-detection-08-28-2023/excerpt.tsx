
import Excerpt from "@/app/components/Excerpt";
import { attributes } from "@/app/blogs/collision-detection-08-28-2023/content.md";

export function CollisionDetectionExcerpt() {
  return (
    <Excerpt
      href="/blogs/collision-detection-08-28-2023"
      title={attributes.title}
      createdAt={attributes.createdAt}
      series={attributes.series}
      description={attributes.description}
    />
  );
}
