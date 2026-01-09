"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { TECH_ICON_MAP } from "./tech-icons";
import type { JourneyEntry } from "./types";

type JourneyAccordionProps = {
  readonly entries: JourneyEntry[];
};


const DETAILS_ENTER_DELAY_MS = 500;
const DETAILS_FADE_DURATION_MS = 500;
const ICON_FADE_DURATION_MS = 320;
const DETAILS_ENTER_DELAY_S = DETAILS_ENTER_DELAY_MS / 1000;
const DETAILS_FADE_DURATION_S = DETAILS_FADE_DURATION_MS / 1000;
const ICON_FADE_DURATION_S = ICON_FADE_DURATION_MS / 1000;
const GRADIENT_CLASS =
  "bg-[linear-gradient(90deg,rgba(24,24,27,0.6)_0%,rgba(24,24,27,0.15)_45%,transparent_100%)]";

type IconLayout = {
  left: string;
  top: string;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  size: number;
};

const createSeed = (value: string) =>
  value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const buildIconLayout = (seedKey: string, count: number): IconLayout[] => {
  const random = mulberry32(createSeed(seedKey));
  const placed: Array<{ left: number; top: number }> = [];
  const minDistance = 14; // in percentage points
  const maxAttempts = 24;

  return Array.from({ length: count }, () => {
    let left = 12 + random() * 72;
    let top = 10 + random() * 70;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const ok = placed.every((point) => {
        const distance = Math.hypot(left - point.left, top - point.top);
        return distance >= minDistance;
      });

      if (ok) {
        break;
      }

      left = 12 + random() * 72;
      top = 10 + random() * 70;
    }

    placed.push({ left, top });

    return {
      left: `${left}%`,
      top: `${top}%`,
      driftX: (random() * 2 - 1) * 10,
      driftY: (random() * 2 - 1) * 8,
      duration: 10 + random() * 6,
      delay: random() * 1.6,
      size: 22 + random() * 10,
    };
  });
};

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
  const iconLayout = useMemo(
    () => buildIconLayout(entry.id, entry.technologies.length),
    [entry.id, entry.technologies.length],
  );

  return (
    <article
      className={`relative grid w-full gap-4 md:gap-0 transition-[grid-template-columns] duration-500 ease-in-out ${gridClass}`}
      style={{
        transitionDelay: isOpen
          ? `${ICON_FADE_DURATION_MS}ms`
          : `${DETAILS_FADE_DURATION_MS}ms`,
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
                            <li key={tech.name}>{tech.label}</li>
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
      <div className="relative hidden md:block">
        <AnimatePresence>
          {!isOpen && entry.technologies.length > 0 && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              initial={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(6px)",
                transition: { duration: ICON_FADE_DURATION_S },
              }}
              transition={{
                duration: ICON_FADE_DURATION_S,
                delay: ICON_FADE_DURATION_S,
              }}
            >
              {entry.technologies.map((techIcon, index) => {
                const layout = iconLayout[index];
                const icon = TECH_ICON_MAP[techIcon.name];
                if (!icon) {
                  return null;
                }
                const iconColor = `#${icon.hex}`;
                const labelId = `${entry.id}-${techIcon.name}-label`;

                return (
                  <motion.span
                    key={`${entry.id}-${techIcon.name}`}
                    className="group pointer-events-auto absolute flex items-center justify-center rounded-full bg-white/5 p-2 shadow-[0_0_18px_rgba(120,90,255,0.25)]"
                    style={{ left: layout.left, top: layout.top }}
                    animate={{
                      x: [0, layout.driftX, -layout.driftX, 0],
                      y: [0, layout.driftY, -layout.driftY, 0],
                    }}
                    transition={{
                      duration: layout.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: layout.delay,
                    }}
                  >
                    <span
                      className="flex items-center justify-center"
                      style={{ width: layout.size, height: layout.size }}
                    >
                      <svg
                        role="img"
                        aria-labelledby={labelId}
                        viewBox="0 0 24 24"
                        className="h-full w-full"
                        fill={iconColor}
                      >
                        <title id={labelId}>{techIcon.label}</title>
                        <path d={icon.path} />
                      </svg>
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.45)] transition duration-200 group-hover:opacity-100">
                      {techIcon.label}
                    </span>
                  </motion.span>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
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
