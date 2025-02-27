import { useState } from "react";

const REGISTER_MUTATION = `
  mutation Register($email: String!, $phoneNumber: String!, $password: String!) {
    register(client: { email: $email, phoneNumber: $phoneNumber, password: $password }) {
      data {
        accessToken
        refreshToken
        clientId
      }
      errorMessage
    }
  }
`;


export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const register = async (email: string, phoneNumber: string, password: string) => {
    setError(null);
    try {
      const response = await fetch("http://45.135.234.61:8282/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: REGISTER_MUTATION,
          variables: { email, phoneNumber, password }, 
        }),
      });

      const result = await response.json();
      console.log("📩 Ответ сервера:", result);

      if (result.errors) {
        throw new Error(result.errors[0].message || "Ошибка регистрации");
      }

      if (result.data.register.errorMessage) {
        throw new Error(result.data.register.errorMessage);
      }

      return result.data.register.data;
    } catch (err: any) {
      console.error("❌ Ошибка при регистрации:", err);
      setError(err.message);
      return null;
    }
  };

  return { register, error };
};
