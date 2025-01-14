import DiscussionForm from './DiscussionForm'
import Comment from './Comment'
import useWalletStore from '../stores/useWalletStore'
import { Wrapper } from './common/Wrapper'

const DiscussionPanel = () => {
  const { chatMessages, voteRecordsByVoter } = useWalletStore(
    (s) => s.selectedProposal
  )

  return (
    <Wrapper className="p-6">
      <h2 className="mb-4">
        Discussion{' '}
        <span className="text-base text-fgd-3">
          ({Object.keys(chatMessages).length})
        </span>
      </h2>
      <div className="pb-4">
        <DiscussionForm />
      </div>
      {Object.values(chatMessages)
        .sort(
          (m1, m2) => m2.info.postedAt.toNumber() - m1.info.postedAt.toNumber()
        )
        .map((cm) => (
          <Comment
            chatMessage={cm.info}
            voteRecord={voteRecordsByVoter[cm.info.author.toBase58()]?.info}
            key={cm.pubkey.toBase58()}
          />
        ))}
    </Wrapper>
  )
}

export default DiscussionPanel
