import { create } from 'zustand';
import { THooksProps } from "@/app";

const useRegisterModal = create<THooksProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useRegisterModal;
