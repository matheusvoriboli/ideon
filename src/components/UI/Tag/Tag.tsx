import { X } from 'lucide-react'
import { Button } from '~/components'

interface TagProps {
  children: React.ReactNode
  onClose?: () => void
  disabled?: boolean
}

const Tag: React.FC<TagProps> = ({ children, onClose, disabled = false }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 border border-ideon-primary-500 rounded-xl text-xs">
      {children}
      {onClose && !disabled && (
        <Button variant="outline" onClick={onClose} className="p-0! border-0">
          <X size={14} />
        </Button>
      )}
    </div>
  )
}

export default Tag
