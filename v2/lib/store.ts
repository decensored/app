import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { NodeInfoType, PostType, SpaceType } from 'lib/types'

const useStore = create(
  persist(
    (set) => ({
      isSignedUp: false,
      setIsSignedUp: (isSignedUp: boolean) => set({ isSignedUp }),

      // smart contracts
      // https://github.com/ChainSafe/web3.js/issues/4265#issuecomment-924554759
      contract: {}, // { accounts, posts, spaces, web3 },
      setContract: (contract: any) => set({ contract }),

      spaces: [] as SpaceType[],
      setSpaces: (spaces: SpaceType[]) => set({ spaces }),

      latestSpaceIndexFetched: 0,
      setLatestSpaceIndexFetched: (latestSpaceIndexFetched: number) =>
        set({ latestSpaceIndexFetched }),

      posts: [] as PostType[],
      setPosts: (posts: PostType[]) => set({ posts }),

      latestPostIndexFetched: 0,
      setLatestPostIndexFeched: (latestPostIndexFetched: number) =>
        set({ latestPostIndexFetched }),

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
        contractPostsAddress: '0x2F7D8C25D00a8b4fad546dB5533D0Aa8e885f230',
      } as NodeInfoType,
      setNodeInfo: (nodeInfo: NodeInfoType) => {
        set({
          nodeInfo,
          // delete whatever we had cached...
          posts: [],
          spaces: [],
          latestPostIndexFetched: 0,
          latestSpaceIndexFetched: 0,
        })
      },

      // Dialogs
      isOpenPostDialog: false,
      setIsOpenPostDialog: (isOpenPostDialog: boolean) =>
        set({ isOpenPostDialog }),

      isOpenSettingsDialog: false,
      setIsOpenSettingsDialog: (isOpenSettingsDialog: boolean) =>
        set({ isOpenSettingsDialog }),

      isOpenSignupDialog: false,
      setIsOpenSignupDialog: (isOpenSignupDialog: boolean) =>
        set({ isOpenSignupDialog }),

      isOpenRecoverDialog: false,
      setIsOpenRecoverDialog: (isOpenRecoverDialog: boolean) =>
        set({ isOpenRecoverDialog }),

      isOpenCreateSpaceDialog: false,
      setIsOpenCreateSpaceDialog: (isOpenCreateSpaceDialog: boolean) =>
        set({ isOpenCreateSpaceDialog }),

      isOpenSpaceSettingsDialog: false,
      setIsOpenSpaceSettingsDialog: (isOpenSpaceSettingsDialog: boolean) =>
        set({ isOpenSpaceSettingsDialog }),
    }),
    {
      name: 'decensored',

      partialize: (state) => ({
        isDarkmode: state.isDarkmode,
        posts: state.posts,
        latestPostIndexFetched: state.latestPostIndexFetched,
        spaces: state.spaces,
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
