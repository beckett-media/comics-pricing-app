import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { Publisher } from "types/api"

export default function usePopularPublishers() {
  const { data, error } = useSWR<any>("/publisher/popular");

  return {
    data: (data?.rows ? data.rows : []) as Publisher[],
    isLoading: !error && !data,
    isError: error,
  };

}

