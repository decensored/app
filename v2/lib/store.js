import create from 'zustand'

const useStore = create((set) => ({
  isSignedUp: false,
  toggleIsSignedUp: () => set((state) => ({ isSignedUp: !state.isSignedUp })),
}))

export default useStore
