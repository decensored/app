import { useEffect } from 'react'
import useStore from 'lib/store'

const useDarkmodeSwitch = () => {
  const isDarkmode = useStore((state) => state.isDarkmode)

  useEffect(() => {
    document.documentElement.className = isDarkmode ? 'dark' : 'light'
  }, [isDarkmode])

  return null
}

export default useDarkmodeSwitch
