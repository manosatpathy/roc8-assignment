import { create } from "zustand";

export const useEmailBodyStore = create((set) => ({
  emailBody: null,
  loading: false,
  updateEmailBody: (body) => set({ emailBody: body }),
  setLoading: (isLoading) => set({ loading: isLoading }),
}));
