import { create } from 'zustand';

export const useLeadsStore = create((set) => ({
  leads: [],
  setLeads: (leads) => set({ leads }),
}));
