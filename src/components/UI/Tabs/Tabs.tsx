import React, { useState, useRef, useEffect } from 'react'

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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length)
  }, [tabs.length])

  const handleTabClick = (tabId: string, index: number) => {
    setActiveTab(tabId)
    onChange?.(tabId)
    tabRefs.current[index]?.focus()
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    tabId: string,
    index: number
  ) => {
    let newIndex = index

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = index > 0 ? index - 1 : tabs.length - 1
        break
      case 'ArrowRight':
        e.preventDefault()
        newIndex = index < tabs.length - 1 ? index + 1 : 0
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = tabs.length - 1
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        handleTabClick(tabId, index)
        return
      default:
        return
    }

    const newTabId = tabs[newIndex]?.id
    if (newTabId) {
      setActiveTab(newTabId)
      onChange?.(newTabId)
      tabRefs.current[newIndex]?.focus()
    }
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div
        className="flex border-b border-gray-200"
        role="tablist"
        aria-label="Tabs navigation"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={el => {
              tabRefs.current[index] = el
            }}
            onClick={() => handleTabClick(tab.id, index)}
            onKeyDown={e => handleKeyDown(e, tab.id, index)}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ideon-primary-200
              ${
                activeTab === tab.id
                  ? 'text-ideon-primary-300 font-semibold border-ideon-primary-300'
                  : 'text-gray-500 border-transparent hover:text-ideon-primary-200'
              }
            `}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTabContent && (
        <div
          className="py-4"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTabContent}
        </div>
      )}
    </div>
  )
}

export default Tabs
