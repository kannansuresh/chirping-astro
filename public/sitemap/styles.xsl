<?xml version="1.0" encoding="UTF-8"?>
<!--
  Human-readable XSL stylesheet for sitemap.xml / sitemap-index.xml.
  Browsers apply this transform when a user opens the sitemap directly;
  search engine crawlers ignore it and read the raw <urlset>/<sitemapindex>.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <title>XML Sitemap</title>
        <style>
          :root {
            color-scheme: light dark;
            --bg: #f6f7f8;
            --card: #ffffff;
            --text: #1f2328;
            --muted: #6b7280;
            --border: #e8e8e8;
            --primary: #2a408e;
            --primary-soft: #e7ecf7;
            --row-hover: #fafbfd;
            --code-bg: #f1f3f5;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #1b1b1e;
              --card: #1e1e1f;
              --text: #e6e7e9;
              --muted: #9ca3af;
              --border: #2a2a2d;
              --primary: #7895d4;
              --primary-soft: #232a3d;
              --row-hover: #232427;
              --code-bg: #232427;
            }
          }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; }
          body {
            background: var(--bg);
            color: var(--text);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            font-size: 16px;
            line-height: 1.6;
          }
          a { color: var(--primary); text-decoration: none; }
          a:hover { text-decoration: underline; }
          .wrap { max-width: 64rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
          .badge {
            display: inline-flex; align-items: center; gap: .375rem;
            background: var(--primary-soft); color: var(--primary);
            font-size: .75rem; font-weight: 600; letter-spacing: .04em;
            text-transform: uppercase; padding: .25rem .625rem;
            border-radius: 9999px;
          }
          h1 {
            font-size: clamp(1.75rem, 2.4vw + 1rem, 2.5rem);
            line-height: 1.2; margin: .75rem 0 .5rem;
          }
          .lede { color: var(--muted); margin: 0 0 1.5rem; max-width: 48rem; }
          .notice {
            background: var(--card); border: 1px solid var(--border);
            border-radius: .5rem; padding: 1rem 1.125rem;
            display: flex; gap: .875rem; align-items: flex-start;
            margin-bottom: 2rem;
          }
          .notice strong { color: var(--text); }
          .notice p { margin: .25rem 0 0; color: var(--muted); font-size: .9rem; }
          .notice code {
            background: var(--code-bg); padding: .1rem .35rem;
            border-radius: .25rem; font-size: .85em;
          }
          .meta { color: var(--muted); font-size: .85rem; margin: 0 0 1rem; }
          .table-card {
            background: var(--card); border: 1px solid var(--border);
            border-radius: .5rem; overflow: hidden;
          }
          table { width: 100%; border-collapse: collapse; }
          thead th {
            text-align: left; font-size: .72rem; letter-spacing: .06em;
            text-transform: uppercase; color: var(--muted); font-weight: 600;
            padding: .75rem 1rem; background: var(--card);
            border-bottom: 1px solid var(--border);
          }
          tbody td {
            padding: .65rem 1rem; border-bottom: 1px solid var(--border);
            font-size: .9rem; vertical-align: top;
            word-break: break-all;
          }
          tbody tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: var(--row-hover); }
          .num { color: var(--muted); font-variant-numeric: tabular-nums; width: 3rem; }
          .pri, .freq, .date { color: var(--muted); white-space: nowrap; font-size: .82rem; }
          .alt { font-size: .75rem; color: var(--muted); margin-top: .25rem; }
          .alt span { display: inline-block; margin-right: .5rem; }
          footer {
            margin-top: 3rem; padding-top: 1.25rem;
            border-top: 1px solid var(--border);
            color: var(--muted); font-size: .85rem;
          }
        </style>
      </head>
      <body>
        <main class="wrap">
          <span class="badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7" />
              <path d="M9 22V12h6v10" />
            </svg>
            XML Sitemap
          </span>

          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">
              <h1>Sitemap Index</h1>
              <p class="lede">
                This index references one or more sub-sitemaps. Each link below points
                to a sitemap file containing URLs for search engines to crawl.
              </p>
              <div class="notice">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;margin-top:2px;color:var(--primary)">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <strong>This is an XML sitemap</strong>, intended for search engines.
                  <p>
                    Read the <a href="https://www.sitemaps.org/protocol.html">sitemap protocol</a>
                    or generated by <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/">@astrojs/sitemap</a>.
                  </p>
                </div>
              </div>
              <p class="meta">
                <strong><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)" /></strong>
                sitemap file(s)
              </p>
              <div class="table-card">
                <table>
                  <thead>
                    <tr>
                      <th class="num">#</th>
                      <th>Sitemap</th>
                      <th class="date">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td class="num"><xsl:value-of select="position()" /></td>
                        <td>
                          <a>
                            <xsl:attribute name="href"><xsl:value-of select="sitemap:loc" /></xsl:attribute>
                            <xsl:value-of select="sitemap:loc" />
                          </a>
                        </td>
                        <td class="date">
                          <xsl:value-of select="sitemap:lastmod" />
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:when>
            <xsl:otherwise>
              <h1>URL Sitemap</h1>
              <p class="lede">
                Every URL listed below is included in this site's sitemap and may be
                discovered by search engines.
              </p>
              <div class="notice">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;margin-top:2px;color:var(--primary)">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <strong>This is an XML sitemap</strong>, intended for search engines.
                  <p>
                    Read the <a href="https://www.sitemaps.org/protocol.html">sitemap protocol</a>
                    or learn about <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/">@astrojs/sitemap</a>.
                  </p>
                </div>
              </div>
              <p class="meta">
                <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)" /></strong>
                URL(s)
              </p>
              <div class="table-card">
                <table>
                  <thead>
                    <tr>
                      <th class="num">#</th>
                      <th>URL</th>
                      <th class="date">Last Modified</th>
                      <th class="freq">Change</th>
                      <th class="pri">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td class="num"><xsl:value-of select="position()" /></td>
                        <td>
                          <a>
                            <xsl:attribute name="href"><xsl:value-of select="sitemap:loc" /></xsl:attribute>
                            <xsl:value-of select="sitemap:loc" />
                          </a>
                          <xsl:if test="xhtml:link">
                            <div class="alt">
                              <xsl:for-each select="xhtml:link[@rel='alternate']">
                                <span>
                                  <xsl:value-of select="@hreflang" />:
                                  <a>
                                    <xsl:attribute name="href"><xsl:value-of select="@href" /></xsl:attribute>
                                    <xsl:value-of select="@href" />
                                  </a>
                                </span>
                              </xsl:for-each>
                            </div>
                          </xsl:if>
                        </td>
                        <td class="date"><xsl:value-of select="sitemap:lastmod" /></td>
                        <td class="freq"><xsl:value-of select="sitemap:changefreq" /></td>
                        <td class="pri"><xsl:value-of select="sitemap:priority" /></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:otherwise>
          </xsl:choose>

          <footer>
            Generated by <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/">@astrojs/sitemap</a>.
            Stylesheet served from <code>/sitemap/styles.xsl</code>.
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
