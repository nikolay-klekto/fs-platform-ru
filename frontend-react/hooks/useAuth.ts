import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Cookies from "js-cookie";

const REGISTER_MUTATION = gql`
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
  const [customError, setCustomError] = useState<string | null>(null);
  const [registerMutation, { error, loading, client }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (response) => {
      const registerData = response?.register;
      if (registerData?.errorMessage) {
        setCustomError(registerData.errorMessage);
        console.error("Registration error:", registerData.errorMessage);
        return { success: false, errorMessage: registerData.errorMessage };
        }

      if (registerData?.data) {
        const {  refreshToken } = registerData.data;
        Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "strict" });
        setCustomError(null); 
        return { success: true };
      } },
      onError: (err) => {
        setCustomError(err.message || "Произошла ошибка регистрации"); 
    },
  });

  const register = async (email: string, phoneNumber: string, password: string) => {
    try {
      const response = await registerMutation({
        variables: {
          email,
          phoneNumber,
          password,
        },
      });

      const registerData = response?.data?.register;

      if (registerData?.errorMessage) {
        return { success: false, errorMessage: registerData.errorMessage };
      }

      if (registerData?.data) {
        return { success: true };
      }

      return { success: false, errorMessage: "Неизвестная ошибка регистрации" };
    } catch (err) {
      console.error("Registration error:", err);
      return { success: false, errorMessage: "Ошибка регистрации, попробуйте позже" };
    }
  };

  return { register, error, loading, client, customError };

};


