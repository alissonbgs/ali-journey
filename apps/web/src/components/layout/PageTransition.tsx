"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

type Phase = "idle" | "exit" | "enter";

const ENTER_MS = 360;
const EXIT_MS = 220;

type TransitionVars = CSSProperties & {
  "--page-enter-duration": string;
  "--page-exit-duration": string;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<Phase>("idle");
  const previousChildrenRef = useRef(children);
  const previousPathRef = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      setDisplayedChildren(children);
      return;
    }

    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];

    setDisplayedChildren(previousChildrenRef.current);
    setPhase("exit");

    const exitTimeout = setTimeout(() => {
      setDisplayedChildren(children);
      setPhase("enter");

      const enterTimeout = setTimeout(() => {
        setPhase("idle");
      }, ENTER_MS);

      timeoutRef.current.push(enterTimeout);
    }, EXIT_MS);

    timeoutRef.current.push(exitTimeout);
    previousPathRef.current = pathname;

    return () => {
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
    };
  }, [children, pathname]);

  useEffect(() => {
    previousChildrenRef.current = children;
  }, [children]);

  const style: TransitionVars = {
    "--page-enter-duration": `${ENTER_MS}ms`,
    "--page-exit-duration": `${EXIT_MS}ms`,
  };

  return (
    <div className="page-transition" data-phase={phase} style={style}>
      <div className="page-transition__surface px-6 py-8 md:px-10 md:py-10">
        {displayedChildren}
      </div>
    </div>
  );
}
