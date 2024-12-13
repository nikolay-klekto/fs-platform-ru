export const validatePhoneMobi = (phone: string) => {
    const cleanedValue = phone.replace(/\D/g, '')
    const isValid = /^375\d{9}$|^7\d{10}$/.test(cleanedValue)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите корректный номер телефона',
        styleError: !isValid,
    }
}
