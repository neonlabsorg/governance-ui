import React from 'react'
import useProposal from '../hooks/useProposal'
import useProposalVotes from '../hooks/useProposalVotes'
import VoteResultsBar from './VoteResultsBar'
import { Wrapper } from './common/Wrapper'
import ApprovalQuorum from './ApprovalQuorum'

const ProposalResultsCard = () => {
  const { proposal } = useProposal()
  const {
    yesVoteProgress,
    yesVoteCount,
    noVoteCount,
    relativeNoVotes,
    relativeYesVotes,
  } = useProposalVotes(proposal?.info)
  return (
    <Wrapper>
      <div className="p-6">
        <h3 className="mb-4">Results</h3>
        <div className="flex space-x-4 items-center">
          {proposal ? (
            <div className="bg-bkg-1 flex px-4 py-2 rounded w-full">
              <div className="border-r border-bkg-4 w-1/2">
                <p className="text-fgd-3 text-xs">Approve</p>
                <div className="font-bold">{yesVoteCount.toLocaleString()}</div>
              </div>
              <div className="pl-4 w-1/2">
                <p className="text-fgd-3 text-xs">Deny</p>
                <div className="font-bold">{noVoteCount.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <>
              <div className="animate-pulse bg-bkg-3 h-12 rounded w-full" />
            </>
          )}
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.05)] p-6 w-full">
        <div className="pb-4">
          <VoteResultsBar
            approveVotePercentage={relativeYesVotes}
            denyVotePercentage={relativeNoVotes}
          />
        </div>
        <ApprovalQuorum progress={yesVoteProgress} />
      </div>
    </Wrapper>
  )
}

export default ProposalResultsCard
