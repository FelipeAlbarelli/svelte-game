import type CameraControls from 'camera-controls'
import { writable } from 'svelte/store'

export const cameraControls = writable<CameraControls | undefined>(undefined)
export const mesh = writable(undefined)
