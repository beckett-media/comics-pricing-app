

export default function IssueChips({ issue_comment, age }: { issue_comment: string | null, age:string }) {
    return (
      <div className="flex w-full gap-2 text-xs mt-2">
        <div className={issue_comment !='' ? 'px-2 py-1 rounded bg-key-issue' :'hidden'  }>Key Issue</div>
        <div className={`rounded bg-${age?.toLowerCase()}-age py-1 px-2`}>
          {age} Age
        </div>
      </div>
    )
  }
