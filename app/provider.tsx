"use client";

import { AuthProvider } from "@/context/AuthContext";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ApolloProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </ApolloProvider>
  );
}
