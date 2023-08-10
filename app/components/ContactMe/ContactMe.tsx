import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { ContactMeLink } from "@/app/components/ContactMe/ContactMeLink";
import links from "@/app/links";

export function ContactMe() {
  return (
    <div className="flex justify-between gap-3 flex-wrap items-center p-3 border border-black dark:border-white rounded-sm">
      <ContactMeLink uname="@chdwck" link={links.gh}>
        <FaGithub className="inline" />
      </ContactMeLink>

      <ContactMeLink uname="@plttwck" link={links.gh}>
        <FaTwitter className="inline" />
      </ContactMeLink>

      <ContactMeLink uname="chadwick@wicksworld.dev" link={links.email}>
        <HiOutlineMail className="inline" />
      </ContactMeLink>

      <ContactMeLink uname="@plttwck" link={links.linkedIn}>
        <FaLinkedin className="inline" />
      </ContactMeLink>
    </div>
  );
}
