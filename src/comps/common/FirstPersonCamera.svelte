<script lang="ts">
    import {T, useTask, useThrelte} from '@threlte/core'
  import { spring } from 'svelte/motion';
  import { Vector3, type Mesh } from 'three';

  let positionHasBeenSet = false
    export let playerMesh: Mesh
    const smoothPlayerPosX = spring(0)
    const smoothPlayerPosZ = spring(0)
    const t3 = new Vector3()
    useTask(() => {
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
    const { size } = useThrelte()
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