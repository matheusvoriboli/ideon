// Theme management utility based on Tailwind CSS documentation
export type Theme = 'light' | 'dark' | 'system'

export const applyTheme = () => {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

export const setTheme = (theme: Theme) => {
  if (theme === 'light') {
    // Whenever the user explicitly chooses light mode
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  } else if (theme === 'dark') {
    // Whenever the user explicitly chooses dark mode
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem('theme')
    applyTheme()
  }
}

export const getTheme = (): Theme => {
  if (!('theme' in localStorage)) return 'system'
  return localStorage.theme as Theme
}

export const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const getCurrentTheme = (): 'light' | 'dark' => {
  const theme = getTheme()
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

// Initialize theme on app start
export const initializeTheme = () => {
  applyTheme()

  // Listen for system theme changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (getTheme() === 'system') {
        applyTheme()
      }
    })
}
