import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { recoverUser } from 'api/user'
import { style } from 'styles/style'

const Recover: NextPage = () => {
  const router = useRouter()
  const { code } = router.query
  const [currentState, setCurrentState] = React.useState('Received your Key')
  const [currentExtra, setCurrentExtra] = React.useState(
    'This may take a few seconds, please dont close this page'
  )
  const [isLoading, setIsLoading] = React.useState(true)
  const { setIsSignedUp, setUserName, setUserId, contract } = useStore(
    (state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,
      userName: state.userName,
      setUserName: state.setUserName,
      setUserId: state.setUserId,
      contract: state.contract,
    })
  )

  React.useEffect(() => {
    if (!contract || !code) return
    async function checkKey() {
      if (code) {
        const result = await recoverUser(contract, code.toString())
        if (result.success) {
          setIsSignedUp(true)
          setUserName(result.username)
          setUserId(result.userId)
          setCurrentState('Hurrraaay!!')
          setCurrentExtra('You will be redirected soon..')
          setIsLoading(false)
          router.push(`/spaces`)
        } else {
          setCurrentState(`${result.error}`)
          setIsLoading(false)
        }
      }
      return code
    }
    checkKey()
  })

  return (
    <div className={style.loadingWrapper}>
      <img
        alt='Decensored Logo'
        src='/logo/logotype.svg'
        className='fixed top-10 hidden xs:block'
        width={270}
      />
      {isLoading && (
        <SVGIcon
          icon='faSpinner'
          className='ml-2 animate-spin text-5xl text-highlight-800'
        />
      )}
      {!isLoading && (
        <SVGIcon icon='faCheck' className='ml-2 text-5xl text-green-600' />
      )}
      <h2 className='text-center text-highlight-800 text-2xl font-semibold mt-3'>
        {currentState}
      </h2>
      <p className='w-1/3 text-center pt-2'>{currentExtra}</p>
    </div>
  )
}

export default Recover
