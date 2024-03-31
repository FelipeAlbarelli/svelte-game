import { writable } from "svelte/store";
import type { HslColor } from "../models";


export type CommandState = {
    hsl : HslColor
}

const initialState: CommandState = {
    hsl: {
        h: 30,
        s: 60,
        l: 70
    }
}

export const commandStore = writable<CommandState>(initialState)

export const setHsl = (hsl : HslColor) => {
    commandStore.update( prev => ({
        ...prev,
        hsl 
    }))
}