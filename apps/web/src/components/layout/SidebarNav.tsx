"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type IconProps = {
  className?: string;
};

function AIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20L12 4l8 16" />
      <path d="M8 14h8" />
    </svg>
  );
}

function ChevronIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 6l-6 6 6 6" />
    </svg>
  );
}

function HomeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function UfoIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 10c1.6-2 3.3-3 5-3s3.4 1 5 3" />
      <ellipse cx="12" cy="14" rx="8" ry="3" />
      <path d="M9 14h6" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

const navItems = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Journey", href: "/journey", Icon: UfoIcon },
  { label: "Pomodoro", href: "/pomodoro", Icon: ClockIcon },
];

const isActiveRoute = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`w-full border-b border-zinc-200 bg-white px-4 py-3 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r md:py-8 ${
        isCollapsed ? "md:w-20 md:px-4" : "md:w-60 md:px-6"
      }`}
    >
      <div
        className={`flex items-center justify-between gap-4 md:flex-col md:gap-8 ${
          isCollapsed ? "md:items-center" : "md:items-start"
        }`}
      >
        <div
          className={`relative flex items-center md:w-full md:min-h-8 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {isCollapsed ? (
            <span className="inline-flex items-center justify-center text-zinc-900">
              <AIcon className="h-5 w-5" />
              <span className="sr-only">Ali Journey</span>
            </span>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Ali Journey
            </span>
          )}
          <button
            type="button"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 md:absolute md:left-full md:top-1/2 md:z-10 md:-translate-y-1/2 md:translate-x-2 md:border-l-0 md:rounded-l-none"
          >
            <ChevronIcon
              className={`h-4 w-4 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <div
          className={`flex flex-1 flex-wrap justify-end gap-2 md:w-full md:flex-col md:justify-start ${
            isCollapsed ? "md:items-center" : "md:items-start"
          }`}
        >
          {navItems.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                  isCollapsed ? "px-2 md:justify-center" : "px-3"
                } ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <item.Icon className="h-5 w-5" />
                <span className={isCollapsed ? "sr-only" : ""}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
