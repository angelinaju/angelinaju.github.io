import { Page, PageIntro, RoleBlock } from '../components/Layout'
import { work } from '../content'

export default function WorkPage() {
  return (
    <Page current="work">
      <PageIntro title="Internships and student roles" lead={work.lead} />
      {work.roles.map((r) => (
        <RoleBlock key={r.id} r={r} />
      ))}
    </Page>
  )
}
