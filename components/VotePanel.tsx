import { useCallback, useState } from 'react'
import { relinquishVote } from '../actions/relinquishVote'
import { useHasVoteTimeExpired } from '../hooks/useHasVoteTimeExpired'
import useRealm from '../hooks/useRealm'
import { ProposalState } from '../models/accounts'
import { RpcContext } from '../models/core/api'

import { Vote } from '../models/instructions'
import useWalletStore from '../stores/useWalletStore'
import Button from './Button'
import { Wrapper } from './common/Wrapper'
import VoteCommentModal from './VoteCommentModal'

const VotePanel = () => {
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [vote, setVote] = useState(null)
  const { governance, proposal, voteRecordsByVoter } = useWalletStore(
    (s) => s.selectedProposal
  )
  const { ownTokenRecord } = useRealm()
  const wallet = useWalletStore((s) => s.current)
  const connection = useWalletStore((s) => s.connection)
  const { fetchVoteRecords } = useWalletStore((s) => s.actions)
  const connected = useWalletStore((s) => s.connected)
  const hasVoteTimeExpired = useHasVoteTimeExpired(governance, proposal)
  const ownVoteRecord = voteRecordsByVoter[wallet?.publicKey?.toBase58()]

  const isVoteCast = ownVoteRecord !== undefined
  const isVoting =
    proposal?.info.state === ProposalState.Voting && !hasVoteTimeExpired

  const isVoteEnabled =
    connected &&
    isVoting &&
    !isVoteCast &&
    ownTokenRecord &&
    !ownTokenRecord.info.governingTokenDepositAmount.isZero()

  const isWithdrawEnabled =
    connected &&
    ownVoteRecord &&
    !ownVoteRecord?.info.isRelinquished &&
    (proposal.info.state === ProposalState.Voting ||
      proposal.info.state === ProposalState.Completed ||
      proposal.info.state === ProposalState.Cancelled ||
      proposal.info.state === ProposalState.Succeeded ||
      proposal.info.state === ProposalState.Executing ||
      proposal.info.state === ProposalState.Defeated)

  const submitRelinquishVote = async () => {
    const rpcContext = new RpcContext(
      proposal.account.owner,
      wallet,
      connection.current,
      connection.endpoint
    )
    try {
      await relinquishVote(
        rpcContext,
        proposal,
        ownTokenRecord.pubkey,
        ownVoteRecord.pubkey
      )
    } catch (ex) {
      console.error("Can't relinquish vote", ex)
    }

    fetchVoteRecords(proposal)
  }

  const handleShowVoteModal = (vote) => {
    setVote(vote)
    setShowVoteModal(true)
  }

  const handleCloseShowVoteModal = useCallback(() => {
    setShowVoteModal(false)
  }, [])

  const actionLabel = !isVoteCast
    ? 'Cast your vote'
    : isVoting
    ? 'Withdraw your vote'
    : 'Release your tokens'

  return (
    <Wrapper className="p-6 space-y-6">
      <h2 className="mb-4 text-center">{actionLabel}</h2>
      <div className="flex items-center justify-center">
        {isVoteCast ? (
          <Button
            className="mx-2 w-44"
            onClick={() => submitRelinquishVote()}
            disabled={!isWithdrawEnabled}
          >
            {isVoting ? 'Withdraw Vote' : 'Release Tokens'}
          </Button>
        ) : (
          <>
            <Button
              className="mx-2 w-44"
              onClick={() => handleShowVoteModal(Vote.Yes)}
              disabled={!isVoteEnabled}
            >
              Approve
            </Button>
            <Button
              className="mx-2 w-44"
              onClick={() => handleShowVoteModal(Vote.No)}
              disabled={!isVoteEnabled}
            >
              Deny
            </Button>
          </>
        )}
      </div>
      {showVoteModal ? (
        <VoteCommentModal
          isOpen={showVoteModal}
          onClose={handleCloseShowVoteModal}
          vote={vote}
        />
      ) : null}
    </Wrapper>
  )
}

export default VotePanel
