export const validateNameDesktop = (name: string): { status: boolean; textError: string; styleError: boolean } => {
    if (!name) {
        return {
            status: false,
            textError: 'Введите ваше имя',
            styleError: true,
        }
    } else if (!/^[а-яА-ЯёЁ\s]+$/.test(name)) {
        return {
            status: false,
            textError: 'Введите корректное имя',
            styleError: true,
        }
    }
    return {
        status: true,
        textError: '',
        styleError: false,
    }
}
