import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { Title } from "types/api"

export default function useSalesHistory() {
  const { data, error } = useSWR<any>("/issue/sales-history");

  return {
    data: (data?.rows ? data.rows : []) as any,
    isLoading: !error && !data,
    isError: error,
  };

}

