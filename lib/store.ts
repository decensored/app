import create, { GetState, SetState } from 'zustand'
import { persist, StoreApiWithPersist } from 'zustand/middleware'
import type { LoadingProgressType, NodeInfoType, PostType, SpaceType } from 'lib/types'

export const STORE_VERSION = 11

export const DEFAULT_EVMNODE = 'https://hh.addiota.com'

export const DEFAULT_CONTRACTSADDRESS = '0x3eb8De6C1D7d920fc72f0745475Ecf37a0cF3BF3'
// main:  0x3421b655B1Be5Cd7F2466c4A9139a416b2148fe0

export type StateType = {
  storeVersion: number
  setStoreVersion: (storeVersion: number) => void
  isSignedUp: boolean
  setIsSignedUp: (isSignedUp: boolean) => void
  isPolledDataQueued: boolean
  setIsPolledDataQueued: (isPolledDataQueued: boolean) => void
  contract: any
  setContract: (contract: any) => void
  postsLoaded: LoadingProgressType
  setPostsLoaded: (postsLoaded: LoadingProgressType) => void
  spacesLoaded: LoadingProgressType
  setSpacesLoaded: (spacesLoaded: LoadingProgressType) => void
  latestAccountIndexFetched: number
  setLatestAccountIndexFetched: (latestAccountIndexFetched: number) => void
  spaces: SpaceType[]
  setSpaces: (spaces: SpaceType[]) => void
  spacesQueued: SpaceType[]
  setSpacesQueued: (spacesQueued: SpaceType[]) => void
  latestSpaceIndexFetched: number
  setLatestSpaceIndexFetched: (latestSpaceIndexFetched: number) => void
  spacesSortType: string
  setSpacesSortType: (spacesSortType: string) => void
  posts: PostType[]
  setPosts: (posts: PostType[]) => void
  postsQueued: PostType[]
  setPostsQueued: (postsQueued: PostType[]) => void
  latestPostIndexFetched: number
  setLatestPostIndexFeched: (latestPostIndexFetched: number) => void
  isDarkmode: boolean
  setIsDarkmode: (isDarkmode: boolean) => void
  userName: string
  setUserName: (userName: string) => void
  privateKey: string
  setPrivateKey: (privateKey: string) => void
  userId: number
  setUserId: (userId: number) => void
  defaultNodeInfo: boolean
  setDefaultNodeInfo: (defaultNodeInfo: boolean) => void
  nodeInfo: NodeInfoType
  setNodeInfo: (nodeInfo: NodeInfoType) => void
  cacheFlush: () => void
}

const useStore = create(
  persist<StateType, SetState<StateType>, GetState<StateType>, StoreApiWithPersist<StateType>>(
    (set) => ({
      storeVersion: STORE_VERSION,
      setStoreVersion: (storeVersion) => set({ storeVersion }),

      isSignedUp: false,
      setIsSignedUp: (isSignedUp) => set({ isSignedUp }),

      isPolledDataQueued: true, // note: looks like this setting is no longer changing
      setIsPolledDataQueued: (isPolledDataQueued) => set({ isPolledDataQueued }),

      // smart contracts
      contract: {}, // { accounts, posts, spaces, web3 },
      setContract: (contract) => set({ contract }),

      postsLoaded: { nFinished: 0, max: 0 } as LoadingProgressType,
      setPostsLoaded: (postsLoaded) => set({ postsLoaded }),

      spacesLoaded: { nFinished: 0, max: 0 } as LoadingProgressType,
      setSpacesLoaded: (spacesLoaded) => set({ spacesLoaded }),

      // ACCOUNTS
      latestAccountIndexFetched: 0,
      setLatestAccountIndexFetched: (latestAccountIndexFetched) => set({ latestAccountIndexFetched }),

      // SPACES
      spaces: [] as SpaceType[],
      setSpaces: (spaces) => set({ spaces }),

      spacesQueued: [] as SpaceType[],
      setSpacesQueued: (spacesQueued) => set({ spacesQueued }),

      latestSpaceIndexFetched: 0,
      setLatestSpaceIndexFetched: (latestSpaceIndexFetched) => set({ latestSpaceIndexFetched }),

      spacesSortType: 'numberOfPostsInSpace|desc',
      setSpacesSortType: (spacesSortType) => set({ spacesSortType }),
      // POSTS
      posts: [] as PostType[],
      setPosts: (posts) => set({ posts }),

      postsQueued: [] as PostType[],
      setPostsQueued: (postsQueued) => set({ postsQueued }),

      latestPostIndexFetched: 0,
      setLatestPostIndexFeched: (latestPostIndexFetched) => set({ latestPostIndexFetched }),

      // VARIOUS
      isDarkmode: false,
      setIsDarkmode: (isDarkmode) => set({ isDarkmode }),

      userName: '',
      setUserName: (userName) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey) => set({ privateKey }),

      userId: 0,
      setUserId: (userId) => set({ userId }),

      defaultNodeInfo: true,
      setDefaultNodeInfo: (defaultNodeInfo) => set({ defaultNodeInfo }),

      nodeInfo: {
        evmNode: DEFAULT_EVMNODE,
        contractsAddress: DEFAULT_CONTRACTSADDRESS,
      } as NodeInfoType,
      setNodeInfo: (nodeInfo) => set({ nodeInfo }),

      cacheFlush: () => {
        // console.log(`cacheFlush to storeVersion ${STORE_VERSION}`)
        set({
          storeVersion: STORE_VERSION,
          posts: [],
          postsQueued: [],
          spaces: [],
          spacesQueued: [],
          latestPostIndexFetched: 0,
          latestSpaceIndexFetched: 0,
          latestAccountIndexFetched: 0,
        })
      },
    }),
    {
      // Configure persist middleware
      name: 'decensored',

      partialize: (state) => ({
        storeVersion: state.storeVersion,
        isDarkmode: state.isDarkmode,

        posts: state.posts,
        postsQueued: state.postsQueued,
        latestPostIndexFetched: state.latestPostIndexFetched,

        spaces: state.spaces,
        spacesQueued: state.spacesQueued,
        latestSpaceIndexFetched: state.latestSpaceIndexFetched,
        spacesSortType: state.spacesSortType,

        latestAccountIndexFetched: state.latestAccountIndexFetched,

        userName: state.userName,
        userId: state.userId,
        privateKey: state.privateKey,
        defaultNodeInfo: state.defaultNodeInfo,
        nodeInfo: state.nodeInfo,
      }),
    }
  )
)

export default useStore
