import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Button, DashboardSelector } from '~/index'

type DashboardOption = {
  id: string
  title: string
  acronym: string
}

type SideMenuSectionProps = {
  title?: string
  items: {
    label: string
    icon: React.ReactNode
    onClick: () => void
    isActive?: boolean
    badge?: number
  }[]
}

type SideMenuProps = {
  sections: SideMenuSectionProps[]
  dashboardOptions?: DashboardOption[]
  selectedDashboardId?: string
  onDashboardChange?: (dashboard: DashboardOption) => void
}

export const SideMenu = ({
  sections,
  dashboardOptions = [
    { id: 'customer', title: 'Customer Dashboard', acronym: 'CD' },
    { id: 'admin', title: 'Admin Dashboard', acronym: 'AD' },
    { id: 'reports', title: 'Reports Dashboard', acronym: 'RD' },
  ],
  selectedDashboardId = 'customer',
  onDashboardChange,
}: SideMenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleDashboardSelect = (dashboard: DashboardOption) => {
    onDashboardChange?.(dashboard)
  }

  const handleKeyDown = (e: React.KeyboardEvent, onClick: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <nav
      className="h-screen bg-ideon-dark text-white relative flex flex-col"
      role="navigation"
      aria-label="Main menu"
    >
      <div className={`py-8 px-6 ${isCollapsed ? 'hidden' : ''}`}>
        <img src="/ideon-logo.png" alt="Logo Ideon" className="h-8" />
      </div>

      {!isCollapsed && (
        <DashboardSelector
          options={dashboardOptions}
          selectedId={selectedDashboardId}
          onSelect={handleDashboardSelect}
        />
      )}

      <div
        className={`flex-1 overflow-y-auto px-0 scrollbar-thin ${isCollapsed ? 'mt-4' : ''}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
        }}
        role="menu"
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col ${isCollapsed ? '' : 'mb-6'}`}
            role="group"
            aria-labelledby={section.title ? `section-${index}` : undefined}
          >
            {section.title && !isCollapsed && (
              <h2
                id={`section-${index}`}
                className="font-semibold text-sm mb-2 px-6"
              >
                {section.title}
              </h2>
            )}
            {section.items.map(item => (
              <div
                key={item.label}
                className={`flex items-center cursor-pointer py-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${isCollapsed ? 'justify-center px-3' : 'gap-3 px-6'} ${
                  item.isActive
                    ? 'text-ideon-primary-400 bg-ideon-dark-100 '
                    : ''
                }`}
                onClick={item.onClick}
                onKeyDown={e => handleKeyDown(e, item.onClick)}
                role="menuitem"
                tabIndex={0}
                aria-label={isCollapsed ? item.label : undefined}
                aria-current={item.isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className={`${isCollapsed ? 'sr-only' : ''}`}>
                  {item.label}
                </span>
                {item.badge && !isCollapsed && (
                  <div
                    className="border border-ideon-light rounded-sm px-2 py-1 text-xs ml-auto"
                    aria-label={`${item.badge} notifications`}
                  >
                    {item.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={` pb-8 flex justify-end ${isCollapsed ? 'p-3' : 'p-6'}`}>
        <Button
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
          aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          aria-expanded={!isCollapsed}
        >
          <ChevronLeft
            size={18}
            strokeWidth={1.5}
            className={`transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </Button>
      </div>
    </nav>
  )
}

export default SideMenu
