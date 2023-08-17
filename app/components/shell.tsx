import { ReactNode } from "react";
import { BackToMainPage } from "./BackToMainPage";
import { Footer } from "./Footer";

type ShellProps = {
  title: string;
  createdAt: string;
  series?: string;
  children: ReactNode;
};
export default function Shell(props: ShellProps) {
  const dateFmt = new Date(props.createdAt).toLocaleDateString("en-us");
  return (
    <>
      <main className="p-4 mx-auto max-w-prose">
        <BackToMainPage />
        <div className="mt-2">
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
      </main>
      <Footer />
    </>
  );
}
