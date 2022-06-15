import useSWR from "swr"
import { Link } from "react-router-dom"
import { ReactComponent as Chevron } from "assets/chevron.svg"
import { ReactComponent as Sparkle } from "assets/sparkle.svg"
import useNewComics from "hooks/data/useNewComics"
import { IssueTrends } from "types/api"

export default function NewComics() {
  const { data: issues, isLoading, isError } = useNewComics();
  const issueClean = IssueClean(issues);
  return (
    <div className="w-full">
      <div className="h-60 p-2 divide-y-2 rounded divide-list-line bg-container-outer">
        <div className="flex gap-2 p-2 text-sm text-white">
          <div className="pt-1">
            <Sparkle />
          </div>
          Recent Sales
        </div>
        <div className="text-xs text-white divide-y-2 divide-list-line">
          {issueClean.slice(0,5).map(({ id, issue, title, price }) => (
            <div key={id} className="flex flex-row justify-between p-2 border-t-2 border-solid border-gray-600">
              <div className="w-7/12 truncate">
              <Link to={`/details/${id}`}>{title} #{issue} </Link>
              </div>
              <Link to={`/details/${id}`}>
                <div className="flex flex-row">
                  ${Number?.parseFloat(price)?.toFixed(2)}
                  <div className="pt-1 pl-3">
                    <Chevron />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IssueClean(issues: Array<IssueTrends>) {
  const issueCheck: String[] = [];
  const issueClean: IssueTrends[] = [];
  issues.forEach(issue => {
    const currentIssue = `${issue.title}#${issue.issue}`;
    if (!issueCheck.some(x => x === currentIssue)) {
      issueCheck.push(currentIssue);
      issueClean.push(issue);
    }
  })
  if (issueClean.length > 2) {
    return issueClean.slice(0,5);
  } else {
    return issues.slice(0,5);
  }
}
