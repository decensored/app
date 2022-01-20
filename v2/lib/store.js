import create from 'zustand';

const useStore = create((set) => ({
  isSignedUp: false,
  setSignUpState: () =>
    set((state) => ({ isSignedUp: state.isSignedUp ? false : true })),
}));

export default useStore;
