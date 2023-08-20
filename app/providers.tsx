"use client";
import StyledComponentsRegistry from "@/lib/registry";
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
      <StyledComponentsRegistry>
        <Grommet theme={theme} full>
          {children}
        </Grommet>
      </StyledComponentsRegistry>
    </SWRConfig>
  );
}
