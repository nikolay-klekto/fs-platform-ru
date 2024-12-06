const generatePassword = (length: number = 12): string => {
    if (length < 4) {
        throw new Error('Длина пароля должна быть не меньше 4 символов.')
    }

    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+'

    const mandatoryCharacters: string[] = [
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
    ]

    const allCharacters = upperCaseLetters + lowerCaseLetters + numbers + symbols

    const remainingCharacters: string[] = Array.from(
        { length: length - mandatoryCharacters.length },
        () => allCharacters[Math.floor(Math.random() * allCharacters.length)],
    )

    const passwordArray: string[] = [...mandatoryCharacters, ...remainingCharacters]

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
    }

    return passwordArray.join('')
}
