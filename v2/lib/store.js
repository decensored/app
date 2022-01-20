import create from 'zustand'

const useStore = create((set) => ({
  isSignedUp: false,
  setSignUpState: () => set((state) => ({ isSignedUp: !!state.isSignedUp })),
}))

export default useStore
