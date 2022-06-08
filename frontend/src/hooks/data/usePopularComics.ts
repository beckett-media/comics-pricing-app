import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueMinimal } from "types/api";

export default function usePopularComics() {
  const { data, error } = useSWR<IssueMinimal[]>("/issue/popular");

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };

}
