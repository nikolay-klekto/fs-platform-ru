export function validateEmailDesktop(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    /*if (!email) {
        return { status: false, textError: 'Заполните поле', styleError: false }
    }*/
    if (!emailRegex.test(email)) {
        return { status: false, textError: 'Введите корректный email', styleError: false }
    }
    return { status: true }
}
