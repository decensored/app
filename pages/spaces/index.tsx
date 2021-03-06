import React, { useState } from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpacesHeader from 'components/Spaces/SpacesHeader'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import Icon from 'components/Icons/Icon'
import { style } from 'styles/style'
import { sortSpaces } from 'lib/storeUtils'
import { SpaceType } from 'lib/types'
import useScreenSizeQuery from 'hooks/useScreenSizeQuery.js'
import Seo from 'components/Scaffolding/Seo'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, spacesSortType, setSpacesSortType, posts, userId] = useStore(
    (state) => [
      state.isSignedUp,
      state.spaces,
      state.spacesSortType,
      state.setSpacesSortType,
      state.posts,
      state.userId,
    ],
    shallow
  )
  const [searchTerm, setSearchTerm] = React.useState('')
  const [spaceResults, setSpaceResults] = React.useState([] as SpaceType[])
  const [openCreateSpaceDialog, setOpenCreateSpaceDialog] = useState(false)

  const isLargerThanSM = useScreenSizeQuery('isLargerThanSM')

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  // Search or sort spaces
  React.useEffect(() => {
    const result = sortSpaces(spaces, posts, spacesSortType, userId).filter((space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSpaceResults(result)
  }, [searchTerm, spacesSortType, spaces, posts, userId])

  const createSpaceItems = spaceResults.map((space: any) => <SpaceItem key={`space-${space.id}`} {...space} />)

  return (
    <>
      <Seo />
      <div className={style.feedWrapper}>
        <SpacesHeader />
        <div className={`${style.feedItemInteractionBar}`}>
          {isSignedUp && (
            <>
              <button
                type='button'
                onClick={() => setOpenCreateSpaceDialog(true)}
                className={`${style.button} ${style.buttonDecensored} ${style.buttonIconOnlyMobile}`}
              >
                <Icon icon='faPlus' isFixed />
                {isLargerThanSM && <span>Create</span>}
              </button>
              <CreateSpaceDialog showDialog={openCreateSpaceDialog} onClose={() => setOpenCreateSpaceDialog(false)} />
            </>
          )}
          <div className={`${style.selectWrapper} min-w-[165px]`}>
            <select
              className={`
              ${style.select}
              ${style.input}
              ${style.inputDefault}
              ${style.inputDefaultDarkBordered}
            `}
              value={spacesSortType}
              onChange={(e) => setSpacesSortType(e.target.value)}
            >
              <option value='latestPostIndexInSpace|desc'>Latest Activity</option>
              <option value='numberOfPostsInSpace|desc'>Most Posts</option>
              <option value='id|desc'>Newest Space</option>
              {isSignedUp && <option value='mySpaces'>My Spaces</option>}
              {/* <option value='name|asc'>Name A-Z</option> */}
              {/* <option value='name|desc'>Name Z-A</option> */}
            </select>

            <div className={`${style.selectArrow} ${style.selectArrowDark}`}>
              <svg className='h-4 w-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
          <div className='basis-full'>
            <div className={style.inputWrapper}>
              <span className={style.inputIconAddon}>
                <Icon icon='faSearch' isFixed />
              </span>
              <input
                value={searchTerm}
                onChange={handleChange}
                type='text'
                placeholder='Find Space'
                className={`
                  ${style.input}
                  ${style.inputDefault}
                  ${style.inputDefaultDarkBordered}
                  ${style.inputFocus}
                `}
              />
            </div>
          </div>
        </div>
        {createSpaceItems}
      </div>
    </>
  )
}

export default Spaces
