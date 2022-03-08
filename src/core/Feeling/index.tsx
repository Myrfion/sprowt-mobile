import create from 'zustand';

interface FeelingState {
  current: string | null;
  setCurrent: (newFeeling: string) => void;
}

export const useFeeling = create<FeelingState>((set, _) => ({
  current: null,
  setCurrent: newFeeling => {
    set({current: newFeeling});
  },
}));
