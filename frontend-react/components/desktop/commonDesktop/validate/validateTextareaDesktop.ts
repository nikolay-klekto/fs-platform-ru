export function validateTextareaDesktop(text: string) {
    const textRegex = /^(?=.*[a-zA-Zа-яА-Я])[a-zA-Zа-яА-Я0-9!@#$%^&*(),.?":{}|<>_\-\s]*$/
    if (!textRegex.test(text)) {
        return {
            status: false,
            textError: 'Введите текст, содержащий буквы',
            styleError: false,
        }
    }
    return { status: true }
}
