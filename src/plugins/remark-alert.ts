/**
 * remark-alert — converts fenced code blocks with `lang="alert"` to daisyUI
 * alert HTML.
 *
 * Syntax (inside a ```alert … ``` block):
 *
 *   type:        info | success | warning | error
 *   style:       soft | outline | dash
 *   direction:   vertical | horizontal | responsive
 *   icon:        lucide:info  (any @iconify-json/* package name)  |  none
 *   title:       Short bold heading
 *   description: Body text (or remaining non-key lines)
 *   class:       Extra Tailwind / daisyUI classes to append
 *
 * All fields are optional. Lines that are not recognised key: value pairs
 * are collected as the description.
 *
 * Examples:
 *
 *   ```alert
 *   type: info
 *   description: A simple info alert.
 *   ```
 *
 *   ```alert
 *   type: success
 *   style: soft
 *   icon: lucide:check-circle
 *   title: Purchase confirmed!
 *   description: Your order has been placed successfully.
 *   ```
 *
 *   ```alert
 *   type: warning
 *   style: outline
 *   icon: none
 *   We use cookies for no reason.
 *   ```
 */

import { createRequire } from 'node:module';
import { getIconData, iconToSVG } from '@iconify/utils';
import type { IconifyJSON } from '@iconify/types';

// createRequire lets us load JSON files (CJS-compatible) from an ESM module.
const _require = createRequire(import.meta.url);
const iconSetCache = new Map<string, IconifyJSON | null>();

/** Load an @iconify-json/<prefix>/icons.json on first use and cache it. */
function loadIconSet(prefix: string): IconifyJSON | null {
  if (iconSetCache.has(prefix)) return iconSetCache.get(prefix) ?? null;
  try {
    const data = _require(`@iconify-json/${prefix}/icons.json`) as IconifyJSON;
    iconSetCache.set(prefix, data);
    return data;
  } catch {
    iconSetCache.set(prefix, null);
    return null;
  }
}

/** Default icon name for each alert type when no icon is explicitly given. */
const DEFAULT_ICONS: Record<string, string> = {
  info: 'lucide:info',
  success: 'lucide:check-circle',
  warning: 'lucide:triangle-alert',
  error: 'lucide:x-circle',
};

const RECOGNISED_KEYS = new Set([
  'type',
  'style',
  'direction',
  'icon',
  'title',
  'description',
  'class',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Build an inline SVG string for an iconify icon name (e.g. "lucide:info").
 * Returns an empty string if the icon cannot be resolved.
 */
function buildIconSvg(iconName: string): string {
  const colon = iconName.indexOf(':');
  if (colon === -1) return '';

  const prefix = iconName.slice(0, colon);
  const name = iconName.slice(colon + 1);

  const iconSet = loadIconSet(prefix);
  if (!iconSet) return '';

  const iconData = getIconData(iconSet, name);
  if (!iconData) return '';

  const rendered = iconToSVG(iconData);
  const attrStr = Object.entries(rendered.attributes)
    .map(([k, v]) => `${k}="${escapeHtml(String(v))}"`)
    .join(' ');

  return `<svg ${attrStr} class="h-6 w-6 shrink-0" aria-hidden="true">${rendered.body}</svg>`;
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

interface AlertOptions {
  type?: string;
  style?: string;
  direction?: string;
  icon?: string;
  title?: string;
  description?: string;
  class?: string;
}

function parseAlertBlock(raw: string): AlertOptions {
  const opts: Record<string, string> = {};
  const extraLines: string[] = [];

  for (const line of raw.split('\n')) {
    const colon = line.indexOf(':');
    if (colon > 0) {
      const key = line.slice(0, colon).trim().toLowerCase();
      if (RECOGNISED_KEYS.has(key)) {
        opts[key] = line.slice(colon + 1).trim();
        continue;
      }
    }
    extraLines.push(line);
  }

  // Lines that didn't match a key become the description (if none was given).
  if (!opts['description']) {
    const extra = extraLines.join('\n').trim();
    if (extra) opts['description'] = extra;
  }

  return opts as AlertOptions;
}

// ---------------------------------------------------------------------------
// HTML builder
// ---------------------------------------------------------------------------

function buildAlertHtml(opts: AlertOptions): string {
  // ── CSS classes ──────────────────────────────────────────────────────────
  const classes: string[] = ['alert'];

  if (opts.type) classes.push(`alert-${opts.type}`);
  if (opts.style) classes.push(`alert-${opts.style}`);

  const hasTitle = Boolean(opts.title);

  switch (opts.direction) {
    case 'vertical':
      classes.push('alert-vertical');
      break;
    case 'horizontal':
      classes.push('alert-horizontal');
      break;
    case 'responsive':
      classes.push('alert-vertical', 'sm:alert-horizontal');
      break;
    default:
      // When a title is present, stack vertically on mobile and switch to
      // horizontal on sm+ — matching the daisyUI "title + description" example.
      if (hasTitle) classes.push('alert-vertical', 'sm:alert-horizontal');
      break;
  }

  if (opts.class) classes.push(opts.class);

  // ── Icon SVG ─────────────────────────────────────────────────────────────
  let iconSvg = '';
  if (opts.icon !== 'none') {
    const iconName = opts.icon ?? (opts.type ? DEFAULT_ICONS[opts.type] : undefined);
    if (iconName) iconSvg = buildIconSvg(iconName);
  }

  // ── Content ──────────────────────────────────────────────────────────────
  let content = '';

  if (hasTitle) {
    // Title + optional description — use the daisyUI nested-div structure.
    // Override .prose-chirpy h3 margins with inline styles so heading
    // spacing from the theme does not bleed into the alert box.
    const titleHtml = `<h3 class="font-bold" style="margin:0;font-size:1rem;font-weight:700;">${escapeHtml(opts.title!)}</h3>`;
    const descHtml = opts.description
      ? `<div class="text-xs">${escapeHtml(opts.description)}</div>`
      : '';
    content = `<div>${titleHtml}${descHtml}</div>`;
  } else if (opts.description) {
    content = `<span>${escapeHtml(opts.description)}</span>`;
  }

  return `<div role="alert" class="${classes.join(' ')}">${iconSvg}${content}</div>`;
}

// ---------------------------------------------------------------------------
// Remark plugin
// ---------------------------------------------------------------------------

type MdNode = {
  type: string;
  lang?: string | null;
  value?: string | null;
  children?: MdNode[];
};

export function remarkAlert() {
  return (tree: MdNode) => {
    function visit(node: MdNode) {
      if (!Array.isArray(node.children)) return;

      for (const child of node.children) {
        if (child.type === 'code' && child.lang === 'alert') {
          child.type = 'html';
          child.value = buildAlertHtml(parseAlertBlock(child.value ?? ''));
          // No need to recurse into this node — it is now raw HTML.
        } else {
          visit(child);
        }
      }
    }

    visit(tree);
  };
}
