export function validatePhoneNumberDesktop(phone: string) {
    const phoneNumberRegex = /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$|^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
    const isValid = phoneNumberRegex.test(phone)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите корректный номер телефона',
        styleError: !isValid,
    }
}
