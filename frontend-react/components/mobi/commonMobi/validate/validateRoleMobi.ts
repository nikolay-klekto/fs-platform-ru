export function validateRoleMobi(role: string) {
    const normalizedRole = role.toLowerCase()
    const isValid = normalizedRole === 'клиент' || normalizedRole === 'партнер' || normalizedRole === 'соискатель'

    return {
        status: isValid,
        textError: isValid ? '' : 'Варианты ввода: клиент/партнер/соискатель',
        styleError: !isValid,
    }
}
