import {create} from "zustand"

type UserState = {
    userId : string
    setUserId : (newUserId : string) => void
}

const useUserStore = create<UserState>((set) => ({
  userId: "",
  setUserId(newUserId: string){
    set((state) => ({...state, userId: newUserId}))
  },
}));

export default useUserStore;