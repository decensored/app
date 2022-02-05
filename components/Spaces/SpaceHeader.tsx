import React, { FunctionComponent, useState } from 'react'
import SpaceSettingsDialog from 'components/Dialog/SpaceSettingsDialog'
import UserDialog from 'components/Dialog/UserDialog'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import { SpaceType, UserType } from 'lib/types'

interface SpaceHeaderProbs {
  space: SpaceType
  spaceOwner: boolean
  name: string | string[] | undefined
  nrOfPosts: number
  nrOfUSers: number
  userArray: UserType[]
  blackListArray: UserType[]
  setBlackListArray: React.Dispatch<React.SetStateAction<UserType[]>>
}

const SpaceHeader: FunctionComponent<SpaceHeaderProbs> = ({
  space,
  spaceOwner,
  name,
  nrOfPosts,
  nrOfUSers,
  userArray,
  blackListArray,
  setBlackListArray,
}) => {
  const [openSpaceSettingsDialog, setOpenSpaceSettingsDialog] = useState(false)
  const [openUserDialog, setOpenUserDialog] = useState(false)

  return (
    <div className={style.spaceHeaderWrapper}>
      {spaceOwner && (
        <>
          <SVGIcon
            icon='faCog'
            className='absolute top-3 right-3 cursor-pointer text-white'
            onClick={() => setOpenSpaceSettingsDialog(true)}
          />
          <SpaceSettingsDialog
            space={space.id}
            name={space.name}
            blacklistedUsers={blackListArray}
            setBlacklist={setBlackListArray}
            showDialog={openSpaceSettingsDialog}
            onClose={() => setOpenSpaceSettingsDialog(false)}
          />
        </>
      )}
      <div className={style.spaceHeaderInner}>
        <div className={style.spaceHeaderInnerCol1}>
          <div className={style.spaceHeaderTitle}>#{name}</div>
          <div className={style.spaceHeaderDescription}>{space.description}</div>
        </div>
        <div className={style.spaceHeaderInnerCol2}>
          {' '}
          <div className={style.spaceHeaderDataWrapper}>
            <div className={style.spaceHeaderDataCol}>
              <span className={style.spaceHeaderDataTitle}>{nrOfPosts}</span>
              <span className={style.spaceHeaderDataText}>Posts</span>
            </div>
            <div className={style.spaceHeaderDataCol}>
              <button
                type='button'
                onClick={() => {
                  setOpenUserDialog(true)
                }}
                className={style.spaceHeaderDataTitle}
              >
                {nrOfUSers}
              </button>
              <span className={style.spaceHeaderDataText}>Followers</span>
              <UserDialog users={userArray} showDialog={openUserDialog} onClose={() => setOpenUserDialog(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpaceHeader
