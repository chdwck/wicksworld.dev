
import Shell from "@/app/components/shell";
import {
  attributes,
  react as Content,
} from "@/app/blogs/collision-detection-08-28-2023/content.md";

export default function CollisionDetection() {
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
