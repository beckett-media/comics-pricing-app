import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueTrends } from "types/api"

export default function useRecentPriceDrops() {
  const { data, error } = useSWR<IssueTrends[]>("/issue/recent-price-drops");

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };
}

