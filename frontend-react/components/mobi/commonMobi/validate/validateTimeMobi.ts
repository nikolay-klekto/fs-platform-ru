export const validateTimeMobi = (time: string) => {
    if (!/^\d{2}\.\d{2}$/.test(time)) {
        return {
            status: false,
            textError: 'Неверный формат времени (ЧЧ.ММ)',
            styleError: true,
        }
    }

    const [hours, minutes] = time.split('.').map(Number)
    const isValid = hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59

    return {
        status: isValid,
        textError: isValid ? '' : 'Некорректное время',
        styleError: !isValid,
    }
}
