import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'
import Layout from './components/Layout'

export const townSlugs = [
  'beach-haven',
  'ship-bottom',
  'surf-city',
  'harvey-cedars',
  'barnegat-light',
  'long-beach-township',
  // Long Beach Township section guides — top-level SEO landing pages
  'holgate',
  'loveladies',
  'north-beach',
  'brant-beach',
]

// Every page component the route table needs. The client (App.tsx) passes
// lazy() versions (one chunk per page); the server (entry-server.tsx) passes
// static imports, because renderToString cannot wait for a lazy chunk and
// would emit the Suspense fallback instead of real content.
export type PageModules = {
  TodayPage: ComponentType
  BeachesPage: ComponentType
  BeachTownPage: ComponentType
  BeachAccessPage: ComponentType
  AccessibilityPage: ComponentType
  EatPage: ComponentType
  DoPage: ComponentType
  GettingAroundPage: ComponentType
  AlertsPage: ComponentType
  TownGuidePage: ComponentType<{ slug: string }>
  TownsPage: ComponentType
  ConditionsPage: ComponentType
  NotFoundPage: ComponentType
}

// Routes as a data array so the same definition drives client hydration
// (BrowserRouter) and static prerendering (StaticRouter) without duplication.
export function buildRoutes(P: PageModules): RouteObject[] {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <P.TodayPage /> },
        { path: 'beaches', element: <P.BeachesPage /> },
        { path: 'beaches/:town', element: <P.BeachTownPage /> },
        { path: 'beaches/:town/:street', element: <P.BeachAccessPage /> },
        { path: 'towns', element: <P.TownsPage /> },
        { path: 'lbi-conditions', element: <P.ConditionsPage /> },
        { path: 'accessibility', element: <P.AccessibilityPage /> },
        { path: 'accessibility/beach-access', element: <P.AccessibilityPage /> },
        { path: 'accessibility/:town', element: <P.AccessibilityPage /> },
        { path: 'eat/:category?', element: <P.EatPage /> },
        { path: 'eat/:town/:slug', element: <P.EatPage /> },
        { path: 'do/:category?', element: <P.DoPage /> },
        { path: 'getting-around/*', element: <P.GettingAroundPage /> },
        { path: 'alerts', element: <P.AlertsPage /> },

        // Top-level town guide routes (SEO landing pages)
        ...townSlugs.map(slug => ({
          path: slug,
          element: <P.TownGuidePage slug={slug} />,
        })),

        { path: '*', element: <P.NotFoundPage /> },
      ],
    },
  ]
}
