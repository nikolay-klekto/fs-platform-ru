export const validatePhoneMobi = (phone: string): string | null => {
    if (!phone) {
        return 'Введите номер телефона'
    }
    if (!/^\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}$/.test(phone)) {
        return 'Введите корректный номер телефона'
    }
    return null
}