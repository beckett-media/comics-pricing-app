import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";
import { IssueTrends } from "types/api"

export default function useNewComics() {
  const { data, error } = useSWR<IssueTrends[]>("/issue/new-comics");

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: error,
  };

}

// export function useUpdateGraders() {
//   const { mutate } = useSWRConfig();

//   return (body) => {
//     mutate(`/graders`, async (entries) => {
//       try {
//         const response = await API.put("palentirApi", "/graders", body);

//         console.log("useUpdateGraders success", response);
//         return (entries || []).filter((e) =>
//           e.id === body.id ? response.data : e
//         );
//       } catch {
//         return entries;
//       }
//     });
//   };
// }

// export function useAddGraders() {
//   const { mutate } = useSWRConfig();

//   return (body) => {
//     mutate(`/graders`, async (entries) => {
//       try {
//         const response = await API.post("palentirApi", "/graders", body);

//         console.log("useAddGraders success", response);
//         return [...(entries || []), response.data];
//       } catch {
//         return entries;
//       }
//     });
//   };
// }

