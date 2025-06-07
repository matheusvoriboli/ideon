import { Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Routes, notImplemented, routeLabels } from '~/utils'
import { ThemeToggle } from '~/components'

const Header: React.FC = () => {
  const location = useLocation()

  // Get the page name based on current route
  const getPageName = (): string => {
    const currentRoute = location.pathname as Routes
    return routeLabels[currentRoute] || 'Page'
  }

  return (
    <header className="h-16 bg-ideon-light dark:bg-ideon-dark" role="banner">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          <h1 className="flex items-center text-lg font-semibold text-ideon-dark dark:text-gray-50">
            {getPageName()}
          </h1>
          <nav
            className="flex items-center space-x-4"
            role="navigation"
            aria-label="User menu"
          >
            <ThemeToggle />
            <button
              type="button"
              aria-label="Notificações"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-ideon-primary-200 text-gray-600 dark:text-gray-50"
              onClick={() => notImplemented('Notifications')}
            >
              <Bell />
            </button>
            <div
              className="flex items-center text-white p-2 rounded-md font-extrabold bg-ideon-dark dark:bg-ideon-primary-300"
              role="button"
              tabIndex={0}
              aria-label="User menu HK"
            >
              HK
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
