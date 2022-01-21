import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      //
      // non-persistent state
      //
      isSignedUp: false,
      toggleIsSignedUp: () => set({ isSignedUp: !get().isSignedUp }),

      // smart contracts
      contract: {}, // { accounts: any, posts: any, spaces: any },
      setContract: (contract) => set({ contract }),

      //
      // persistent state by the partialize function below
      //
      userName: '',
      setUserName: (userName) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey) => set({ privateKey }),

      // EVM node config
      evmNode: 'https://we.addiota.com',
      setEVMnode: (evmNode) => set({ evmNode }),

      chainId: 1075,
      setChainId: (chainId) => set({ chainId }),

      contractPostsAddress: '0x1E41f418e97af96ee37c905e3e01D1e966E3A6C3',
      setContractPostsAddress: (contractPostsAddress) =>
        set({ contractPostsAddress }),
    }),
    {
      name: 'decensored',

      partialize: (state) => ({
        userName: state.userName,
        privateKey: state.privateKey,
        evmNode: state.evmNode,
        chainId: state.chainId,
        contractPostsAddress: state.contractPostsAddress,
      }),
    }
  )
)

export default useStore
