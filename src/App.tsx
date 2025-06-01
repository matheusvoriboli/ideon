import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '~/components'
import { Inbox, CoveragePeriods } from '~/pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inbox />} />
          <Route path="coverage-periods" element={<CoveragePeriods />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
