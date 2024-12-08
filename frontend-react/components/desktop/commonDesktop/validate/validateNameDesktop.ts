export function validateNameDesktop(name: string) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/
    const isValid = nameRegex.test(name)

    return {
        status: isValid,
        textError: isValid ? '' : 'Введите имя на кириллице или на латинице',
        styleError: !isValid,
    }
}
