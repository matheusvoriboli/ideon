import { Bell } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="h-16" role="banner">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* TODO: Send page name as parameter */}
          <h1 className="flex items-center text-lg font-semibold">
            Coverage Periods
          </h1>
          <nav
            className="flex items-center space-x-4"
            role="navigation"
            aria-label="User menu"
          >
            <button
              type="button"
              aria-label="Notificações"
              className="p-2 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-ideon-primary-200"
            >
              <Bell />
            </button>
            <div
              className="flex items-center text-white p-2 rounded-md font-extrabold bg-ideon-dark"
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
