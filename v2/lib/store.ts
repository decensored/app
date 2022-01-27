import create from 'zustand'
import { persist } from 'zustand/middleware'
import type { PostType, SpaceType } from 'lib/types'

const useStore = create(
  persist(
    (set) => ({
      //
      // non-persistent state
      //
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

      //
      // persistent state by the partialize function below
      //
      userName: '',
      setUserName: (userName: string) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey: string) => set({ privateKey }),

      userId: 1,
      setUserId: (userId: string) => set({ userId }),

      // EVM node config

      evmNode: 'https://evm.wasp.sc.iota.org', // https://we.addiota.com
      setEVMnode: (evmNode: string) => set({ evmNode }),

      // chainId: 1075,
      // setChainId: (chainId: number) => set({ chainId }),

      contractPostsAddress: '0x2F7D8C25D00a8b4fad546dB5533D0Aa8e885f230',
      setContractPostsAddress: (contractPostsAddress: string) =>
        set({ contractPostsAddress }),

      nodeActive: false,
      setNodeStatus: (nodeActive: boolean) => set({ nodeActive }),

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
    }),
    {
      name: 'decensored',

      partialize: (state) => ({
        isDarkmode: state.isDarkmode,
        userName: state.userName,
        privateKey: state.privateKey,
        evmNode: state.evmNode,
        // chainId: state.chainId,
        contractPostsAddress: state.contractPostsAddress,
      }),
    }
  )
)

export default useStore
