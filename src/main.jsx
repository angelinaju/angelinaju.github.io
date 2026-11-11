import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ResearchPage from './pages/ResearchPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import PortfolioPage from './pages/PortfolioPage'

// Each HTML file sets <body data-page="..."> to choose which page to render.
const pages = {
  home: HomePage,
  work: WorkPage,
  research: ResearchPage,
  projects: ProjectsPage,
  about: AboutPage,
  'case-studies': PortfolioPage,
}
const Current = pages[document.body.dataset.page] ?? HomePage

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Current />
  </StrictMode>,
)
