<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import Ground from '../common/Ground.svelte';
  import { commandStore } from '../ui-dashboard/commandStore';
  import type { HslColor } from '../models';
  import { AutoColliders, CollisionGroups } from '@threlte/rapier';
  import Player from '../common/Player.svelte';
  import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';
  import FirstPersonCamera from '../common/Camera3rdPerson.svelte';

  let playerMesh: Mesh
  let positionHasBeenSet = false
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

  const scale = spring(1)
  let rotation = 0
  useTask((delta) => {
    rotation += delta
  })

  let groundColor : HslColor | undefined;
  commandStore.subscribe( state => {
    const {h,l,s} = state.hsl
    if (h == groundColor?.h && l == groundColor.l && s == groundColor.s) {
      return
    }   
    groundColor = {h,l,s}
    console.log(groundColor)
  })
</script>

<FirstPersonCamera 
  playerMesh={playerMesh} 
  zoom={$commandStore.cameraProps.zoom}
  fov={$commandStore.cameraProps.fov}
  offSetX={$commandStore.cameraProps.offSetX}
  offSetZ={$commandStore.cameraProps.offSetZ}
  positionX={$commandStore.cameraProps.positionX}
  positionY={$commandStore.cameraProps.positionY}
  positionZ={$commandStore.cameraProps.positionZ}
  />

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>

<T.Mesh
  rotation.y={rotation}
  position.y={1}
  scale={$scale}
  on:pointerenter={() => scale.set(1.5)}
  on:pointerleave={() => scale.set(1)}
  castShadow
>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

<CollisionGroups groups={[0,15]} >
  <Ground 
    hslColor={ groundColor }
  />
</CollisionGroups>

<CollisionGroups groups={[0]}>
  <Player
    bind:playerMesh
    collGround={[15]}
    position={[0, 2, -3]}
  />
  <!-- WALLS -->
  <AutoColliders shape={'cuboid'}>
    <T.Mesh
      receiveShadow
      castShadow
      position.x={30 + 0.7 + 0.15}
      position.y={1.275}
      geometry={new BoxGeometry(60, 2.55, 0.15)}
      material={new MeshStandardMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0x333333
      })}
    />
    <T.Mesh
      receiveShadow
      castShadow
      position.x={-30 - 0.7 - 0.15}
      position.y={1.275}
      geometry={new BoxGeometry(60, 2.55, 0.15)}
      material={new MeshStandardMaterial({
        transparent: true,
        opacity: 0.5,
        color: 0x333333
      })}
    />
  </AutoColliders>
</CollisionGroups>

<!-- <T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh> -->
