import React, { useState } from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpacesHeader from 'components/Spaces/SpacesHeader'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import { sortSpaces } from 'lib/storeUtils'
import { SpaceType } from 'lib/types'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, spacesSortType, setSpacesSortType, posts] = useStore(
    (state) => [state.isSignedUp, state.spaces, state.spacesSortType, state.setSpacesSortType, state.posts],
    shallow
  )
  const [searchTerm, setSearchTerm] = React.useState('')
  const [spaceResults, setSpaceResults] = React.useState([] as SpaceType[])
  const [openCreateSpaceDialog, setOpenCreateSpaceDialog] = useState(false)

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  // Search or sort spaces
  React.useEffect(() => {
    const result = sortSpaces(spaces, posts, spacesSortType).filter((space) =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSpaceResults(result)
  }, [searchTerm, spacesSortType, spaces, posts])

  const createSpaceItems = spaceResults.map((space: any) => <SpaceItem key={`space-${space.id}`} {...space} />)

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1} hide-on-handheld`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          <div className={style.feedWrapper}>
            {isSignedUp && <SpacesHeader />}
            <div className={`${style.feedItemInteractionBar}`}>
              {isSignedUp && (
                <>
                  <button
                    type='button'
                    onClick={() => setOpenCreateSpaceDialog(true)}
                    className={`${style.button} ${style.buttonDecensored} ${style.buttonIconOnlyMobile}`}
                  >
                    <SVGIcon icon='faPlus' isFixed />
                    <span className='hide-on-mobile'>Create</span>
                  </button>
                  <CreateSpaceDialog
                    showDialog={openCreateSpaceDialog}
                    onClose={() => setOpenCreateSpaceDialog(false)}
                  />
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
                  <option value='numberOfPostsInSpace|desc'>Most active</option>
                  <option value='latestPostIndexInSpace|desc'>Latest Activity</option>
                  <option value='id|desc'>Newest Space</option>
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
                    <SVGIcon icon='faSearch' isFixed />
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
        </div>
      </div>
      <div className='hide-on-desktop'>
        <BottomNavigation />
      </div>
    </>
  )
}

export default Spaces
