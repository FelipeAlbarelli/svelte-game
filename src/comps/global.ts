import { writable } from "svelte/store";
import { Vector3, Vector2 } from "three";


type GlobalState = {
    pointer2D : Vector2,
    point3D : Vector3,
    scene : '1rdPerson' | '3rdPerson' 
}


export const globalStore = writable<GlobalState>({
    point3D: new Vector3(),
    pointer2D :  new Vector2(),
    scene: '1rdPerson'
})