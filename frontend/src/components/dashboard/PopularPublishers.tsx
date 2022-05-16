import useSWR from "swr";

import Gallery from "./Gallery";
import Publisher from "./Publisher";

type PublisherDetails = {
  id: string;
  name: string;
};

export default function PopularPublishers() {
  const { data: publishers } = useSWR<PublisherDetails[]>(
    "/api/publisher/popular"
  );

  if (!publishers) {
    return <div>loading</div>;
  }

  return (
    <Gallery title="Popular Publishers">
      {publishers.map(({ id, name }) => (
        <Publisher id={id} name={name} />
      ))}
    </Gallery>
  );
}
