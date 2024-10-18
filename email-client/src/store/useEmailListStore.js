import { create } from "zustand";
// import { immer } from "zustand/middleware/immer";

export const useEmailListStore = create((set) => ({
  emailList: [],
  loading: false,
  page: 1,
  currentFilter: "all",

  setLoading: (isLoading) => set({ loading: isLoading }),

  updateEmailList: (emails) =>
    set((state) => ({
      emailList: [
        ...state.emailList,
        ...emails.map((email) => ({
          ...email,
          isRead: false,
          isFavorite: false,
        })),
      ],
    })),

  incrementPage: () => set((state) => ({ page: state.page + 1 })),

  toggleReadStatus: (emailId) =>
    set((state) => ({
      emailList: state.emailList.map((email) =>
        email.id === emailId ? { ...email, isRead: true } : email
      ),
    })),

  toggleFavoriteStatus: (emailId) =>
    set((state) => ({
      emailList: state.emailList.map((email) =>
        email.id === emailId ? { ...email, isFavorite: true } : email
      ),
    })),

  setCurrentFilter: (filter) => set({ currentFilter: filter }),
}));
