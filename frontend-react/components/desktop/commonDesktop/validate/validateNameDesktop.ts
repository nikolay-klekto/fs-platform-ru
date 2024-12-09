export const validateNameDesktop = (name: string): string | null => {
    if (!name) {
        return 'Введите ваше имя'
    }
    if (!/^[а-яА-ЯёЁ\s]+$/.test(name)) {
        return 'Введите корректное имя'
    }
    return null
}