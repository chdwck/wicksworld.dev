import Link from "next/link";

type ExcerptProps = {
  title: string;
  createdAt: string;
  series?: string;
  description: string;
  href: string;
};

export default function Excerpt(props: ExcerptProps) {
  const dateFmt = new Date(props.createdAt).toLocaleDateString("en-us");
  return (
    <article className="my-4">
      <div className="mb-1">
        <div className="flex justify-between items-start mb-0.5">
          <h2 className="text-xl font-semibold">{props.title}</h2>
          <time>{dateFmt}</time>
        </div>
        {props.series && (
          <p className="text-sm text-gray-800 dark:text-gray-100">
            <i>{props.series}</i>
          </p>
        )}
      </div>
      <p className="prose-sm dark:prose-invert">{props.description}</p>
      <Link href={props.href} className="float-right text-indigo-600 hover:underline">Read the blog</Link>
    </article>
  );
}
