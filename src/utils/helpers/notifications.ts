import toast from 'react-hot-toast'

export const showSuccess = (message: string) => {
  toast.success(message)
}

export const showError = (message: string) => {
  toast.error(message)
}

export const notImplemented = (featureName?: string) => {
  const message = featureName
    ? `${featureName} feature is not implemented yet`
    : 'This feature is not implemented yet'

  toast.error(message, {
    icon: '🚧',
  })
}
