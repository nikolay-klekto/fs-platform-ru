export function validateEmailDesktop(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(email)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите корректный адрес электронной почты',
        styleError: !isValid,
    }
}
