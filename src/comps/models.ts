import type {  } from "@threlte/core"
import type { Camera, Intersection, Object3D, Ray, Vector2 } from "three/src/Three.js"


export type HslColor = {
    h : number,
    s : number,
    l : number,
}

export type ThreeJSEvent = Intersection & {
  intersections: Intersection[] // The first intersection of each intersected object
  object: Object3D // The object that was actually hit
  eventObject: Object3D // The object that registered the event
  camera: Camera // The camera used for raycasting
  delta: Vector2 //  Distance between mouse down and mouse up event in pixels
  nativeEvent: MouseEvent | PointerEvent | WheelEvent // The native browser event
  pointer: Vector2 // The pointer position in normalized device coordinates
  ray: Ray // The ray used for raycasting
  stopPropagation: () => void // Function to stop propagation of the event
  stopped: Boolean // Whether the event propagation has been stopped
}
