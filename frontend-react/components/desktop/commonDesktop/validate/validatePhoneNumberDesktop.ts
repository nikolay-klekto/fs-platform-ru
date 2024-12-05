export function validatePhoneNumberDesktop(phone: string) {
    const phoneNumberRegex = /^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$|^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/
    /*if (!email) {
        return { status: false, textError: 'Заполните поле', styleError: false }
    }*/
    if (!phoneNumberRegex.test(phone)) {
        return { status: false, textError: 'Введите корректный номер телефона', styleError: false }
    }
    return { status: true }
}
