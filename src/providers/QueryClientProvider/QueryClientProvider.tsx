// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FC, PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
