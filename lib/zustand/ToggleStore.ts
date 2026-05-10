import { create } from "zustand";

interface ToggleState {
    open: boolean
    toggle: () => void
    setToggle: (val: boolean) => void
}

export const useToggleStore = create<ToggleState>((set, get) => ({
    open: false,

    toggle: () => set({open: !get().open}),

    setToggle(val) {
        set({
            open: val
        })
    },
}));

export const useToggleMenuStore = create<ToggleState>((set, get) => ({
    open: false,

    toggle: () => set({open: !get().open}),

    setToggle(val) {
        set({
            open: val
        })
    },
}));