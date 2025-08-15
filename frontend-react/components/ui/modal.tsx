import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { X } from 'lucide-react'

interface IModal {
    children: ReactNode
    onClose: () => void
    size?: 'small' | 'medium' | 'semilarge' | 'large' | 'large-l' | 'large-lg' | 'extra-medium'
    showCloseButton?: boolean
    paddingClass?: string
    className?: string
    variant?: 'desktop' | 'mobile'
}
const Modal: React.FC<IModal> = ({
    children,
    onClose,
    size = 'medium',
    showCloseButton = true,
    paddingClass = '',
    className,
    variant = 'desktop',
}) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

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
            case 'large-l':
                return 'max-w-[1366px]'
            case 'large-lg':
                return '2xl:w-[830px] max-w-[882px]'
            case 'extra-medium':
                return 'max-w-lg'
            default:
                return 'max-w-lg'
        }
    }

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%] ${paddingClass} ${className}`}
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onClose()
                }
            }}
        >
            {variant === 'desktop' ? (
                <div
                    className={`relative w-full rounded-[50px] bg-[#101030] ${getSizeClass()} modal-scrollable text-white`}
                    role="none"
                    onClick={(e) => e.stopPropagation()}
                >
                    {showCloseButton && (
                        <button className="absolute right-[-53px] top-0" onClick={onClose}>
                            <X size={53} color="#878797" />
                        </button>
                    )}
                    {children}
                </div>
            ) : (
                <div
                    className={`relative mx-4 w-full max-w-md ${getSizeClass()} modal-scrollable text-white`}
                    role="none"
                    onClick={(e) => e.stopPropagation()}
                >
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%] p-2"
                        >
                            <X size={24} color="#878797" className="opacity-50 hover:opacity-100" />
                        </button>
                    )}
                    <div className="rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px] text-white">
                        {children}
                    </div>
                </div>
            )}
        </div>,
        document.body,
    )
}

export default Modal

// <div
//     className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%] ${paddingClass} ${className}`}
//     onClick={onClose}
//     role="button"
//     tabIndex={0}
//     onKeyDown={(e) => {
//         if (e.key === 'Enter') {
//             onClose()
//         }
//     }}
// >
//     <div
//         className={`relative w-full rounded-[50px] bg-[#101030] ${getSizeClass()} modal-scrollable text-white`}
//         role="none"
//         onClick={(e) => e.stopPropagation()}
//     >
//         {showCloseButton && (
//             <button className="absolute right-[-53px] top-0" onClick={onClose}>
//                 <X size={53} color="#878797" />
//             </button>
//         )}
//         {children}
//     </div>
// </div>,
// document.body,
