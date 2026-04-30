<?xml version="1.0" encoding="UTF-8"?>
<!--
  Human-readable XSL stylesheet for RSS 2.0 feeds.
  Browsers apply this transform when a user opens /rss.xml directly,
  while feed readers ignore it and consume the raw <channel>/<item> XML.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <title>RSS Feed · <xsl:value-of select="/rss/channel/title" /></title>
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
            -webkit-font-smoothing: antialiased;
          }
          a { color: var(--primary); text-decoration: none; }
          a:hover { text-decoration: underline; }
          .wrap { max-width: 56rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
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
          .meta {
            color: var(--muted); font-size: .85rem;
            margin: 0 0 1.25rem;
          }
          ol.items { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
          .item {
            background: var(--card); border: 1px solid var(--border);
            border-radius: .5rem; padding: 1.125rem 1.25rem;
            transition: border-color .15s ease, transform .15s ease;
          }
          .item:hover { border-color: var(--primary); }
          .item h2 { font-size: 1.15rem; margin: 0 0 .35rem; line-height: 1.35; }
          .item .date {
            display: inline-block; color: var(--muted);
            font-size: .8rem; margin-bottom: .5rem;
          }
          .item p.desc { margin: .35rem 0 .5rem; color: var(--text); }
          .tags { display: flex; flex-wrap: wrap; gap: .35rem; margin-top: .5rem; }
          .tag {
            font-size: .72rem; letter-spacing: .03em;
            background: var(--primary-soft); color: var(--primary);
            padding: .15rem .5rem; border-radius: 9999px;
          }
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
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            RSS Feed
          </span>
          <h1><xsl:value-of select="/rss/channel/title" /></h1>
          <p class="lede"><xsl:value-of select="/rss/channel/description" /></p>

          <div class="notice">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;margin-top:2px;color:var(--primary)">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <strong>This is a web feed</strong>, also known as an RSS feed.
              <p>
                Subscribe by copying the URL from the address bar into your
                feed reader, or visit
                <a>
                  <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link" /></xsl:attribute>
                  the site homepage
                </a>.
              </p>
            </div>
          </div>

          <p class="meta">
            <strong><xsl:value-of select="count(/rss/channel/item)" /></strong>
            <xsl:choose>
              <xsl:when test="count(/rss/channel/item) = 1"> entry</xsl:when>
              <xsl:otherwise> entries</xsl:otherwise>
            </xsl:choose>
            ·
            <a>
              <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link" /></xsl:attribute>
              Visit website &#8594;
            </a>
          </p>

          <ol class="items">
            <xsl:for-each select="/rss/channel/item">
              <li class="item">
                <h2>
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link" /></xsl:attribute>
                    <xsl:value-of select="title" />
                  </a>
                </h2>
                <span class="date"><xsl:value-of select="pubDate" /></span>
                <p class="desc"><xsl:value-of select="description" /></p>
                <xsl:if test="category">
                  <div class="tags">
                    <xsl:for-each select="category">
                      <span class="tag">#<xsl:value-of select="." /></span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ol>

          <footer>
            Generated by <a href="https://docs.astro.build/en/recipes/rss/">@astrojs/rss</a>.
            Stylesheet served from <code>/rss/styles.xsl</code>.
          </footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
