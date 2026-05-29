import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import NotFoundPage from './pages/NotFoundPage'

const townSlugs = [
  'beach-haven',
  'ship-bottom',
  'surf-city',
  'harvey-cedars',
  'barnegat-light',
  'long-beach-township',
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<TodayPage />} />
          <Route path="beaches" element={<BeachesPage />} />
          <Route path="beaches/:town" element={<BeachTownPage />} />
          <Route path="beaches/:town/:street" element={<BeachAccessPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="accessibility/beach-access" element={<AccessibilityPage />} />
          <Route path="accessibility/:town" element={<AccessibilityPage />} />
          <Route path="eat/:category?" element={<EatPage />} />
          <Route path="eat/:town/:slug" element={<EatPage />} />
          <Route path="do/:category?" element={<DoPage />} />
          <Route path="getting-around/*" element={<GettingAroundPage />} />
          <Route path="alerts" element={<AlertsPage />} />

          {/* Top-level town guide routes (SEO landing pages) */}
          {townSlugs.map(slug => (
            <Route key={slug} path={slug} element={<TownGuidePage slug={slug} />} />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
