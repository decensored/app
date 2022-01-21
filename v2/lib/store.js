import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // non-persistent state
      isSignedUp: false,
      toggleIsSignedUp: () => set({ isSignedUp: !get().isSignedUp }),

      // persistent state by the partialize function below
      userName: '',
      setUserName: (userName) => set({ userName }),

      privateKey: '',
      setPrivateKey: (privateKey) => set({ privateKey }),
    }),
    {
      name: 'decensored',
      partialize: (state) => ({
        userName: state.userName,
        privateKey: state.privateKey,
      }),
    }
  )
)

export default useStore
