import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueTrends } from "types/api"

export default function useRecentPriceDrops() {
  const { data, error } = useSWR<any>("/issue/recent-price-drops");
  
  return {
    data: (data?.rows ? data.rows : []) as IssueTrends[],
    isLoading: !error && !data,
    isError: error,
  };
}

