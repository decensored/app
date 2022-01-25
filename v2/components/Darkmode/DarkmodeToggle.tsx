import { FunctionComponent, useEffect } from 'react'
import useStore from 'lib/store'

const DarkmodeToggle: FunctionComponent = () => {
  const [isDarkmode] = useStore((state) => [state.isDarkmode])

  useEffect(() => {
    document.documentElement.className = isDarkmode ? 'dark' : 'light'
  }, [isDarkmode])

  return null
}

export default DarkmodeToggle
