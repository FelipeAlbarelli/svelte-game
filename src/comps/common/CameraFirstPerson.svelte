<script lang="ts">
	import {T, useTask, useThrelte} from '@threlte/core'
	import { spring } from 'svelte/motion';
	import { Vector3, type Mesh, OrthographicCamera,  PerspectiveCamera } from 'three';
	import { cameraControls } from './camera.control';
	import CameraControlWrapper from './CameraControlWrapper.svelte';
	import { interactivity } from '@threlte/extras';

    const { size ,  } = useThrelte()
	export let offSetX = 0;
	export let offSetZ = 0;
	export let fov = 20;
	export let positionX = 0
	export let positionY = 0
	export let positionZ = 0

  export let lookWhere : [number , number , number] = [-2 , 1 , 0]

  export let controlerMesh : Mesh


	interactivity()
	let positionHasBeenSet = false
	let cameraRef : OrthographicCamera | PerspectiveCamera; 

	const smoothCamPosX = spring(0)
	const smoothCamPosZ = spring(0)
	const t3 = new Vector3()
  


    useTask(() => {
        // if (!controlerMesh) return
        // controlerMesh.getWorldPosition(t3)
        // smoothCamPosX.set(t3.x + offSetX, {
        // hard: !positionHasBeenSet
        // })
        // smoothCamPosZ.set(t3.z + offSetZ, {
        // hard: !positionHasBeenSet
        // })
        // if (!positionHasBeenSet) positionHasBeenSet = true
		if (!cameraRef) return

	})
    // $: zoom = $size.width / 32
  export let zoom = 0.1

  let tPos = new Vector3()


</script>

<T.PerspectiveCamera
  makeDefault
  position.x={positionX}
  position.z={positionZ}
  on:create={({ ref }) => {
    ref.lookAt(new Vector3(0,0,-1))
  }}
>
  <CameraControlWrapper
    on:create={({ ref }) => {
      $cameraControls = ref;
    }}
  />
</T.PerspectiveCamera>