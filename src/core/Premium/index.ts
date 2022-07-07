import create from 'zustand';

interface PremiumStore {
  hasPremium: boolean;
  setPremium: (value: boolean) => void;
}

export const usePremiumStore = create<PremiumStore>(set => ({
  hasPremium: false,
  setPremium: (value: boolean) => {
    set({hasPremium: value});
  },
}));
