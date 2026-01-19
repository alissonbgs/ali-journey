"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Journey", href: "/journey" },
  { label: "Tools", href: "/tools" },
];

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-20 w-full border-b border-zinc-800 bg-[#05040c] px-6 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold tracking-[0.3em] text-white">
          ALI
        </span>
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
