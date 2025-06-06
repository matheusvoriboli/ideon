import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft } from 'lucide-react'
import React from 'react'
import { Button } from '~/index'

interface OffcanvasProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  showBackButton?: boolean
  onBack?: () => void
}

const Offcanvas: React.FC<OffcanvasProps> = ({
  isOpen,
  onClose,
  children,
  title = 'Select Filters',
  showBackButton = false,
  onBack,
}) => {
  const offcanvasRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Control rendering and animation timing
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Delay to ensure DOM is ready and allow smooth opening animation
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10) // Small but perceptible delay
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      // Delay removal to allow closing animation
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 500) // Match the transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      // Store the currently active element before opening
      previousActiveElement.current = document.activeElement as HTMLElement

      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'

      // Focus the close button when opening
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 200)
    } else {
      document.body.style.overflow = 'unset'

      // Restore focus to the previously active element when closing
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle focus trap
  useEffect(() => {
    if (isOpen && offcanvasRef.current) {
      const focusableElements = offcanvasRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-[1000] flex justify-end transition-opacity duration-500 ease-in-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="offcanvas-title"
    >
      <div
        ref={offcanvasRef}
        className={`bg-white h-full min-w-xl max-w-[80vw] shadow-xl flex flex-col transform transition-all duration-500 ease-out ${
          isAnimating
            ? 'translate-x-0 opacity-100 scale-100'
            : 'translate-x-full opacity-0 scale-95'
        }`}
      >
        <div className="flex justify-between items-center p-6 pb-2 border-ideon-primary-500">
          <div className="flex items-center gap-2">
            {showBackButton && onBack && (
              <Button
                onClick={onBack}
                variant="outline"
                className="border-none p-2"
                aria-label="Back"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </Button>
            )}
            <h3 id="offcanvas-title" className="text-lg font-semibold">
              {title}
            </h3>
          </div>
          <Button
            ref={closeButtonRef}
            onClick={onClose}
            variant="outline"
            className="border-none"
            aria-label="Close filters"
          >
            <X size={24} strokeWidth={1.5} />
          </Button>
        </div>
        <div
          className="flex-1 p-6 relative flex flex-col"
          role="document"
          aria-label="Offcanvas content"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Offcanvas
