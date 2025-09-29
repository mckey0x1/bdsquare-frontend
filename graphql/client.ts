import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  credentials: "include" // Important to send cookies
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
