interface RegisterRequest {
  email: string
  phone: string
  password: string
  basketId?: string
}

interface RegisterResponse {
  jwtToken: string
  refreshToken: string
  clientId: string
  errorMessage?: string
}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    throw new Error('Ошибка запроса на сервер')
  }
}
