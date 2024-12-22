import { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
    children: ReactNode
    show: boolean
    onClose: () => void
    size?: 'small' | 'medium' | 'large' | 'large-l'
    showCloseButton?: boolean
    className?: string
}

const Modal: React.FC<ModalProps> = ({
    children,
    show,
    onClose,
    size = 'medium',
    showCloseButton = true,
    className,
}) => {
    if (!show) return null

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'max-w-xs'
            case 'large':
                return 'max-w-4xl'
            case 'large-l':
                return 'max-w-[1366px]'
            case 'medium':
            default:
                return 'max-w-lg'
        }
    }

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ${className}`}
            onClick={onClose}
        >
            <div
                className={`relative bg-[#101030] rounded-[50px] w-full ${getSizeClass()} text-white`}
                onClick={(e) => e.stopPropagation()}
            >
                {showCloseButton && (
                    <button className="absolute top-0 right-[-53px]" onClick={onClose}>
                        <X size={53} color="#878797" />
                    </button>
                )}
                {children}
            </div>
        </div>,
        document.body,
    )
}

export default Modal
