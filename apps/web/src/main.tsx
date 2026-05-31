import './index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './App'

const rootEl = document.getElementById('root')!

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered routes ship server HTML inside #root → hydrate it.
// Non-prerendered routes (404, stub pages) ship an empty shell → client-render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
