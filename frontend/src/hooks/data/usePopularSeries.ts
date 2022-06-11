import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { Title } from "types/api"

export default function usePopularSeries() {
  const { data, error } = useSWR<any>("/title/popular");

  return {
    data: (data?.rows ? data.rows : []) as Title[],
    isLoading: !error && !data,
    isError: error,
  };

}

