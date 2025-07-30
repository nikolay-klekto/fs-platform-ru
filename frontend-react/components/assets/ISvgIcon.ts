import { SVGProps } from 'react'

export interface ISvgIcon extends SVGProps<SVGSVGElement> {
    width?: number | string
    height?: number | string
    className?: string
    fill?: string
    stroke?: string
    viewBox?: string
}
