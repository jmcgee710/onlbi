import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, useRoutes } from 'react-router-dom'
import { buildRoutes } from './routes'
import { buildHeadTags } from './lib/seo'

// STATIC page imports — the server must not use lazy(): renderToString cannot
// wait for a chunk and would prerender the Suspense fallback instead of the
// real page content.
import TodayPage from './pages/TodayPage'
import BeachesPage from './pages/BeachesPage'
import BeachTownPage from './pages/BeachTownPage'
import BeachAccessPage from './pages/BeachAccessPage'
import AccessibilityPage from './pages/AccessibilityPage'
import EatPage from './pages/EatPage'
import DoPage from './pages/DoPage'
import GettingAroundPage from './pages/GettingAroundPage'
import AlertsPage from './pages/AlertsPage'
import TownGuidePage from './pages/TownGuidePage'
import TownsPage from './pages/TownsPage'
import ConditionsPage from './pages/ConditionsPage'
import NotFoundPage from './pages/NotFoundPage'

const serverRoutes = buildRoutes({
  TodayPage,
  BeachesPage,
  BeachTownPage,
  BeachAccessPage,
  AccessibilityPage,
  EatPage,
  DoPage,
  GettingAroundPage,
  AlertsPage,
  TownGuidePage,
  TownsPage,
  ConditionsPage,
  NotFoundPage,
})

function ServerAppRoutes() {
  return useRoutes(serverRoutes)
}

// Renders a single route to body HTML for static prerendering.
// Used at build time by prerender.mjs — never shipped to the client.
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <ServerAppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

// Per-page <head> SEO block (unique title, description, canonical, OG/Twitter).
export function getHead(url: string): string {
  return buildHeadTags(url)
}
