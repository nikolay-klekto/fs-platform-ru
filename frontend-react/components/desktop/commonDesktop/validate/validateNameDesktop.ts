export function validateNameDesktop(name: string) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/
    if (!nameRegex.test(name)) {
        return {
            status: false,
            textError: 'Введите имя на кириллице или на латинице',
            styleError: false,
        }
    }
    return { status: true }
}
