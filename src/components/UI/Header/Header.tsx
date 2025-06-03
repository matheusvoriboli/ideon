import { Bell } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="h-16">
      <div className="px-6">
        <div className="flex justify-between items-center h-16">
          {/* TODO: Send page name as parameter */}
          <div className="flex items-center text-lg font-semibold">
            Coverage Periods
          </div>
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
