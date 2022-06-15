import algoliasearch from "algoliasearch/lite"
import { useContext } from "react"
import { Link } from "react-router-dom"
import {
  Configure,
  InstantSearch,
  useHits,
  useInfiniteHits,
  UseInfiniteHitsProps,
  useSearchBox,
  DynamicWidgets,
} from "react-instantsearch-hooks-web"

import { NavBarContext } from "components/common/NavBar"
import Filters from "components/search/Filters"
import Results from "components/search/Results"
import HotComics from "components/search/HotComics"
import Result from "components/search/Result"
import { Button } from "@chakra-ui/react"


function cx(
  ...classNames: Array<string | number | boolean | undefined | null>
) {
  return classNames.filter(Boolean).join(' ');
}


export type InfiniteHitsProps<THit> = React.ComponentProps<'div'> &
  UseInfiniteHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element;
  };


const INDEX_NAME = "comic_dev"
const HITS_PER_PAGE = 10
const searchClient = algoliasearch("9E5QQ1C8WZ", "c476e3b9463ab96d4f284b5b8f6764de")


type Issue = {
  id: string
  title_name: string
  issue_num: string
  publisher_name: string
  cpg_id: string
  volume: string
  year: string
  cover_price:string
  issue_comment:string
  age:string
}


function Page() {
  const { clear, refine } = useSearchBox()
  const { text: navBarText } = useContext(NavBarContext)
  //const { hits } = useHits<Issue>()

  const { hits, isFirstPage, isLastPage, showMore, showPrevious, results } =
    useInfiniteHits<Issue>();

  if (navBarText) {
    refine(navBarText)
  } else {
    clear()
  }

  return (
    <div className="flex flex-row space-x-2 items-center">
      <div className="mt-10 flex w-full">
        <div className="flex w-full gap-10">
          <Filters />
          {/* <Results hits={hits} /> */}
          {/* <HotComics /> */}
          
          <div className="flex w-full flex-col rounded bg-container-outer p-7 text-common-text">
            <p className="text-xl">{results?.nbHits} Results</p>
            
            
            <div className={cx('ais-InfiniteHits')}>
                {/* {showPrevious && (
                  <Button
                    className={cx(
                      'ais-InfiniteHits-loadPrevious',
                      isFirstPage && 'ais-InfiniteHits-loadPrevious--disabled'
                    )}
                    onClick={showPrevious}
                    disabled={isFirstPage}
                  >
                    Show previous results
                  </Button>
                )} */}
                <ol className="ais-InfiniteHits-list">
                  {hits.map((hit) => (
                  <Result key={hit.id} {...hit} />
                ))}
                </ol>
                {results?.nbHits != 0 ? 
                <button
                  className={cx(
                    'ais-InfiniteHits-loadMore w-full button button-primary fold-bold',
                    isLastPage && 'ais-InfiniteHits-loadMore--disabled button-disabled'
                  )}
                  onClick={showMore}
                  disabled={isLastPage}
                >
                  Show more results
                </button>
: <div className='w-full text-xl text-center'>No mathing results found.</div>
} 
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default function Search() {
  return (
    <InstantSearch searchClient={searchClient} indexName={INDEX_NAME} routing={true}>
      <Configure hitsPerPage={HITS_PER_PAGE} />
      <Page />
    </InstantSearch>
  )
}
