"use client";
import { cn } from "@/lib/utils";
import {
  BookTextIcon,
  BookmarkIcon,
  HomeIcon,
  type LucideIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const NavigationItem = ({ href, icon: Icon, label }: Props) => {
  const pathname = window.location.pathname;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-0.5 text-muted-foreground",
        isActive && "text-foreground"
      )}
    >
      <Icon className="size-5" />
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 grid w-full border-separate grid-cols-4 border-t bg-card pt-2 pb-1 md:hidden">
      <NavigationItem href="/" label="Home" icon={HomeIcon} />
      <NavigationItem href="/bookmarks" label="Bookmarks" icon={BookmarkIcon} />
      <NavigationItem href="/documents" label="Documents" icon={BookTextIcon} />
      <NavigationItem href="/support" label="Support" icon={UsersIcon} />
    </nav>
  );
}
