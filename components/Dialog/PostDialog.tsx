import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'
import type { SpaceType } from 'lib/types'
import useStore from 'lib/store'

interface PostDialogProps {
  showDialog: boolean
  onClose: () => void
}

const PostDialog = ({ showDialog, onClose }: PostDialogProps) => {
  const [currentSpace, setCurrentSpace] = useState<SpaceType | undefined>()
  const [isSignedUp, spaces] = useStore((state) => [state.isSignedUp, state.spaces, state.userId])
  const { query } = useRouter()

  useEffect(() => {
    if (showDialog) {
      const urlSpaceName = query.name

      // Either set the state found by url name or use a default space for now
      if (urlSpaceName) {
        setCurrentSpace(spaces.find((space: SpaceType) => space.name === urlSpaceName))
      } else {
        setCurrentSpace(spaces.find((space: SpaceType) => space.id === 1))
      }
    }
  }, [showDialog, spaces, query.name])

  if (!isSignedUp || !showDialog) {
    return null
  }

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      clickOutside
      body={
        <div>
          <div className='mb-6'>{currentSpace?.name}</div>
          {currentSpace && <PostForm spaceId={currentSpace.id} isTransparent autoFocus />}
        </div>
      }
      width='2xl'
    />
  )
}

export default PostDialog
