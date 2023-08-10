import { ReactNode } from "react";
import { ContactMe } from "@/app/components/ContactMe/ContactMe";

type ShellProps = { title: string; createdAt: string; children: ReactNode };
export default function Shell(props: ShellProps) {
  const dateFmt = new Date(props.createdAt).toLocaleDateString("en-us");
  return (
    <article>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{props.title}</h2>
        <time>{dateFmt}</time>
      </div>
      <div className="prose dark:prose-invert">{props.children}</div>
      <ContactMe />
    </article>
  );
}
