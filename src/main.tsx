import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ResearchPage from './pages/ResearchPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'
import type { PageKey } from './components/Layout'

// Each HTML file sets <body data-page="..."> to choose which page to render.
const pages: Record<PageKey, ComponentType> = {
  home: HomePage,
  work: WorkPage,
  research: ResearchPage,
  projects: ProjectsPage,
  about: AboutPage,
  'case-studies': PortfolioPage,
}
const Current = pages[document.body.dataset.page as PageKey] ?? HomePage

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Current />
  </StrictMode>,
)
