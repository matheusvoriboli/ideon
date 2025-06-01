import { Bell } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* TODO: Send page name as parameter */}
          <div className="flex items-center">Page name</div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-4">
            <Bell />
            <div className="flex items-center text-white p-2 rounded-md font-extrabold bg-ideon-dark">
              HK
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
