export function validatePassword(password: string) {
    const isValidLength = password.length >= 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (isValidLength && hasUpperCase && hasNumber) {
        return {
            status: true,
            textError: '',
            styleError: false,
        }
    }

    return {
        status: false,
        textError: getPasswordError(password),
        styleError: true,
    }
}

function getPasswordError(password: string) {
    if (password.length < 8) {
        return 'Пароль должен быть не менее 8 символов'
    }
    if (!/[A-Z]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну заглавную букву'
    }
    if (!/[0-9]/.test(password)) {
        return 'Пароль должен содержать хотя бы одну цифру'
    }
    return ''
}
