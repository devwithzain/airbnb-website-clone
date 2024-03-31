import { create } from 'zustand';
import { THooksProps } from "@/export";

const useRentModal = create<THooksProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRentModal;
