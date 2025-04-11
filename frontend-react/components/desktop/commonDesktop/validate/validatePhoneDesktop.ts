export const validatePhoneDesktop = (phone: string) => {
    const cleanedValue = phone.trim().replace(/[^+\d]/g, '')
    const normalizedValue = cleanedValue.startsWith('+') ? cleanedValue.slice(1) : cleanedValue

    const isValid = /^(375\d{9}|7\d{10})$/.test(normalizedValue)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите корректный номер телефона',
        styleError: !isValid,
    }
}
