/**
 * Lightweight reading-time estimator. We avoid the full `reading-time` package
 * here because the post body is consumed via Astro's `render()` and we have
 * a numeric word count already.
 */

const WORDS_PER_MINUTE = 220;

export interface ReadingTime {
  /** Whole minutes, minimum 1. */
  minutes: number;
  /** Word count. */
  words: number;
}

export function readingTime(text: string): ReadingTime {
  const words = text
    .replace(/```[\s\S]*?```/g, ' ') // strip fenced code
    .replace(/<[^>]+>/g, ' ') // strip html
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
  return {
    words,
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}
