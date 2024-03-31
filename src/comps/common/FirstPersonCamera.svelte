<script lang="ts">
	import {T, useTask, useThrelte} from '@threlte/core'
	import { spring } from 'svelte/motion';
	import { Vector3, type Mesh } from 'three';
	import { changeMsg, commandStore } from '../ui-dashboard/commandStore';
	import { interactivity } from '@threlte/extras';
	import type { ThreeJSEvent } from '../models';

    const { size ,  } = useThrelte()

	interactivity()
	let positionHasBeenSet = false
	export let playerMesh: Mesh
	const smoothPlayerPosX = spring(0)
	const smoothPlayerPosZ = spring(0)
	const t3 = new Vector3()
    useTask(() => {
		// changeMsg({width : $size.width , height : $size.height })
        if (!playerMesh) return
        playerMesh.getWorldPosition(t3)
        smoothPlayerPosX.set(t3.x, {
        hard: !positionHasBeenSet
        })
        smoothPlayerPosZ.set(t3.z, {
        hard: !positionHasBeenSet
        })
        if (!positionHasBeenSet) positionHasBeenSet = true
	})
    $: zoom = $size.width / 8



</script>

<T.Group
  position.x={$smoothPlayerPosX}
  position.z={$smoothPlayerPosZ}
>
  <T.Group
    position.y={0.9}
    let:ref={target}
  >
    <T.OrthographicCamera
      makeDefault
      {zoom}
      position={[50, 50, 30]}
      on:create={({ ref }) => {
        ref.lookAt(target.getWorldPosition(new Vector3()))
      }}
    />
  </T.Group>
</T.Group>