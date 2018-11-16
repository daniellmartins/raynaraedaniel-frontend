import gql from "graphql-tag";

export const checkLoggedIn = client =>
  client
    .query({
      query: gql`
        {
          me {
            _id
            code
            name
            createdAt
            updatedAt
          }
        }
      `
    })
    .then(({ data }) => {
      return { me: data };
    })
    .catch(() => {
      return { me: {} };
    });
