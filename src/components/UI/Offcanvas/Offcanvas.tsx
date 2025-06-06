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
      role="dialog"
      aria-modal="true"
      aria-labelledby="offcanvas-title"
    >
      <div
        className={`bg-white h-full min-w-xl max-w-[80vw] shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
