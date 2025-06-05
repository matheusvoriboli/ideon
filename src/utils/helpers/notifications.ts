import toast from 'react-hot-toast'

export const notImplemented = (featureName?: string) => {
  const message = featureName
    ? `${featureName} feature is not implemented yet`
    : 'This feature is not implemented yet'

  toast.error(message, {
    icon: '🚧',
  })
}
