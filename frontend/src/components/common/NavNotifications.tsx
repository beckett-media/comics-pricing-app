import React from "react"
import { Link } from "react-router-dom"
import useNewComics from "hooks/data/useNewComics"
import { IssueTrends } from "types/api"

const NavNotifications = () => {
  const { data: issues, isLoading, isError } = useNewComics();
  const issueClean = IssueClean(issues);

  return (
    <button className="nav-notifications relative">
      <i className="fa-regular fa-bell" />
      <div className="nav-notifications-content transition bg-container-inner absolute text-sm font-medium flex flex-col rounded right-0 w-80 h-52 overflow-auto">
        {issueClean.map(({ id, issue, title, price }, index) => (
          <>
            <Link to={`/details/${id}`}>
              <div className="flex items-center text-left px-6 py-4 transition hover:bg-nav-hover w-full rounded">
                <div>A new listing for <span className="text-notifications">{title}</span> was posted!</div>
              </div>
            </Link>
            {issueClean.length -1 !== index && (
              <div className="flex justify-center">
                <div className="h-px w-10/12 bg-white opacity-30"></div>
              </div>
            )}
          </>

        ))}
      </div>
    </button>
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
    return issueClean.slice(0,10);
  } else {
    return issues.slice(0,10);
  }
}

export default NavNotifications