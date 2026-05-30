import Ncore2027Microsite from './components/Ncore2027Microsite'
import NcoreAriaExperienceMicrosite from './components/NcoreAriaExperienceMicrosite'

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const view = params.get('view')

  if (view === 'aria-experience') return <NcoreAriaExperienceMicrosite />
  return <Ncore2027Microsite />
}
