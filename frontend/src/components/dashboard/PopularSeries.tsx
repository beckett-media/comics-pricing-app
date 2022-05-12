import Gallery from "./Gallery"
import Issue from "./Issue"

export default function PopularSeries() {
  return (
    <Gallery title="Popular Series">
      {[...Array(8).keys()].map((_) => (
        <Issue />
      ))}
    </Gallery>
  )
}
