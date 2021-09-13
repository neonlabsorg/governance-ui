type VoteResultsBarProps = {
  approveVotePercentage: number
  denyVotePercentage: number
}

const VoteResultsBar = ({
  approveVotePercentage = 0,
  denyVotePercentage = 0,
}: VoteResultsBarProps) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="font-bold text-fgd-1">
            <span className="mr-1 text-xs text-fgd-3">Approve</span>
            {approveVotePercentage.toFixed(2)}%
          </p>
        </div>
        <div className="flex items-center">
          <p className="font-bold text-fgd-1">
            <span className="mr-1 text-xs text-fgd-3">Deny</span>
            {denyVotePercentage.toFixed(2)}%
          </p>
        </div>
      </div>
      <div className="bg-neon-lightblue h-2 flex flex-grow mt-2.5 rounded w-full">
        <div
          style={{
            width: `${
              approveVotePercentage > 2 || approveVotePercentage < 0.01
                ? approveVotePercentage
                : 2
            }%`,
          }}
          className={`bg-primary-light flex rounded-l ${
            denyVotePercentage < 0.01 && 'rounded'
          }`}
        ></div>
        <div
          style={{
            width: `${
              denyVotePercentage > 2 || denyVotePercentage < 0.01
                ? denyVotePercentage
                : 2
            }%`,
          }}
          className={`bg-primary-dark flex rounded-r ${
            approveVotePercentage < 0.01 && 'rounded'
          }`}
        ></div>
      </div>
    </>
  )
}

export default VoteResultsBar
