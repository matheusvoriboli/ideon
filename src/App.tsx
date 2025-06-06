import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Layout } from '~/components'
import { Inbox, CoveragePeriods } from '~/pages'
import { Routes as AppRoutes } from '~/utils/constants'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inbox />} />
          <Route
            path={AppRoutes.COVERAGE_PERIODS.slice(1)}
            element={<CoveragePeriods />}
          />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </Router>
  )
}

export default App
