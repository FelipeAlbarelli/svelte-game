import { derived, writable } from "svelte/store";
import type { HslColor } from "../models";


export type CommandState = {
    hsl : HslColor,
    msgs : Record<string , string | number | null>
}

const initialState: CommandState = {
    hsl: {
        h: 30,
        s: 60,
        l: 70
    },
    msgs : { }
}

export const commandStore = writable<CommandState>(initialState)

export const allMsgs = derived(commandStore , ({msgs}) => {
    const keys =  Object.keys(msgs).toSorted( ([a,b]) => a.localeCompare(b) )
    return keys.map( k => [k , msgs[k]] as [string , string | number | null] )
        .filter( ([a,b]) => b !== null )
})

export const setHsl = (hsl : HslColor) => {
    commandStore.update( prev => ({
        ...prev,
        hsl 
    }))
}

export const changeMsg = (x : CommandState['msgs']) => {
    commandStore.update(prev => ({
        ...prev,
        msgs : {
            ...prev.msgs,
            ...x
        }
    }))
} 