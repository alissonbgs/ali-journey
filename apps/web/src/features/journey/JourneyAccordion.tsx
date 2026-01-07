"use client";

import { useState } from "react";
import type { JourneyEntry } from "./types";

type JourneyAccordionProps = {
  entries: JourneyEntry[];
};


export default function JourneyAccordion({ entries }: JourneyAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => {
        const isOpen = openId === entry.id;

        const gradientClass = "bg-[linear-gradient(90deg,rgba(24,24,27,0.6)_0%,rgba(24,24,27,0.15)_45%,transparent_100%)]";
        const gridClass = isOpen
          ? "md:grid-cols-[1fr_0fr]"
          : "md:grid-cols-[1fr_1fr]";

        return (
          <article
            key={entry.id}
            className={`relative grid w-full gap-4 md:gap-0 transition-[grid-template-columns] duration-500 ease-in-out ${gridClass}`}
          >
            <div className="md:col-start-1">
              <button
                type="button"
                onClick={() =>
                  setOpenId((current) => (current === entry.id ? null : entry.id))
                }
                aria-expanded={isOpen}
                aria-controls={`${entry.id}-details`}
                className={`w-full px-6 py-6 text-left transition transition-colors duration-300 ${gradientClass} md:text-left`}
              >
                <div
                  className="flex items-center justify-between gap-6"
                >
                  <div
                    className="space-y-2 md:text-left"
                  >
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
                    <p className="text-sm text-white/60">
                      {entry.stackSummary}
                    </p>
                  </div>
                  <div className="overflow-hidden">
                    {isOpen && (
                      <div
                        id={`${entry.id}-details`}
                        className="mt-4 grid gap-4 px-6 py-6 text-sm text-white/70 md:grid-cols-3"
                      >
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                            Technologies
                          </h3>
                          <ul className="mt-2 list-disc list-inside space-y-1">
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
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                            Impact
                          </h3>
                          <ul className="mt-2 list-disc list-inside space-y-1">
                            {entry.achievements.map((achievement) => (
                              <li key={achievement}>{achievement}</li>
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
      })}
    </div>
  );
}
