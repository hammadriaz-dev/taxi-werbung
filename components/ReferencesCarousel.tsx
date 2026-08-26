"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Reference = { src: string; name: string };

const AUTOPLAY_INTERVAL_MS = 5000;
// After any manual interaction (click/swipe), autoplay pauses briefly instead
// of immediately fighting the user's choice, then resumes on its own.
const RESUME_AFTER_MS = 8000;

export default function ReferencesCarousel({
  items,
  captions,
  prevLabel,
  nextLabel,
}: {
  items: Reference[];
  captions: string[];
  prevLabel: string;
  nextLabel: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((current) => (current + dir + items.length) % items.length);
    },
    [items.length]
  );

  // Pause autoplay for a bit after the visitor interacts manually, then let it resume.
  const pauseThenResume = useCallback(() => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  // Auto-advance every few seconds; pauses while the visitor is hovering,
  // has recently interacted, or the tab isn't visible.
  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [items.length, paused, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) {
      go(-1);
      pauseThenResume();
    } else if (delta < -40) {
      go(1);
      pauseThenResume();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="w-full overflow-hidden rounded-2xl border border-line bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image strip — arrows are positioned against this box only, so they always
          sit centered on the photo regardless of how long the caption below is.
          object-contain (not cover) so tall reference photos are never cropped. */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-[16/10] bg-ink/5"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {items.map((ref, i) => (
            <div key={ref.src} className="relative h-full w-full shrink-0">
              <Image
                src={ref.src}
                alt={`${ref.name} — Taxiwerbung Kampagne`}
                fill
                sizes="(min-width: 1024px) 900px, 100vw"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label={prevLabel}
              onClick={() => {
                go(-1);
                pauseThenResume();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-cream hover:bg-ink transition-colors"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => {
                go(1);
                pauseThenResume();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-cream hover:bg-ink transition-colors"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Caption for the active slide only — sits below the image box, so it
          never affects where the arrows are positioned above. */}
      <div className="flex items-start gap-3 p-5 md:p-6">
        <span className="font-mono text-xs text-amberDark shrink-0 pt-1">
          {String(active + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-ink">{items[active].name}</h3>
          <p className="mt-1 text-sm text-charcoal/70 leading-relaxed">
            {captions[active] ?? ""}
          </p>
        </div>
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 pb-5 md:pb-6">
          {items.map((ref, i) => (
            <button
              key={ref.src}
              type="button"
              aria-label={ref.name}
              onClick={() => {
                setActive(i);
                pauseThenResume();
              }}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-amber" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
