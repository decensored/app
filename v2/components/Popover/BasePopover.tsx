import React, { FunctionComponent, useState } from 'react'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'

interface PopoverProps {
  popoverButton: JSX.Element
  popoverPanel: JSX.Element
}

const BasePopover: FunctionComponent<PopoverProps> = ({
  popoverButton,
  popoverPanel
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })
  return(
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        {popoverButton}
      </Popover.Button>

      <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {popoverPanel}
      </Popover.Panel>
    </Popover>
  )
}

export default BasePopover
