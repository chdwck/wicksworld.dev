import { ReactNode } from "react";

type ContactMeLinkProps = {
  uname: string;
  link: string;
  children: ReactNode;
};

export function ContactMeLink(props: ContactMeLinkProps) {
  return (
    <a className="group" href={props.link}>
      {props.children}
      <span className="group-hover:underline ml-1">
        {props.uname}
      </span>
    </a>
  );
}
