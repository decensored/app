import React, { FunctionComponent, useState } from 'react'
import ReactDOM from 'react-dom'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'

interface PopoverProps {
  popoverButton: JSX.Element
  popoverPanel: JSX.Element
}

const BasePopover: FunctionComponent<PopoverProps> = ({
  popoverButton,
  popoverPanel,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  })
  return (
    <Popover>
      <Popover.Button
        ref={setReferenceElement}
        className='outline-none focus:outline-none focus:ring-0'
      >
        {popoverButton}
      </Popover.Button>

      {ReactDOM.createPortal(
        <Popover.Panel
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {popoverPanel}
        </Popover.Panel>,
        document.body
      )}
    </Popover>
  )
}

export default BasePopover
