import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const context = (set, get) => ({
  user: null,
  access: (user) => set({ user }),
  reset: () => set({ user: null }),
});

const useUser = create(
  persist(context, {
    name: "user",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useUser;
