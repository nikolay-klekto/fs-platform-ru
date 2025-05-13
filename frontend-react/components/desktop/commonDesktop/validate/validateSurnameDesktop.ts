export const validateSurnameDesktop = (
    surname: string,
): { status: boolean; textError: string; styleError: boolean } => {
    if (!surname) {
        return {
            status: false,
            textError: 'Введите вашу фамилию',
            styleError: true,
        }
    } else if (!/^[а-яА-ЯёЁ\s]+$/.test(surname)) {
        return {
            status: false,
            textError: 'Введите корректную фамилию',
            styleError: true,
        }
    }
    return {
        status: true,
        textError: '',
        styleError: false,
    }
}
