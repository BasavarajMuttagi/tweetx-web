import { useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storageModule = {
  name: "TweetX-storage",
  storage: createJSONStorage(() => sessionStorage),
};

const creator = (set: any) => ({
  token: "",

  logout: () => {
    const queryClient = useQueryClient();
    queryClient.removeQueries();
    queryClient.getQueryCache().clear();

    set(() => ({
      token: "",
    }));
  },
  setToken: (newToken: string) => set(() => ({ token: newToken })),
});

const useTweetXStore = create(persist(creator, storageModule));
export default useTweetXStore;
