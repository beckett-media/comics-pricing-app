import { Refinement, RefinementEra } from "./Refinement"


export default function Filters() {
    return (
      <div className="flex flex-col bg-container-outer p-7 text-common-text w-96 gap-y-10">
        <Refinement title="Publisher" attribute="publisher_name" />
        <Refinement title="Title" attribute="title_name" />
        <Refinement title="Era" attribute="age" />
        <Refinement title="Publication Year" attribute="year" />
      </div>
    )
  }
