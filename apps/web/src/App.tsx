import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TodayPage from './pages/TodayPage'
import BeachesPage from './pages/BeachesPage'
import BeachTownPage from './pages/BeachTownPage'
import BeachAccessPage from './pages/BeachAccessPage'
import AccessibilityPage from './pages/AccessibilityPage'
import ParkingPage from './pages/ParkingPage'
import EatPage from './pages/EatPage'
import DoPage from './pages/DoPage'
import GettingAroundPage from './pages/GettingAroundPage'
import AlertsPage from './pages/AlertsPage'
import NotFoundPage from './pages/NotFoundPage'

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
          <Route path="parking" element={<ParkingPage />} />
          <Route path="parking/:town" element={<ParkingPage />} />
          <Route path="eat/:category?" element={<EatPage />} />
          <Route path="eat/:town/:slug" element={<EatPage />} />
          <Route path="do/:category?" element={<DoPage />} />
          <Route path="getting-around/*" element={<GettingAroundPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
