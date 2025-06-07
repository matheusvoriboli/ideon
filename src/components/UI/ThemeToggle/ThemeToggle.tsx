import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { setTheme, getTheme, type Theme } from '~/utils'
import { Button } from '~/components'

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('system')

  useEffect(() => {
    setCurrentTheme(getTheme())
  }, [])

  const getNextTheme = (current: Theme): Theme => {
    const themeOrder: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themeOrder.indexOf(current)
    return themeOrder[(currentIndex + 1) % themeOrder.length]
  }

  const handleThemeToggle = () => {
    const nextTheme = getNextTheme(currentTheme)
    setTheme(nextTheme)
    setCurrentTheme(nextTheme)
  }

  const getCurrentIcon = () => {
    switch (currentTheme) {
      case 'light':
        return Sun
      case 'dark':
        return Moon
      case 'system':
        return Monitor
      default:
        return Monitor
    }
  }

  const getCurrentLabel = () => {
    switch (currentTheme) {
      case 'light':
        return 'Light mode'
      case 'dark':
        return 'Dark mode'
      case 'system':
        return 'System theme'
      default:
        return 'System theme'
    }
  }

  const Icon = getCurrentIcon()

  return (
    <Button
      onClick={handleThemeToggle}
      variant="outline"
      className="border-none p-2"
      aria-label={`Current: ${getCurrentLabel()}. Click to switch theme`}
    >
      <Icon size={18} />
    </Button>
  )
}

export default ThemeToggle
