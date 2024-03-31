<script lang="ts">
	import {T, useTask, useThrelte} from '@threlte/core'
	import { spring } from 'svelte/motion';
	import { Vector3, type Mesh, OrthographicCamera, Group, Object3D, type Object3DEventMap, BoxGeometry, MeshStandardMaterial, PerspectiveCamera } from 'three';
	import { changeMsg, commandStore } from '../ui-dashboard/commandStore';
	import { OrbitControls, interactivity } from '@threlte/extras';
	import type { ThreeJSEvent } from '../models';

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
		// changeMsg({width : $size.width , height : $size.height })
        if (!controlerMesh) return
        controlerMesh.getWorldPosition(t3)
        smoothCamPosX.set(t3.x + offSetX, {
        hard: !positionHasBeenSet
        })
        smoothCamPosZ.set(t3.z + offSetZ, {
        hard: !positionHasBeenSet
        })
        if (!positionHasBeenSet) positionHasBeenSet = true
		if (!cameraRef) return

	})
    // $: zoom = $size.width / 32
  export let zoom = 0.1

  let tPos = new Vector3()


</script>



<T.Mesh
	position.x={$smoothCamPosX}
	position.y={0}
 	 position.z={$smoothCamPosZ}
    receiveShadow
    castShadow
    geometry={new BoxGeometry( 0.5 , 10, .5)}
    material={new MeshStandardMaterial()}
    />

<T.Group
  position.x={$smoothCamPosX}
  position.z={$smoothCamPosZ}
>
  <T.Group
    position.y={0}
    let:ref={target}
  >
    <T.PerspectiveCamera
      makeDefault
	    fov={fov}
      {zoom}
      position={[0 , 1, 0]}
      on:create={({ ref }) => {
		    cameraRef = ref;
        
        const x = ref.getWorldPosition(new Vector3())
        console.log(x.x , x.y , x.z)


        tPos = target.getWorldPosition(tPos);
        console.log(tPos.x, tPos.y ,tPos.z)
        const result = tPos.add(new Vector3( ...lookWhere ))
        console.log(result.x, result.y ,result.z)
		    ref.lookAt(result)
      }}
    >
	</T.PerspectiveCamera>
  </T.Group>
</T.Group>