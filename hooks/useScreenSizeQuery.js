import { useMediaQuery } from 'react-responsive'

const queryLookup = {
  isSmallerThanXS: 'max-width: 400px',
  isSmallerThanSM: 'max-width: 640px',
  isSmallerThanMD: 'max-width: 768px',
  isSmallerThanLG: 'max-width: 1024px',
  isSmallerThanXL: 'max-width: 1280px',
  isLargerThanXS: 'min-width: 400px',
  isLargerThanSM: 'min-width: 640px',
  isLargerThanMD: 'min-width: 768px',
  isLargerThanLG: 'min-width: 1024px',
  isLargerThanXL: 'min-width: 1280px',
}

const useScreenSizeQuery = (mediaQuery) => {
  const setMediaQuery = () => {
    const getMediaQuery = queryLookup[mediaQuery]
    if (!getMediaQuery) console.warn(`${mediaQuery} undefined`)
    return getMediaQuery
  }

  return useMediaQuery({ query: `(${setMediaQuery()})` })
}

export default useScreenSizeQuery
