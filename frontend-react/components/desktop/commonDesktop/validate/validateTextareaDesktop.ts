export function validateTextareaDesktop(text: string) {
    const textRegex = /^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9!@#$%^&*(),.?":{}|<>_\-\s]*$/
    const isValid = textRegex.test(text)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите текст, содержащий буквы',
        styleError: !isValid,
    }
}
