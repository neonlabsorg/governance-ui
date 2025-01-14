import useProposal from '../../hooks/useProposal'
import InstructionCard from './instructionCard'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { Wrapper } from '../common/Wrapper'

export function InstructionPanel() {
  const { instructions } = useProposal()

  if (Object.values(instructions).length === 0) {
    return null
  }

  return (
    <Disclosure>
      {({ open }) => (
        <Wrapper>
          <Disclosure.Button
            className={`font-bold px-6 py-4 text-fgd-1 transition-all w-full hover:bg-bkg-3 focus:outline-none ${
              open && 'rounded-b-none'
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="mb-0">Instructions</h2>
              <ChevronDownIcon
                className={`h-5 text-primary-light transition-all w-5 ${
                  open ? 'transform rotate-180' : 'transform rotate-360'
                }`}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className={`p-6 pt-0`}>
            {Object.values(instructions).map((pi, idx) => (
              <div className="pt-6" key={pi.pubkey.toBase58()}>
                <InstructionCard
                  index={idx + 1}
                  proposalInstruction={pi.info}
                ></InstructionCard>
              </div>
            ))}
          </Disclosure.Panel>
        </Wrapper>
      )}
    </Disclosure>
  )
}
