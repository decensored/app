import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import delay from 'lodash/delay'
import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/fp/sortBy'
import map from 'lodash/fp/map'
import flow from 'lodash/fp/flow'
import { isBrowser } from 'react-device-detect'
import useStore from 'lib/store'
import type { SpaceType } from 'lib/types'
import { style } from 'styles/style'
import PostForm from 'components/Post/PostForm'
import BaseDialog from 'components/Dialog/BaseDialog'
import Autocomplete, { Option } from 'components/Autocomplete/Autocomplete'

interface PostDialogProps {
  showDialog: boolean
  onClose: () => void
}

const buildOptions = (spaces: SpaceType[] = []): Option[] =>
  flow([
    sortBy(['name']),
    map(
      (space: SpaceType): Option => ({
        value: space.id,
        label: space.name,
      })
    ),
  ])(spaces)

const TIMEOUT_CLOSE_ON_SPREAD = 500

const PostDialog = ({ showDialog, onClose }: PostDialogProps) => {
  const [isSignedUp, spaces] = useStore((state) => [state.isSignedUp, state.spaces, state.userId])

  const [currentSpace, setCurrentSpace] = useState<SpaceType | undefined>()
  const [spacesOptions, setSpacesOptions] = useState<Option[]>(buildOptions(spaces))
  const router = useRouter()

  const spacesRef = useRef(spaces)

  useEffect(() => {
    if (showDialog) {
      const urlSpaceName = router.query.name

      // Either set the state found by url name or use a default space for now
      if (urlSpaceName) {
        setCurrentSpace(spaces.find((space: SpaceType) => space.name === urlSpaceName))
      } else {
        setCurrentSpace(spaces.find((space: SpaceType) => space.id === 1))
      }
    }
  }, [showDialog, spaces, router.query.name])

  // Update select options when spaces have changed.
  // Due to polling spaces, we use a ref to compare spaces and only re-build option when
  // spaces are really different
  useEffect(() => {
    if (!isEqual(spaces, spacesRef.current)) {
      setSpacesOptions(buildOptions(spaces))
      spacesRef.current = spaces
    }
  }, [spaces, spacesRef])

  if (!isSignedUp || !showDialog) {
    return null
  }

  const currentOption = currentSpace ? { value: currentSpace.id, label: currentSpace.name } : undefined

  const handleOptionChange = (newValue?: Option) => {
    setCurrentSpace(spaces.find((space: SpaceType) => space.id === newValue?.value))
  }

  const handleOnClose = () => {
    setCurrentSpace(undefined)
    onClose()
  }

  const onSpread = () => {
    if (currentSpace) {
      router.push(`/space/${currentSpace.name}`)
    }
    handleOnClose()
  }

  const handleSpreadFinish = () => delay(onSpread, TIMEOUT_CLOSE_ON_SPREAD)

  // const labelClasses = 'mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300'
  const placement = isBrowser ? 'bottom' : 'top'
  const enableBodyOverflow = !isBrowser

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={handleOnClose}
      clickOutside
      width='2xl'
      bodyOverflow={enableBodyOverflow}
      body={
        <div>
          {/* <div className={labelClasses}>Post</div> */}
          {currentSpace && (
            <PostForm
              spaceId={currentSpace.id}
              onSpreadFinish={handleSpreadFinish}
              isTransparent
              autoFocus
              minRows={5}
              onSpread={onSpread}
              footerContent={
                <div className={style.postFormAutocompleteWrapper}>
                  {/* <div className={labelClasses}>Post In</div> */}
                  <Autocomplete
                    options={spacesOptions}
                    icon='faRocket'
                    defaultValue={currentOption ? [currentOption] : undefined}
                    onChange={handleOptionChange}
                    menuPlacement={placement}
                    maxMenuHeight={120}
                  />
                </div>
              }
            />
          )}
        </div>
      }
    />
  )
}

export default PostDialog
