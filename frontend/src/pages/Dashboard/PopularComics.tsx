import Gallery from "./Gallery"
import Issue from "./Issue"

export default function PopularComics() {
  return (
    <Gallery title="Popular Comics">
      {[...Array(8).keys()].map((_) => (
        <Issue />
      ))}
    </Gallery>
  )
}
