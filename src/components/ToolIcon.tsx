import {
  siC,
  siCss,
  siCplusplus,
  siDocker,
  siFastapi,
  siGit,
  siHtml5,
  siJira,
  siJupyter,
  siLinux,
  siNumpy,
  siOpenaigym,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRos,
  siTailwindcss,
  siTrello,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'

// One-color logos for the Toolkit section, drawn in the text color so they follow light and dark
// mode. Keys must match the item names in about.skills in content.ts. Anything not listed here
// (Azure DevOps, VS Code, Microsoft 365, PyBullet, the product skills) shows as text only, because
// Simple Icons (CC0) has no logo for them.
const icons: Record<string, SimpleIcon> = {
  Python: siPython,
  TypeScript: siTypescript,
  React: siReact,
  TailwindCSS: siTailwindcss,
  FastAPI: siFastapi,
  'C/C++': siCplusplus,
  C: siC,
  PyTorch: siPytorch,
  ROS: siRos,
  'SQL (PostgreSQL)': siPostgresql,
  'HTML/CSS': siHtml5,
  CSS: siCss,
  Linux: siLinux,
  Pandas: siPandas,
  NumPy: siNumpy,
  Gym: siOpenaigym,
  Jira: siJira,
  Trello: siTrello,
  Git: siGit,
  Docker: siDocker,
  JupyterLab: siJupyter,
}

export const hasIcon = (name: string) => name in icons

export default function ToolIcon({ name }: { name: string }) {
  const icon = icons[name]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" className="shrink-0 fill-current">
      <path d={icon.path} />
    </svg>
  )
}
