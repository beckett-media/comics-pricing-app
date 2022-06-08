import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueFull } from "types/api";

export default function useIssueDetails(issueId?: string) {
  const { data, error } = useSWR<IssueFull>(issueId ? `/issue/${issueId}` : null);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };

}
