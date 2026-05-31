import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { buildHeadTags } from './lib/seo'

// Renders a single route to body HTML for static prerendering.
// Used at build time by prerender.mjs — never shipped to the client.
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

// Per-page <head> SEO block (unique title, description, canonical, OG/Twitter).
export function getHead(url: string): string {
  return buildHeadTags(url)
}
