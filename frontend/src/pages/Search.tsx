import { useParams } from "react-router-dom";

export default function Search() {
  const { query } = useParams<string>();
  return (
    <div>
      <h2>Search - {query}</h2>
    </div>
  );
}
