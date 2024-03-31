<script lang="ts">
	import {T, useTask, useThrelte} from '@threlte/core'
	import { spring } from 'svelte/motion';
	import { Vector3, type Mesh, OrthographicCamera, Group, Object3D, type Object3DEventMap, BoxGeometry, MeshStandardMaterial, PerspectiveCamera } from 'three';
	import { changeMsg, commandStore } from '../ui-dashboard/commandStore';
	import { OrbitControls, interactivity } from '@threlte/extras';
	import type { ThreeJSEvent } from '../models';

    const { size ,  } = useThrelte()
	export let offSetX = -1;
	export let offSetZ = 0;


	interactivity()
	let positionHasBeenSet = false
	let cameraRef : OrthographicCamera | PerspectiveCamera; 
	export let playerMesh: Mesh
	const smoothPlayerPosX = spring(0)
	const smoothPlayerPosZ = spring(0)
	const t3 = new Vector3()
    useTask(() => {
		// changeMsg({width : $size.width , height : $size.height })
        if (!playerMesh) return
        playerMesh.getWorldPosition(t3)
        smoothPlayerPosX.set(t3.x + offSetX, {
        hard: !positionHasBeenSet
        })
        smoothPlayerPosZ.set(t3.z + offSetZ, {
        hard: !positionHasBeenSet
        })
        if (!positionHasBeenSet) positionHasBeenSet = true
		if (!cameraRef) return

	})
    // $: zoom = $size.width / 32
    $: zoom = 0.1




</script>


    <T.Mesh
	position.x={$smoothPlayerPosX}
	position.y={0.5}
 	 position.z={$smoothPlayerPosZ}
    receiveShadow
    castShadow
    geometry={new BoxGeometry( 0.5 , 10, .5)}
    material={new MeshStandardMaterial()}
    />

<T.Group
  position.x={$smoothPlayerPosX}
  position.z={$smoothPlayerPosZ}
>
  <T.Group
    position.y={0}
    let:ref={target}
  >
    <T.PerspectiveCamera
      makeDefault
	  fov={10}

      {zoom}
      position={[4, 2, 0]}
      on:create={({ ref }) => {
		cameraRef = ref;
		ref.lookAt(target.getWorldPosition(new Vector3()))
      }}
    >
	</T.PerspectiveCamera>
  </T.Group>
</T.Group>