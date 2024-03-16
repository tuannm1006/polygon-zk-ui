import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DefaultFcProps } from '../../common';

const queryClient = new QueryClient();

export const withReactQuery = (Component: React.FC<DefaultFcProps>) => (props: DefaultFcProps) =>
  (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
