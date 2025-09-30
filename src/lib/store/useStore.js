import { storeFactory} from './storeFactory';

export const useStore = storeFactory((set) => ({
  // State
  headerData: undefined,
  footerData: undefined,
  navIsOpen: false,
  lenis: undefined,
  overflow: true,
  triggerTransition: "",
  headerHeight: 0,

  // Setters
  setHeaderData: (value) => set({ headerData: value }),
  setFooterData: (value) => set({ footerData: value }),
  setNavIsOpen: (value) => set({ navIsOpen: value }),
  setLenis: (value) => set({ lenis: value }),
  setOverflow: (value) => set({ overflow: value }),
  setTriggerTransition: (value) => set({ triggerTransition: value }),
  setHeaderHeight: (value) => set({ headerHeight: value }),
}));