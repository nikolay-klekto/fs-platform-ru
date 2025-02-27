export const graphqlRequest = async (query: string, variables = {}) => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_API as string, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
  });

  const result = await res.json();
  return result.data;
};
