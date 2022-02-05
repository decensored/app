import React from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpaceHeader from 'components/Spaces/SpaceHeader'
import { style } from 'styles/style'
import { sortSpaces } from 'lib/storeUtils'
import { SpaceType } from 'lib/types'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, posts] = useStore((state) => [state.isSignedUp, state.spaces, state.posts], shallow)
  const [sortType, setSortType] = React.useState('numberOfPostsInSpace')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [spaceResults, setSpaceResults] = React.useState([] as SpaceType[])

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  // Search or sort spaces
  React.useEffect(() => {
    const result = sortSpaces(spaces, posts, sortType).filter((space) => space.name.toLowerCase().includes(searchTerm))
    setSpaceResults(result)
  }, [searchTerm, sortType, spaces, posts])

  const createSpaceItems = spaceResults.map((space: any) => <SpaceItem key={`space-${space.id}`} {...space} />)

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1} hide-on-mobile`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          <div className={style.feedWrapper}>
            {isSignedUp && <SpaceHeader />}
            <div className='flex'>
              <input
                value={searchTerm}
                onChange={handleChange}
                type='text'
                placeholder='Search for a space'
                className={`
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
              `}
              />
              <select
                className={`
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
              `}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value='numberOfPostsInSpace|desc'>Most active</option>
                <option value='latestPostIndexInSpace|desc'>Latest Activity</option>
                <option value='id|desc'>Newest Space</option>
                {/*             <option value='name|asc'>Name A-Z</option>
              <option value='name|desc'>Name Z-A</option> */}
              </select>
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
