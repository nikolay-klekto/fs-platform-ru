export function validateEmailMobi(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const isValid = emailRegex.test(email)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите корректный адрес электронной почты',
        styleError: !isValid,
    }
}
