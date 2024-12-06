export function validateRoleDesktop(role: string) {
    const roleRegex = /^[a-zA-Z]+$/
    const isValid = roleRegex.test(role)

    return {
        status: isValid,
        textError: isValid ? '' : 'Варианты ввода клиент/партнер/соискатель',
        styleError: isValid,
    }
}
