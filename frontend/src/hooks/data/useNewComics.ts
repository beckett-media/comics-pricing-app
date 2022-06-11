import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueTrends } from "types/api"

export default function useNewComics() {
  const { data, error } = useSWR<any>("/issue/new-comics");

  return {
    data: (data?.rows ? data.rows : []) as IssueTrends[],
    isLoading: !error && !data,
    isError: error,
  };

}

