import React, { useState, useRef, useEffect } from 'react'

interface IOptions {
    options: string[]
    selectedOption?: string | null
    onChange: (option: string) => void
    label?: string
    className?: string
    onBlur?: () => void
}

const Dropdown = ({ options, selectedOption, onChange, label, className, onBlur }: IOptions) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleOptionClick = (option: string) => {
        onChange(option)
        setIsOpen(false)
    }
    const handleBlur = () => {
        onBlur?.()
    }

    return (
        <div
            ref={dropdownRef}
            className={`relative ${label && 'label_profile_desktop_custom flex flex-col gap-[10px]'} ${selectedOption && 'text-[#878797]'} `}
            onBlur={handleBlur}
            tabIndex={0}
        >
            {label}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`select_profile_desktop_custom bg-[url(/images/vector_gray.png)] ${className} ${isOpen && 'border-2 border-[#FFFFFF] bg-[url(/images/vector_white.png)]'}
                ${selectedOption && 'text-[#FFFFFF] border-[#878797] bg-[#353652]'} 
                `}
            >
                {selectedOption || options[0]}
            </div>
            {isOpen && (
                <ul
                    className={`ul_profile_desktop_custom absolute z-50 w-full ${label ? 'top-[89px]' : 'top-[59px] max-h-[300px] overflow-y-auto'} `}
                >
                    {options.map((option, index) => (
                        <React.Fragment key={option}>
                            <li
                                className="cursor-pointer text-[#878797] hover:text-[#FFFFFF]"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                            {index !== options.length - 1 ? <hr className="h-[2px] border-[#353652]" /> : ''}
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown
