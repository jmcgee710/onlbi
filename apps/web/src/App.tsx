import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import { buildRoutes, townSlugs, type PageModules } from './routes'

export { townSlugs }

// CLIENT-ONLY module — entry-server.tsx must import from './routes', never
// from here, or the SSR build re-bundles every dynamic import below.
//
// One chunk per page via dynamic import. On first load the prerendered HTML
// stays visible inside Layout's <Suspense> boundary until the matched page's
// chunk arrives, then React hydrates it in place. Client-side navigations are
// wrapped in startTransition by React Router, so the old page stays up while
// the next chunk loads.
const clientPages: PageModules = {
  TodayPage: lazy(() => import('./pages/TodayPage')),
  BeachesPage: lazy(() => import('./pages/BeachesPage')),
  BeachTownPage: lazy(() => import('./pages/BeachTownPage')),
  BeachAccessPage: lazy(() => import('./pages/BeachAccessPage')),
  AccessibilityPage: lazy(() => import('./pages/AccessibilityPage')),
  EatPage: lazy(() => import('./pages/EatPage')),
  DoPage: lazy(() => import('./pages/DoPage')),
  GettingAroundPage: lazy(() => import('./pages/GettingAroundPage')),
  AlertsPage: lazy(() => import('./pages/AlertsPage')),
  TownGuidePage: lazy(() => import('./pages/TownGuidePage')),
  TownsPage: lazy(() => import('./pages/TownsPage')),
  ConditionsPage: lazy(() => import('./pages/ConditionsPage')),
  NotFoundPage: lazy(() => import('./pages/NotFoundPage')),
}

export const routes = buildRoutes(clientPages)

export function AppRoutes() {
  return useRoutes(routes)
}
