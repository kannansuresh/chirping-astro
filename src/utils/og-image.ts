/**
 * OG Image generator using Satori + Resvg.
 *
 * Produces a 1200×630 PNG matching the Chirpy Astro theme style:
 * - Indigo-blue gradient background (primary color)
 * - White card with title, description, category, date, and site branding
 * - Clean typography with good contrast
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '../config';

export interface OgImageData {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

const WIDTH = 1200;
const HEIGHT = 630;

// Load font files from @fontsource/inter (bundled locally, no network needed).
const fontsDir = join(process.cwd(), 'node_modules/@fontsource/inter/files');
const fontRegular = readFileSync(join(fontsDir, 'inter-latin-400-normal.woff'));
const fontBold = readFileSync(join(fontsDir, 'inter-latin-700-normal.woff'));

/**
 * Generate a themed OG image as a PNG buffer.
 */
export async function generateOgImage(data: OgImageData): Promise<Buffer> {
  // Truncate for readability at OG image dimensions.
  const desc = data.description
    ? data.description.length > 120
      ? data.description.slice(0, 117) + '…'
      : data.description
    : '';
  const title = data.title.length > 80 ? data.title.slice(0, 77) + '…' : data.title;

  // Build tag elements for the bottom right.
  const bottomRight =
    data.tags && data.tags.length > 0
      ? data.tags.slice(0, 3).map((tag) => ({
          type: 'div',
          props: {
            style: {
              display: 'flex',
              fontSize: '16px',
              color: '#6b7280',
              backgroundColor: '#f3f4f6',
              padding: '4px 12px',
              borderRadius: '12px',
            },
            children: `#${tag}`,
          },
        }))
      : [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '18px',
                color: '#9ca3af',
              },
              children: new URL(SITE.url).hostname,
            },
          },
        ];

  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2a408e 40%, #4a6cf7 100%)',
        padding: '40px',
      },
      children: {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '48px 56px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          },
          children: [
            // === TOP ROW: category + date ===
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        backgroundColor: data.category ? '#eef2ff' : 'transparent',
                        color: '#2a408e',
                        fontSize: '18px',
                        fontWeight: 700,
                        padding: data.category ? '8px 20px' : '0',
                        borderRadius: '24px',
                        border: data.category ? '1.5px solid #c7d2fe' : 'none',
                      },
                      children: data.category ?? '',
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        color: '#6b7280',
                        fontSize: '18px',
                      },
                      children: data.date ?? '',
                    },
                  },
                ],
              },
            },
            // === MIDDLE: title + description ===
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: '1',
                  justifyContent: 'center',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        fontSize: title.length > 60 ? '36px' : '44px',
                        fontWeight: 700,
                        color: '#1f2937',
                        lineHeight: 1.2,
                      },
                      children: title,
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        fontSize: '22px',
                        color: '#6b7280',
                        lineHeight: 1.4,
                      },
                      children: desc,
                    },
                  },
                ],
              },
            },
            // === BOTTOM ROW: branding + tags ===
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderTop: '2px solid #e5e7eb',
                  paddingTop: '24px',
                },
                children: [
                  // Left: brand dot + site name
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              backgroundColor: '#2a408e',
                            },
                            children: '',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              fontSize: '22px',
                              fontWeight: 700,
                              color: '#2a408e',
                            },
                            children: SITE.title,
                          },
                        },
                      ],
                    },
                  },
                  // Right: tags or hostname
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        gap: '8px',
                      },
                      children: bottomRight,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = await satori(markup as any, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}
