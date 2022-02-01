import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import { usePopperTooltip } from 'react-popper-tooltip'
import { style } from 'styles/style'

interface TooltipProps {
  classNames: string
  text: string
  children: JSX.Element[] | JSX.Element
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  classNames,
  text,
  children,
}) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      followCursor: true,
      delayShow: 500,
      placement: 'auto-start',
      offset: [12, 12],
    })

  const tooltipStyles = (
    style.tooltip + style.tooltipDark
  )

  return (
    <span ref={setTriggerRef} className={classNames}>
      {children}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: tooltipStyles })}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  )
}

export default Tooltip
