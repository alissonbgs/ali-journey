"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { JourneyEntry } from "./types";

type JourneyAccordionProps = {
  readonly entries: JourneyEntry[];
};


const DETAILS_ENTER_DELAY_MS = 500;
const DETAILS_FADE_DURATION_MS = 500;
const DETAILS_ENTER_DELAY_S = DETAILS_ENTER_DELAY_MS / 1000;
const DETAILS_FADE_DURATION_S = DETAILS_FADE_DURATION_MS / 1000;
const GRADIENT_CLASS =
  "bg-[linear-gradient(90deg,rgba(24,24,27,0.6)_0%,rgba(24,24,27,0.15)_45%,transparent_100%)]";

type JourneyAccordionItemProps = {
  readonly entry: JourneyEntry;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
};

function JourneyAccordionItem({
  entry,
  isOpen,
  onToggle,
}: JourneyAccordionItemProps) {
  const gridClass = isOpen
    ? "md:grid-cols-[1fr_0fr]"
    : "md:grid-cols-[1fr_1fr]";

  return (
    <article
      className={`relative grid w-full gap-4 md:gap-0 transition-[grid-template-columns] duration-500 ease-in-out ${gridClass}`}
      style={{
        transitionDelay: isOpen ? "0ms" : `${DETAILS_FADE_DURATION_MS}ms`,
      }}
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
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`${entry.id}-details`}
                    aria-hidden={!isOpen}
                    className={`relative overflow-hidden px-10 text-sm text-white/70 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-px before:bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.35),transparent)] before:content-[''] ${
                      isOpen ? "" : "pointer-events-none"
                    }`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: 100,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { duration: DETAILS_FADE_DURATION_S },
                    }}
                    transition={{
                      opacity: {
                        duration: DETAILS_FADE_DURATION_S,
                        delay: DETAILS_ENTER_DELAY_S,
                      },
                      height: {
                        duration: DETAILS_FADE_DURATION_S,
                        delay: DETAILS_ENTER_DELAY_S,
                      },
                    }}
                  >
                    <div className="mt-2 grid gap-4 md:grid-cols-2">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span
              className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              style={{
                transitionDelay: isOpen ? `${DETAILS_ENTER_DELAY_MS}ms` : `0ms`,
              }}
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
