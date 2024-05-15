"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Main from "../Main";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Main>{children}</Main>
    </SessionProvider>
  );
};

export default AuthProvider;
