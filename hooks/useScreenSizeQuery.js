import { useMediaQuery } from 'react-responsive'

const queryLookup = {
  isLargerThanXS: '400px',
  isLargerThanSM: '640px',
  isLargerThanMD: '768px',
  isLargerThanLG: '1024px',
  isLargerThanXL: '1280px',
}

const useScreenSizeQuery = (mediaQuery) => {
  const setMediaQuery = () => {
    const getMediaQuery = queryLookup[mediaQuery]
    if (!getMediaQuery) console.warn(`${mediaQuery} undefined`)
    return getMediaQuery
  }

  return useMediaQuery({ query: `(min-width: ${setMediaQuery()})` })
}

export default useScreenSizeQuery
