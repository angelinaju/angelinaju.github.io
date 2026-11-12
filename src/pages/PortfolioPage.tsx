import type { ReactNode } from 'react'
import { Page, PageIntro, Note, IndexList, ROW, LEFT, MID } from '../components/Layout'

// Yellow note marking something you still need to add. Preview only. Delete each one once filled in.
function Todo({ children }: { children: ReactNode }) {
  return <Note>To add: {children}</Note>
}

// Role, dates, and place sit in the margin column, beside the story.
type Fact = [label: string, value: string]

function Facts({ items }: { items: Fact[] }) {
  return (
    <dl className={`${LEFT} mb-10 grid grid-cols-2 gap-x-6 gap-y-4 text-small md:sticky md:top-8 md:mb-0 md:grid-cols-1 md:self-start`}>
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-dim">{k}</dt>
          <dd className="font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

interface CaseStudyProps {
  id: string
  title: string
  summary: string
  facts: Fact[]
  children: ReactNode
}

function CaseStudy({ id, title, summary, facts, children }: CaseStudyProps) {
  return (
    <article id={id} className="scroll-mt-8 border-t border-fg/25 pt-5 pb-20 sm:pb-28">
      <h2 className="tight max-w-[20ch] text-h1 sm:text-[4.5rem] sm:leading-[0.98]">{title}</h2>
      <div className={`mt-12 sm:mt-16 ${ROW}`}>
        <Facts items={facts} />
        <div
          className={`${MID} space-y-4 [&_h3]:tight [&_h3]:mt-14 [&_h3]:mb-4 [&_h3]:text-h3 [&>h3:first-child]:mt-0`}
        >
          <p className="mb-10 text-lead">{summary}</p>
          {children}
        </div>
      </div>
    </article>
  )
}

// Simplified PegasusAI request flow. `mine` marks the steps Angelina built.
interface FlowGroup {
  where: string
  steps: [text: string, mine: boolean][]
}

export const pegasusFlow: FlowGroup[] = [
  {
    where: 'In the notebook',
    steps: [
      ['Student clicks the help button on a cell', true],
      ['The cell’s code, context, and question ID are sent to the server', true],
    ],
  },
  {
    where: 'On the server',
    steps: [
      ['A prompt is built from a template with the problem’s context', false],
      ['The LLM writes a response', false],
      ['The request, prompt, response, and timing are logged', false],
    ],
  },
  {
    where: 'Back in the notebook',
    steps: [
      ['The help appears right under the cell', true],
      ['The student rates it: “Did PegasusAI help?” Yes / Somewhat / No', true],
      ['The rating is logged and linked to the original request', false],
    ],
  },
]

export function FlowDiagram({ groups }: { groups: FlowGroup[] }) {
  let n = 0
  return (
    <figure id="pegasus-flow" className="scroll-mt-8 my-12 border-t border-b border-fg/25 py-5">
      <ol className="space-y-4">
        {groups.map((g) => (
          <li key={g.where}>
            <p className="pb-2 text-small font-medium">{g.where}</p>
            <ol className="space-y-1">
              {g.steps.map(([text, mine]) => {
                n += 1
                return (
                  <li
                    key={text}
                    className={`grid grid-cols-[1.75rem_1fr] px-3 py-2 leading-snug ${
                      mine ? 'bg-fg font-medium text-ground' : 'text-dim'
                    }`}
                  >
                    <span className="tabular-nums">{n}</span>
                    <span>
                      {text}
                      {mine && <span className="sr-only"> (built by me)</span>}
                    </span>
                  </li>
                )
              })}
            </ol>
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-small text-dim">
        What happens when a student asks for help. The filled-in steps are the parts I built. I documented the
        rest of the flow.
      </figcaption>
    </figure>
  )
}

// Images waiting on permission to share publicly. They live in /drafts, which the production build never
// copies, and this frame only renders in local preview. Once you're cleared to share one: move its files to
// /public, update the paths where it’s used, swap <PreviewOnly> for a plain <figure>, and delete that
// component’s `import.meta.env.DEV` line. (The check sits in each component so the build drops the paths.)
function PreviewOnly({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return (
    <figure className="my-12 space-y-4 bg-note p-3 text-black sm:p-4">
      <p className="text-small font-medium">Preview only. Not on the live site until you get permission to share.</p>
      {children}
    </figure>
  )
}

function PreviewOnlyScreenshots() {
  if (!import.meta.env.DEV) return null
  return (
    <PreviewOnly>
      <img src="/drafts/pegasus/help-button.png" alt="A notebook cell that divides by zero, with the PegasusAI help button in its toolbar" className="w-full" />
      <img src="/drafts/pegasus/response.png" alt="The ZeroDivisionError traceback, with PegasusAI’s explanation and suggested fix shown directly under the cell" className="w-full" />
      <figcaption className="text-small">
        A student hits a ZeroDivisionError and clicks the help button. The explanation appears right under their
        cell.
      </figcaption>
    </PreviewOnly>
  )
}

function PreviewOnlyPoster() {
  if (!import.meta.env.DEV) return null
  return (
    <PreviewOnly>
      <a href="/drafts/robot/poster.pdf" target="_blank" rel="noreferrer">
        <img
          src="/drafts/robot/poster.png"
          alt="Research poster: Walking the Dog: Promoting Mobility and Emotional Support through Assistive Quadrupedal Robots for Dementia Care"
          className="w-full"
        />
      </a>
      <figcaption className="text-small">
        My first-author poster, presented at EUReCA 2025.{' '}
        <a className="link" href="/drafts/robot/poster.pdf" target="_blank" rel="noreferrer">
          Open the full PDF
        </a>
      </figcaption>
    </PreviewOnly>
  )
}

export default function Portfolio() {
  return (
    <Page current="case-studies">
        <PageIntro
          title="Case studies"
          count={3}
          lead="Thanks for taking a look. These are longer write-ups than fit on a resume: what the problem was, what I did, and what I learned."
        />
        <div className="mb-24">
          <IndexList
            label="Case studies"
            items={[
              { href: '#aria-guide', title: 'ARIA Guide user guides', context: 'St. Jude Children’s Research Hospital', left: 'Product', right: '2026' },
              { href: '#pegasus', title: 'PegasusAI, help inside the notebook', context: 'Global Computing Lab & EPIC Lab, UTK', left: 'Research', right: '2025–' },
              { href: '#robot', title: 'Robot companions for dementia care', context: 'Zhao Robotics Lab & EPIC Lab, UTK', left: 'Research', right: '2024–25' },
            ]}
          />
        </div>

        <CaseStudy
          id="aria-guide"
          title="ARIA Guide: user guides for a global pediatric oncology platform"
          summary="ARIA Guide is St. Jude’s pediatric oncology knowledge platform, used by 1,500+ healthcare providers in low- and middle-income countries. As a product management intern, I coordinated its user guide: the materials that help providers register, navigate the portal, and apply the guidelines in practice."
          facts={[
            ['Role', 'Product Management Intern'],
            ['When', 'Jun – Aug 2026'],
            ['Where', 'St. Jude Children’s Research Hospital'],
            ['My part', 'Coordinated the user guide'],
          ]}
        >
          <h3>The problem</h3>
          <p>
            A clinical guidelines platform only helps patients if the providers using it can find their way around it.
            ARIA Guide’s users are busy clinicians across many countries and health systems, so the guide had to work
            for people with very different setups and experience with the platform.
          </p>
          <Todo>what made this hard, e.g. language, connectivity, varying familiarity with the platform.</Todo>

          <h3>What I did</h3>
          <p>
            I coordinated the user guide project. The materials are now public on the{' '}
            <a className="link" href="https://aria.stjude.org/user-guides">ARIA Guide user guides page</a>, covering
            registration, navigating the portal, the ARIA Guide’s terminology, troubleshooting, the admin app, and
            applying disease-based guidance and clinical practice recommendations.
          </p>
          <Todo>
            which pieces you owned or shaped (videos, quick reference guides, the toolkit), who you worked with, and a
            decision you made about structure or scope.
          </Todo>

          <h3>What I learned</h3>
          <Todo>a takeaway about writing for non-technical, international users.</Todo>
        </CaseStudy>

        <CaseStudy
          id="pegasus"
          title="PegasusAI: an AI assistant inside the notebook"
          summary="Students in a data engineering course could get AI help on a stuck cell with one click, without leaving JupyterLab. I built that help button and the experience around it, documented how the whole system moves data, and load-tested it for a full class."
          facts={[
            ['Role', 'Undergraduate researcher'],
            ['When', 'Aug 2025 – now'],
            ['Where', 'Global Computing Lab & EPIC Lab, UTK'],
            ['My part', 'Help button, architecture docs, load testing'],
          ]}
        >
          <h3>The problem</h3>
          <p>
            PegasusAI comes out of Pegasus, a workflow management system that scientists use to run large
            computational workflows. Our NSF-funded project is bringing AI assistance into it. Before putting an
            assistant in front of scientists and researchers, my PIs wanted to try the idea with students first: could
            we build an assistant that helps people work toward an answer, rather than just handing it to them?
          </p>
          <p>
            When students get stuck, switching to a separate chat window breaks their flow, and they have to explain
            their code and error from scratch. We wanted help to show up where the work was already happening, with
            the context already attached.
          </p>

          <h3>What I built: the help button</h3>
          <p>
            I built the piece students actually touch: a help button in each notebook cell’s toolbar. One click sends
            the cell’s code and context to the assistant, along with which question the student is working on, so
            students don’t have to describe the problem themselves. The answer appears directly under the cell,
            followed by a one-question rating: “Did PegasusAI help you accomplish what you wanted?”
          </p>
          <p>
            That rating mattered as much as the answer. It gives the research team a signal on every single
            interaction, not just the ones students choose to talk about in a survey.
          </p>
          <PreviewOnlyScreenshots />
          <p>
            There was almost no documentation on customizing JupyterLab’s interface this way, so I started from
            JupyterLab’s official{' '}
            <a className="link" href="https://github.com/jupyterlab/extension-examples">extension examples</a>,
            compared the places an assistant could live, and adapted the cell-toolbar example into the help bot.
          </p>
          <p>
            I chose the cell toolbar on purpose. It sits right next to the code the student is stuck on, so help is
            always within reach. And because the button already knows which cell it belongs to, students never have to
            write a question or paste in their code: the context goes along automatically. Putting the response
            directly under the cell kept the student’s eyes on their own work instead of in a separate panel.
          </p>
          <p className="text-small text-dim">
            An early prototype of the extension is on GitHub:{' '}
            <a className="link" href="https://github.com/angelinaju/jupyterlab-extension-vscode">
              jupyterlab-extension-vscode
            </a>
            . It isn’t the finished version deployed in the course.
          </p>

          <h3>Mapping the whole system</h3>
          <p>
            Beyond the button, I documented how PegasusAI works end to end: an architecture overview, the step-by-step
            data flow from click to logged feedback, and definitions for every field the system records.
          </p>
          <FlowDiagram groups={pegasusFlow} />
          <p>
            Every help request and every rating is stored as a structured record: who asked, which cell and problem,
            the prompt and response, how long each step took, and how the student rated it. Each rating links back to
            the request it was about. That structure is what lets the team study human–AI interaction as data,
            rather than reconstructing it from memory or surveys.
          </p>

          <h3>Making sure it held up</h3>
          <p>
            Before rolling out to a whole class, I load-tested the assistant’s model serving with different numbers of
            concurrent users to measure throughput and make sure students wouldn’t be left waiting.
          </p>

          <h3>Where the research is going</h3>
          <p>
            The deployment is the basis for ongoing research on students’ help-seeking styles, trust, and how
            helpful they found the assistant.
          </p>

          <h3>What I’d do next</h3>
          <p>
            Building the help button answered how to get AI help into the notebook. It also left me with questions
            about what that help should look like, which I’d like to keep exploring:
          </p>
          <ul className="space-y-6">
            <li>
              <p className="font-medium">How much detail should an AI assistant give a student?</p>
              <p className="mt-1 text-dim">
                Our goal was to help students work toward an answer, but a complete fix is often the easiest thing for
                a model to give. A hint, a guiding question, and a full solution each trade getting unstuck now
                against learning for next time. I want to understand when each one actually helps.
              </p>
            </li>
            <li>
              <p className="font-medium">What signs show that a student is becoming over-reliant on an AI assistant?</p>
              <p className="mt-1 text-dim">
                When help is one click away, it’s easy to reach for it before trying. Patterns in the interaction data,
                like how quickly students ask after an error or how often they ask about the same problem, might show
                when reliance stops being useful. The interface could then respond, for example by asking what the
                student thinks is wrong first.
              </p>
            </li>
            <li>
              <p className="font-medium">
                How should an AI assistant differ based on who’s using it: students, scientists, or programmers?
              </p>
              <p className="mt-1 text-dim">
                We started with students before bringing PegasusAI to scientists, and the two groups need different
                things. A student needs to learn, a scientist wants accurate answers about their workflow, and an
                experienced programmer may just want speed. The same assistant probably shouldn’t behave the same way
                for all three.
              </p>
            </li>
          </ul>
        </CaseStudy>

        <CaseStudy
          id="robot"
          title="Robot companions for dementia care"
          summary="Could a robot dog help older adults with dementia stay active and feel less alone? I worked across three teams exploring that, from robot control to planning a design session with older adults themselves."
          facts={[
            ['Role', 'Undergraduate researcher'],
            ['When', 'Mar 2024 – Apr 2025'],
            ['Where', 'Zhao Robotics Lab & EPIC Lab, UTK'],
            ['Output', 'First-author poster, EUReCA 2025'],
          ]}
        >
          <h3>The question</h3>
          <p>
            The number of older adults in the U.S. living with dementia is growing fast, and with it come challenges
            in mobility, social engagement, and cognitive decline. Physical activity and companionship both help, and
            both are hard to provide consistently. Our research question was simple: how open would older adults with
            dementia be to physical activity with a quadruped robot, like taking it for a walk?
          </p>
          <p>
            We worked with a Unitree Go2, a commercial four-legged robot. An earlier survey study
            from our lab found people were open to the idea of quadruped robots in dementia care, even though very few
            were familiar with them. That gap shaped how we planned to introduce the robot.
          </p>

          <h3>What I did</h3>
          <p>
            I used ROS and Python to simulate and control the robot, and rewrote its conversational prompts so its
            replies were clearer and more natural.
          </p>
          <p>
            I also helped plan a participatory design session, so older adults could shape the robot instead of just
            reacting to it. Participants would be recruited through Knoxville’s CAC Office on Aging and O’Connor
            Senior Center. Since most people had never seen a robot like this, the session builds up to it:
          </p>
          <ol className="list-decimal space-y-1 pl-6 marker:text-dim">
            <li>An introduction and a short demographic survey</li>
            <li>A video demonstration of the robot</li>
            <li>An opinion survey on the robot</li>
            <li>A group discussion prompted by the video</li>
            <li>
              A collage activity, where participants arrange images of physical activities to imagine how they’d want
              to use the robot
            </li>
          </ol>
          <p>
            Separately, I led a team of three training a reinforcement learning policy so the robot could turn toward
            and follow a person, improving reward performance by 164% and cutting training time by up to 40%.
          </p>
          <PreviewOnlyPoster />

          <h3>Where it was headed</h3>
          <p>
            The next step was walking sessions: people with dementia actually walking with the robot while we measured
            how engaged they were and gathered their feedback, to guide design changes toward assistive robots that
            work for them. I presented the study as first author at EUReCA 2025.
          </p>

          <h3>What I took away</h3>
          <Todo>
            what designing with older adults taught you that you couldn’t have learned from the robot alone.
          </Todo>
        </CaseStudy>


    </Page>
  )
}
