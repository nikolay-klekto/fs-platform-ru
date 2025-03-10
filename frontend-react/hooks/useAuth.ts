import { useMutation, gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($client: ClientInput!) {
    register(client: $client) {
      data {
        accessToken
        refreshToken
        clientId
      }
      errorMessage
    }
  }
`;

type RegisterInput = {
  email: string;
  phoneNumber: string;
  password: string;
};
export const useAuth = () => {
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);

  const register = async ({ email, phoneNumber, password }: RegisterInput) => {
    try {
      const response = await registerMutation({
        variables: {
          client: { email, phoneNumber, password },
        },
      });

      if (response.data?.register?.data) {
        const { accessToken, refreshToken, clientId } = response.data.register.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("clientId", clientId);

        return { accessToken, refreshToken, clientId };
      } else {
        throw new Error(response.data?.register?.errorMessage || "Неизвестная ошибка");
      }
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      throw err;
    }
  };

  return { register, loading, error };
};



// import { useState } from 'react';
// import { gql, useMutation } from '@apollo/client';

// const REGISTER_MUTATION = gql`
//   mutation Register($email: String!, $phoneNumber: String!, $password: String!) {
//     register(client: { email: $email, phoneNumber: $phoneNumber, password: $password }) {
//       data {
//         accessToken
//         refreshToken
//         clientId
//       }
//       errorMessage
//     }
//   }
// `;

// export const useAuth = () => {
//   const [error, setError] = useState<string | null>(null);
//   const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);

//   const setTokens = (accessToken: string, refreshToken: string) => {
//     localStorage.setItem('accessToken', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//   };
 
//   const register = async (email: string, phoneNumber: string, password: string) => {
//     setError(null);
//     try {
//       const { data } = await registerMutation({
//         variables: { email, phoneNumber, password },
//         fetchPolicy: 'no-cache',
//       });

//       if (data?.register?.errorMessage) {
//         throw new Error(data.register.errorMessage);
//       }

//       const { accessToken, refreshToken } = data?.register?.data || {};
//       if (accessToken && refreshToken) {
//         setTokens(accessToken, refreshToken);
//       }

//       return data?.register?.data;
//     } catch (err) {
//       if (err instanceof Error) {
//         console.error("❌ Ошибка при регистрации:", err);
//         setError(err.message);
//       } else {
//         console.error("❌ Неизвестная ошибка:", err);
//         setError("Произошла неизвестная ошибка");
//       }
//       return null;
//     }
//   };

//   return { register, error, loading};
// };
