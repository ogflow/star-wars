"use client";
import { theme } from "@/theme/theme";
import { Grommet } from "grommet";
import { SWRConfig } from "swr";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
      }}
    >
      <Grommet theme={theme} full>
        {children}
      </Grommet>
    </SWRConfig>
  );
}
