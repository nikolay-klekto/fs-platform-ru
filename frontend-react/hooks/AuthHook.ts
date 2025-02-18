import { useAuth } from '@/context/AuthContext'
import { registerUser } from '@/services/api'

interface UseAuthActions {
  handleRegister: (formData: {
    email: string
    phone: string
    password: string
    basketId?: string
  }) => Promise<string | null>
}

export const useAuthActions = (): UseAuthActions => {
  const { setAuthData } = useAuth()

  const handleRegister = async (formData: {
    email: string
    phone: string
    password: string
    basketId?: string
  }): Promise<string | null> => {
    try {
      const result = await registerUser(formData)
      if (result.errorMessage) {
        return result.errorMessage
      }

      setAuthData({
        clientId: result.clientId,
        jwtToken: result.jwtToken,
        refreshToken: result.refreshToken,
      })

      return null
    } catch (error) {
      return 'Ошибка запроса на сервер'
    }
  }

  return {
    handleRegister,
  }
}
