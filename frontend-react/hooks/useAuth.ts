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
  const [registerMutation, { error, loading, client }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (response) => {
      const registerData = response?.register;
      if (registerData?.errorMessage) {
        console.error("Registration error:", registerData.errorMessage);
        return;
      }

      if (registerData?.data) {
        const { accessToken, refreshToken, clientId } = registerData.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("clientId", clientId);
      }
    },
  });

  const register = async (email: string, phoneNumber: string, password: string) => {
    const existingAccessToken = localStorage.getItem("accessToken");
    const existingRefreshToken = localStorage.getItem("refreshToken");
    if (existingAccessToken && existingRefreshToken) {
    return { success: false, errorMessage: "Пользователь с таким e-mail уже существует" };
    }
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
      console.log("Registration error:", err);
      return false
    }
  };

  return { register, error, loading, client };
};
