import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from '~/index'

interface OffcanvasProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Offcanvas: React.FC<OffcanvasProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[1000] flex justify-end"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white h-full min-w-md max-w-[80vw] shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 pb-2 border-gray-300">
          <h3 className="text-lg font-semibold">Select Filters</h3>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-none"
            aria-label="Close"
          >
            <X size={24} strokeWidth={1.5} />
          </Button>
        </div>
        <div className="flex-1 p-6 relative flex flex-col">{children}</div>
      </div>
    </div>
  )
}

export default Offcanvas
