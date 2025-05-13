export const validateCityDesktop = (surname: string): { status: boolean; textError: string; styleError: boolean } => {
    if (!surname) {
        return {
            status: false,
            textError: 'Введите ваш город',
            styleError: true,
        }
    } else if (!/^[а-яА-ЯёЁ\s]+$/.test(surname)) {
        return {
            status: false,
            textError: 'Введите корректный город',
            styleError: true,
        }
    }
    return {
        status: true,
        textError: '',
        styleError: false,
    }
}
