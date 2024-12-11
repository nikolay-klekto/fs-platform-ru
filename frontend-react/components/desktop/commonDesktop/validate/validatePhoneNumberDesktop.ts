export function validatePhoneNumberDesktop(phone: string) {
    const sanitizedPhone = phone.replace(/[\s()-]/g, '')
    const phoneNumberRegex = /^\+375\d{9}$|^\+7\d{10}$/
    const isValid = phoneNumberRegex.test(sanitizedPhone)

    return {
        status: isValid,
        textError: isValid ? '' : 'Формат ввода +375 (__)___-__-__  / +7 (___)___-__-__',
        styleError: !isValid,
    }
}
