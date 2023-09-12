
import Shell from "@/app/components/shell";
import {
  attributes,
  react as Content,
} from "./content.md";

export default function WebglBuilderBlog() {
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
