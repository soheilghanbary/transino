import {
  BookTextIcon,
  BookmarkIcon,
  HomeIcon,
  Languages,
  Users2,
  UsersIcon,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { buttonVariants } from "./ui/button";

const Logo = () => (
  <Link href={"/"}>
    <h6 className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400">
      <Languages className="mr-2 size-5" />
      <span>Transino</span>
    </h6>
  </Link>
);

const NavLinks = () => {
  return (
    <nav className="flex items-center gap-2">
      <Link
        href={"/"}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <HomeIcon className="mr-2 size-4" />
        Home
      </Link>
      <Link
        href={"/bookmarks"}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <BookTextIcon className="mr-2 size-4" />
        Documents
      </Link>
      <Link
        href={"/"}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <BookmarkIcon className="mr-2 size-4" />
        Bookmarks
      </Link>
      <Link
        href={"/"}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <UsersIcon className="mr-2 size-4" />
        Support
      </Link>
    </nav>
  );
};

export function Header() {
  return (
    <header className="flex border-separate items-center justify-between border-b p-4">
      <Logo />
      <NavLinks />
      <ModeToggle />
    </header>
  );
}
