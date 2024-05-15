"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
    </QueryClientProvider>
  );
};

export default Main;
