import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { dequeuePostsAndSpaces } from 'lib/storeUtils'

const QueueControl: FunctionComponent = () => {
  const {
    isPolledDataQueued,
    setIsPolledDataQueued,
    postsQueued,
    spacesQueued,
  } = useStore((state) => ({
    isPolledDataQueued: state.isPolledDataQueued,
    setIsPolledDataQueued: state.setIsPolledDataQueued,
    postsQueued: state.postsQueued,
    spacesQueued: state.spacesQueued,
  }))

  return (
    <span className='absolute'>
      queued posts: {postsQueued.length},&nbsp; queued spaces:{' '}
      {spacesQueued.length}&nbsp;
      <button
        type='button'
        onClick={() => {
          dequeuePostsAndSpaces()
          setIsPolledDataQueued(!isPolledDataQueued)
        }}
      >
        [{isPolledDataQueued ? 'DISABLE' : 'ENABLE'} QUEUEING]
      </button>
      &nbsp;
      <button type='button' onClick={dequeuePostsAndSpaces}>
        [DEQUEUE]
      </button>
    </span>
  )
}

export default QueueControl
