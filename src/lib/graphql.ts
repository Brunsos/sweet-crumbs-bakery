import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: process.env.WORDPRESS_AUTH_REFRESH_TOKEN
      ? `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
      : '',
  },
});