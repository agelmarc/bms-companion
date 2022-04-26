import useSWR, { SWRResponse } from "swr";
import { Fetcher, PublicConfiguration } from "swr/dist/types";

import fetcher from "@lib/fetch";
import { Player, ServerStatus } from "types";

interface FetchResult<D, E> extends SWRResponse<D, E> {
  isLoading: boolean;
  isError: boolean;
}

const useFetch = <D = any, E = any>(
  path: string | null | [string, RequestInit],
  options?: Partial<PublicConfiguration<D, E, Fetcher<D>>> | undefined,
  customFetcher?: (path: string) => Promise<any>
) => {
  const swrResult = useSWR<D, E>(path, customFetcher ?? fetcher, options);
  return {
    ...swrResult,
    isLoading: !swrResult.error && !swrResult.data,
    isError: !!swrResult.error,
  } as FetchResult<D, E>;
};

const hookFactory = <P = string, D = any, E = any>(
  map: (params?: P) => string,
  options?: Partial<PublicConfiguration<D, E, Fetcher<D>>> | undefined
) => {
  return (arg?: P) => useFetch<D, E>(map(arg), options);
};

const useServerStatus = hookFactory<never, ServerStatus>(() => "gs/status", {
  refreshInterval: 10000,
});
const useOnlinePlayers = hookFactory<never, Player[]>(
  () => "gs/onlineplayers",
  { refreshInterval: 10000 }
);
export default useFetch;
export { hookFactory, useServerStatus, useOnlinePlayers };
