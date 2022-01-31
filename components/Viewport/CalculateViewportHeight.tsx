/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FunctionComponent, useEffect } from 'react'
import throttle from 'lodash/fp/throttle'

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
const calcViewportUnits = () => {
  const vh = window.innerHeight * 0.01
  return `--vh: ${vh}px`
}

const CalculateViewportHeight: FunctionComponent = () => {
  useEffect(() => {
    const html = document.documentElement
    const setViewportUnits = () => {
      html.setAttribute('style', calcViewportUnits())
    }

    window.addEventListener('orientationchange', throttle(1000, setViewportUnits))
    window.addEventListener('resize', throttle(1000, setViewportUnits))

    setViewportUnits()
  })

  return null
}

export default CalculateViewportHeight
