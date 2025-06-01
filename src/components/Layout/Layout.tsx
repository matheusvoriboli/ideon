import { Outlet } from 'react-router-dom'
import { Header } from '~/components'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
