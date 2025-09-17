export interface ISelectOption {
    value: string
    label: string
} 

export interface ISelectTypeDesktop {
    onTypeChange: (types: string[]) => void
    error?: boolean
    onValidationChange?: (isValid: boolean) => void
}