import useWalletStore from '../../../stores/useWalletStore'
import useRealm from '../../../hooks/useRealm'
import { useEffect, useState } from 'react'
import ProposalFilter from '../../../components/ProposalFilter'
import ProposalCard from '../../../components/ProposalCard'
import { Wrapper } from '../../../components/common/Wrapper'
import TokenBalanceCard from '../../../components/TokenBalanceCard'
import { Proposal, ProposalState } from '../../../models/accounts'

const compareProposals = (p1: Proposal, p2: Proposal) => {
  const p1Rank = p1.getStateSortRank()
  const p2Rank = p2.getStateSortRank()

  if (p1Rank > p2Rank) {
    return 1
  } else if (p1Rank < p2Rank) {
    return -1
  }

  const tsCompare = p1.getStateTimestamp() - p2.getStateTimestamp()

  // Show the proposals in voting state expiring earlier at the top
  return p1.state === ProposalState.Voting ? ~tsCompare : tsCompare
}

const DAO = () => {
  const { proposals, realmTokenAccount, ownTokenRecord } = useRealm()
  const [filters, setFilters] = useState([])
  const [displayedProposals, setDisplayedProposals] = useState([])
  const [filteredProposals, setFilteredProposals] = useState(displayedProposals)
  const wallet = useWalletStore((s) => s.current)

  const allProposals = Object.entries(proposals)
    .filter(([, v]) => v.info.votingAt)
    .sort((a, b) => compareProposals(b[1].info, a[1].info))

  useEffect(() => {
    setDisplayedProposals(allProposals)
    setFilteredProposals(allProposals)
  }, [proposals])

  useEffect(() => {
    if (filters.length > 0) {
      const proposals = displayedProposals.filter(
        ([, v]) => !filters.includes(ProposalState[v.info.state])
      )
      setFilteredProposals(proposals)
    } else {
      setFilteredProposals(allProposals)
    }
  }, [filters])

  // DEBUG print remove
  console.log(
    'governance page tokenAccount',
    realmTokenAccount && realmTokenAccount.publicKey.toBase58()
  )

  console.log(
    'governance page wallet',
    wallet?.connected && wallet.publicKey.toBase58()
  )

  console.log(
    'governance page tokenRecord',
    wallet?.connected && ownTokenRecord
  )

  return (
    <>
      <div className="grid grid-cols-12 gap-4 pb-10 pt-9">
        <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-title">{`${filteredProposals.length} proposals`}</h2>
            <ProposalFilter filters={filters} setFilters={setFilters} />
          </div>
          {filteredProposals.length > 0 ? (
            filteredProposals.map(([k, v]) => (
              <ProposalCard key={k} id={k} proposal={v.info} />
            ))
          ) : (
            <Wrapper className="px-6 py-4 text-center text-fgd-3">
              No proposals found
            </Wrapper>
          )}
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <TokenBalanceCard />
        </div>
      </div>
    </>
  )
}

export default DAO
