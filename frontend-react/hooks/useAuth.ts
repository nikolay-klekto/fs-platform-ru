import { useMutation, gql } from "@apollo/client";

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
  const [registerMutation, {data, error, loading, client }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (response) => {
      if (response?.register?.data) {
        const { accessToken, refreshToken, clientId } = response.register.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("clientId", clientId);
      }
    },
  });

  const register = async (email: string, phoneNumber: string, password: string) => {
    try {
      await registerMutation({
        variables: {
          email,
          phoneNumber,
          password,
        },
        });
        return true
        } catch (err) {
        return false
      console.log("Registration error:", err);
    }
  };

  return { register, data, error, loading, client };
};
