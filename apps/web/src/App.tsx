import { useRoutes, type RouteObject } from 'react-router-dom'
import Layout from './components/Layout'
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

export const townSlugs = [
  'beach-haven',
  'ship-bottom',
  'surf-city',
  'harvey-cedars',
  'barnegat-light',
  'long-beach-township',
]

// Routes as a data array so the same definition drives client hydration
// (BrowserRouter) and static prerendering (StaticRouter) without duplication.
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <TodayPage /> },
      { path: 'beaches', element: <BeachesPage /> },
      { path: 'beaches/:town', element: <BeachTownPage /> },
      { path: 'beaches/:town/:street', element: <BeachAccessPage /> },
      { path: 'towns', element: <TownsPage /> },
      { path: 'lbi-conditions', element: <ConditionsPage /> },
      { path: 'accessibility', element: <AccessibilityPage /> },
      { path: 'accessibility/beach-access', element: <AccessibilityPage /> },
      { path: 'accessibility/:town', element: <AccessibilityPage /> },
      { path: 'eat/:category?', element: <EatPage /> },
      { path: 'eat/:town/:slug', element: <EatPage /> },
      { path: 'do/:category?', element: <DoPage /> },
      { path: 'getting-around/*', element: <GettingAroundPage /> },
      { path: 'alerts', element: <AlertsPage /> },

      // Top-level town guide routes (SEO landing pages)
      ...townSlugs.map(slug => ({
        path: slug,
        element: <TownGuidePage slug={slug} />,
      })),

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

// Shared between client + server entries; must be rendered inside a Router.
export function AppRoutes() {
  return useRoutes(routes)
}
