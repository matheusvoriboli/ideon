import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/index'

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
}

export const SideMenu = ({ sections }: SideMenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div className="h-screen bg-ideon-dark text-white relative flex flex-col">
      <div className={`py-8 px-6 ${isCollapsed ? 'hidden' : ''}`}>
        <img src="/ideon-logo.png" alt="Logo" className="h-8" />
      </div>

      <div
        className={`flex-1 overflow-y-auto px-0 scrollbar-thin ${isCollapsed ? 'mt-4' : ''}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col ${isCollapsed ? '' : 'mb-6'}`}
          >
            {section.title && !isCollapsed && (
              <div className="font-semibold text-sm mb-2 px-6">
                {section.title}
              </div>
            )}
            {section.items.map(item => (
              <div
                key={item.label}
                className={`flex items-center  cursor-pointer py-3 hover:opacity-80 ${isCollapsed ? 'justify-center px-3' : 'gap-3 px-6'} ${
                  item.isActive
                    ? 'text-ideon-primary-400 bg-ideon-dark-100 '
                    : ''
                }`}
                onClick={item.onClick}
              >
                {item.icon}
                <span className={`${isCollapsed ? 'hidden' : ''}`}>
                  {item.label}
                </span>
                {item.badge && !isCollapsed && (
                  <div className="border border-ideon-light rounded-sm px-2 py-1 text-xs ml-auto">
                    {item.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Botão sempre visível no bottom */}
      <div className={` pb-8 flex justify-end ${isCollapsed ? 'p-3' : 'p-6'}`}>
        <Button
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          <ChevronLeft
            size={18}
            strokeWidth={1.5}
            className={`transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </div>
    </div>
  )
}

export default SideMenu
