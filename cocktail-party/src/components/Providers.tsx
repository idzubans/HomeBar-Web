"use client";

import { SessionProvider } from "next-auth/react";
import type { FC, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
    // <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
    //   <SessionProvider>{children}</SessionProvider>
    // </ThemeProvider>
  );
};

export default Providers;
