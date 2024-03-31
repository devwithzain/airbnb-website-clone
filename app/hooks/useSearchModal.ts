import { create } from 'zustand';
import { THooksProps } from "@/export";

const useSearchModal = create<THooksProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSearchModal;
