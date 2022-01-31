import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { NodeInfoType, PostType, SpaceType } from 'lib/types'

export const STORE_VERSION = 5

const useStore = create(
  persist(
    (set) => ({
      storeVersion: STORE_VERSION,
      setStoreVersion: (storeVersion: number) => set({ storeVersion }),

      isSignedUp: false,
      setIsSignedUp: (isSignedUp: boolean) => set({ isSignedUp }),

      isPolledDataQueued: true,
      setIsPolledDataQueued: (isPolledDataQueued: boolean) =>
        set({ isPolledDataQueued }),

      // smart contracts
      contract: {}, // { accounts, posts, spaces, web3 },
      setContract: (contract: any) => set({ contract }),

      //
      spaces: [] as SpaceType[],
      setSpaces: (spaces: SpaceType[]) => set({ spaces }),

      spacesQueued: [] as SpaceType[],
      setSpacesQueued: (spacesQueued: SpaceType[]) => set({ spacesQueued }),

      latestSpaceIndexFetched: 0,
      setLatestSpaceIndexFetched: (latestSpaceIndexFetched: number) =>
        set({ latestSpaceIndexFetched }),

      //
      posts: [] as PostType[],
      setPosts: (posts: PostType[]) => set({ posts }),

      postsQueued: [] as PostType[],
      setPostsQueued: (postsQueued: PostType[]) => set({ postsQueued }),

      latestPostIndexFetched: 0,
      setLatestPostIndexFeched: (latestPostIndexFetched: number) =>
        set({ latestPostIndexFetched }),

      //
      isDarkmode: false,
      setIsDarkmode: (isDarkmode: boolean) => set({ isDarkmode }),

      userName: '',
      setUserName: (userName: string) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey: string) => set({ privateKey }),

      userId: 0,
      setUserId: (userId: number) => set({ userId }),

      nodeInfo: {
        evmNode: 'https://hh.addiota.com',
        contractsAddress: '0x3eb8De6C1D7d920fc72f0745475Ecf37a0cF3BF3',
      } as NodeInfoType,
      setNodeInfo: (nodeInfo: NodeInfoType) => {
        set({ nodeInfo })
      },
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
        })
      },
    }),
    {
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
        userName: state.userName,
        userId: state.userId,
        privateKey: state.privateKey,
        nodeInfo: state.nodeInfo,
      }),
    }
  )
)

export default useStore
