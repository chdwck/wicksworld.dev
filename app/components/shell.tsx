import { ReactNode } from "react";

type ShellProps = {
  title: string;
  createdAt: string;
  series?: string;
  children: ReactNode;
};
export default function Shell(props: ShellProps) {
  const dateFmt = new Date(props.createdAt).toLocaleDateString("en-us");
  return (
    <article>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{props.title}</h2>
          <time>{dateFmt}</time>
        </div>
        {props.series && (
          <p className="text-sm text-gray-800 dark:text-gray-100">
            <i>{props.series}</i>
          </p>
        )}
      </div>
      <div className="prose dark:prose-invert">{props.children}</div>
    </article>
  );
}
