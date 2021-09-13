import Link from 'next/link'
import ReactMarkdown from 'react-markdown/react-markdown.min'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import useProposal from '../../../../hooks/useProposal'
import StatusBadge from '../../../../components/StatusBadge'
import TokenBalanceCard from '../../../../components/TokenBalanceCard'
import { InstructionPanel } from '../../../../components/instructions/instructionPanel'
import DiscussionPanel from '../../../../components/DiscussionPanel'
import VotePanel from '../../../../components/VotePanel'
import { ProposalState } from '../../../../models/accounts'

import useRealm from '../../../../hooks/useRealm'

import ProposalTimeStatus from '../../../../components/ProposalTimeStatus'
import ProposalResultsCard from '../../../../components/ProposalResultsCard'
import { Wrapper } from '../../../../components/common/Wrapper'

const Proposal = () => {
  const { symbol } = useRealm()
  const { proposal, description, instructions } = useProposal()

  console.log('proposal data', { proposal, instructions })

  return (
    <div className="pb-10 pt-3">
      <div className="pt-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-3">
            {proposal ? (
              <>
                <Wrapper className="p-6">
                  <Link href={`/dao/${symbol}/`}>
                    <a className="flex items-center text-fgd-3 text-sm transition-all hover:text-fgd-1">
                      <ArrowLeftIcon className="h-4 w-4 mr-1 text-primary-light" />
                      Back
                    </a>
                  </Link>
                  <div className="mb-6 py-4">
                    <div className="flex items-center justify-between mb-1">
                      <h1 className="font-title">{proposal?.info.name}</h1>
                      <StatusBadge
                        status={ProposalState[proposal?.info.state]}
                      />
                    </div>
                    <ProposalTimeStatus proposal={proposal?.info} />
                  </div>
                  {description && (
                    <ReactMarkdown className="markdown">
                      {description}
                    </ReactMarkdown>
                  )}
                </Wrapper>
                <div>
                  <InstructionPanel />
                </div>
              </>
            ) : (
              <div className="animate-pulse bg-bkg-3 h-64 rounded-lg" />
            )}
            <DiscussionPanel />
          </div>
          <div className="col-span-4 space-y-4">
            <TokenBalanceCard />
            <ProposalResultsCard />
            <VotePanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposal
