import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";

export default function usePriceAnalytics(id:string, num_months:string) {
  const { data, error } = useSWR<any>(`/issue/'${id}'/${num_months}/issue-price-analytics`);
  

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };

}
