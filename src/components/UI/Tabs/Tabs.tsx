import React, { useState } from 'react'

interface TabItem {
  id: string
  label: string
  content?: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  className?: string
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onChange?.(tabId)
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer
              ${
                activeTab === tab.id
                  ? 'text-ideon-primary-300 font-semibold border-ideon-primary-300'
                  : 'text-gray-500 border-transparent hover:text-ideon-primary-200'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTabContent && <div className="py-4">{activeTabContent}</div>}
    </div>
  )
}

export default Tabs
