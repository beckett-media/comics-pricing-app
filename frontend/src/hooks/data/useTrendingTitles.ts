import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueMinimal } from "types/api"

export default function useTrendingTitles() {
  const { data, error } = useSWR<any>("/issue/trending");
  console.log('trendingtitles', data);
  return {
    data: (data?.rows ? data.rows : []) as IssueMinimal[],
    isLoading: !error && !data,
    isError: error,
  };

}

