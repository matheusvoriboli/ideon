import { describe, it, expect, beforeEach, vi } from 'vitest'
import toast from 'react-hot-toast'
import { showSuccess, showError, notImplemented } from '~/utils'

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const mockToast = vi.mocked(toast)

describe('notifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('showSuccess', () => {
    it('should call toast.success with the provided message', () => {
      const message = 'Success message'

      showSuccess(message)

      expect(mockToast.success).toHaveBeenCalledWith(message)
      expect(mockToast.success).toHaveBeenCalledTimes(1)
    })
  })

  describe('showError', () => {
    it('should call toast.error with the provided message', () => {
      const message = 'Error message'

      showError(message)

      expect(mockToast.error).toHaveBeenCalledWith(message)
      expect(mockToast.error).toHaveBeenCalledTimes(1)
    })
  })

  describe('notImplemented', () => {
    it('should show error toast with default message when no feature name is provided', () => {
      notImplemented()

      expect(mockToast.error).toHaveBeenCalledWith(
        'This feature is not implemented yet',
        { icon: '🚧' }
      )
      expect(mockToast.error).toHaveBeenCalledTimes(1)
    })

    it('should show error toast with custom message when feature name is provided', () => {
      const featureName = 'Export'

      notImplemented(featureName)

      expect(mockToast.error).toHaveBeenCalledWith(
        `${featureName} feature is not implemented yet`,
        { icon: '🚧' }
      )
      expect(mockToast.error).toHaveBeenCalledTimes(1)
    })
  })
})
