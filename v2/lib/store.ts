import create from 'zustand'
import { persist } from 'zustand/middleware'

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
      contract: {}, // { accounts, posts, spaces },
      setContract: (contract: any) => set({ contract }),

      //
      // persistent state by the partialize function below
      //
      userName: '',
      setUserName: (userName: string) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey: string) => set({ privateKey }),

      // EVM node config
      evmNode: 'https://we.addiota.com',
      setEVMnode: (evmNode: string) => set({ evmNode }),

      chainId: 1075,
      setChainId: (chainId: number) => set({ chainId }),

      contractPostsAddress: '0x1E41f418e97af96ee37c905e3e01D1e966E3A6C3',
      setContractPostsAddress: (contractPostsAddress: string) =>
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
