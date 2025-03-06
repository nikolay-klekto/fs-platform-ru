"use client";
import { useState } from 'react';
import {gql, useMutation} from '@apollo/client'

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
  const [error, setError] = useState<string | null>(null);
  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);

  const register = async (email: string, phoneNumber: string, password: string) => {
    setError(null);
    try {
      const { data } = await registerMutation({
        variables: { email, phoneNumber, password },
      });
      if (data.register.errorMessage) {
        throw new Error(data.register.errorMessage);
      }
      return data.register.data;
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Ошибка при регистрации:", err);
        setError(err.message);
      } else {
        console.error("❌ Неизвестная ошибка:", err);
        setError("Произошла неизвестная ошибка");
      }
      return null;
    }
  };

  return { register, error, loading };
};

     
