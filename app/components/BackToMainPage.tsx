import Link from "next/link";
import { HiOutlineChevronLeft } from "react-icons/hi";

export function BackToMainPage() {
  return (
    <Link href="/">
      <HiOutlineChevronLeft className="inline" />
      Back to main page
    </Link>
  );
}
