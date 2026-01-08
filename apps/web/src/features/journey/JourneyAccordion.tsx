"use client";

import { useEffect, useRef, useState } from "react";
import type { JourneyEntry } from "./types";

type JourneyAccordionProps = {
  entries: JourneyEntry[];
};


const DETAILS_ENTER_DELAY_MS = 500;
const DETAILS_FADE_DURATION_MS = 500;
const GRADIENT_CLASS =
  "bg-[linear-gradient(90deg,rgba(24,24,27,0.6)_0%,rgba(24,24,27,0.15)_45%,transparent_100%)]";

type JourneyAccordionItemProps = {
  entry: JourneyEntry;
  isOpen: boolean;
  onToggle: () => void;
};

function JourneyAccordionItem({
  entry,
  isOpen,
  onToggle,
}: JourneyAccordionItemProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      openTimeoutRef.current = setTimeout(() => {
        setIsRendered(true);
        requestAnimationFrame(() => setIsVisible(true));
        openTimeoutRef.current = null;
      }, DETAILS_ENTER_DELAY_MS);
      return;
    }

    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    if (!isRendered) {
      return;
    }
    setTimeout(() => {
      setIsVisible(false);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = setTimeout(() => {
        setIsRendered(false);
        closeTimeoutRef.current = null;
      }, DETAILS_FADE_DURATION_MS);
    }, 0);
  }, [isOpen, isRendered]);

  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const isExpanded = isOpen || isRendered;
  const gridClass = isExpanded
    ? "md:grid-cols-[1fr_0fr]"
    : "md:grid-cols-[1fr_1fr]";

  return (
    <article
      className={`relative grid w-full gap-4 md:gap-0 transition-[grid-template-columns] duration-500 ease-in-out ${gridClass}`}
    >
      <div className="md:col-start-1 grid-cols-[2fr-4fr]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${entry.id}-details`}
          className={`w-full px-10 py-6 text-left transition transition-colors duration-300 ${GRADIENT_CLASS} md:text-left`}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="w-full space-y-2 md:w-[26rem] md:shrink-0 md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                {entry.position}
              </p>
              <h2 className="text-2xl font-semibold text-white">
                {entry.company}
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                {entry.dateRange}
              </p>
              <p className="text-sm text-white/70">{entry.summary}</p>
              <p className="text-sm text-white/60">{entry.stackSummary}</p>
            </div>
            <div className="overflow-hidden">
              {isRendered && (
                <div
                  id={`${entry.id}-details`}
                  aria-hidden={!isVisible}
                  className={`mt-2 grid gap-4 px-10 text-sm text-white/70 transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                  } md:grid-cols-2`}
                >
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      Technologies
                    </h3>
                    <ul className="grid md:grid-cols-2 mt-2 list-disc list-inside space-y-1">
                      {entry.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                      Projects
                    </h3>
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      {entry.projects.map((project) => (
                        <li key={project}>{project}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <span
              className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </button>
      </div>
    </article>
  );
}

export default function JourneyAccordion({ entries }: JourneyAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  return (
    <div className="space-y-6">
      {entries.map((entry) => {
        const isOpen = openIds.has(entry.id);

        return (
          <JourneyAccordionItem
            key={entry.id}
            entry={entry}
            isOpen={isOpen}
            onToggle={() =>
              setOpenIds((current) => {
                const next = new Set(current);
                if (next.has(entry.id)) {
                  next.delete(entry.id);
                } else {
                  next.add(entry.id);
                }
                return next;
              })
            }
          />
        );
      })}
    </div>
  );
}
