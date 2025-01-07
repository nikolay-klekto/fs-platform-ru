import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { X } from 'lucide-react'

interface ModalProps {
    children: ReactNode
    show: boolean
    onClose: () => void
    size?: 'small' | 'medium' | 'semilarge' | 'large'
    showCloseButton?: boolean
    paddingClass?: string;
}
const Modal: React.FC<ModalProps> = ({ children, show, onClose, size = 'medium', showCloseButton = true, paddingClass = '' }) => {
    const lockScroll = () => {
        document.body.style.overflow = 'hidden'
    }
    const unlockScroll = () => {
        document.body.style.overflow = ''
    }

    useEffect(() => {
        if (show) {
            lockScroll()
        } else {
            unlockScroll()
        }
        return () => {
            unlockScroll()
        }
    }, [show])

    if (!show) return null

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'max-w-xs'
            case 'medium':
                return 'max-w-xl'
            case 'semilarge':
                return 'max-w-2xl'
            case 'large':
                return 'max-w-4xl'
            case 'large-width-882':
                return '2xl:w-[830px] max-w-[882px]'
            case 'medium':
            default:
                return 'max-w-lg'
        }
    }

    return ReactDOM.createPortal(
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ${paddingClass}`} onClick={onClose}>
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
