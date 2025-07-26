import React from 'react'

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    children?: React.ReactNode
}

export const GradientButtonMobi: React.FC<GradientButtonProps> = ({ children, className = '', ...rest }) => (
    <button
        className={`
      sm_s:min-w-[285px] inline-flex h-[50px] min-w-[294px]
      items-center justify-center whitespace-nowrap rounded-[50px]
      border border-transparent px-4 text-center text-[17px]
      font-semibold leading-[21px] no-underline transition-all
      duration-200 ease-in-out [background:linear-gradient(90deg,#8333F3_-8.14%,#5F4AF3_44.37%,#3B51A8_100%)]
      active:opacity-80
      sm:min-w-[280px]
      ${className}
    `}
        {...rest}
    >
        {children ?? 'Применить'}
    </button>
)

export default GradientButtonMobi
