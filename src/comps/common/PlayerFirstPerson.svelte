<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { AutoColliders,   BasicPlayerController, RigidBody, type CollisionGroupsBitMask } from '@threlte/rapier'
  import { BoxGeometry, CapsuleGeometry, Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'

  export let position: Parameters<Vector3['set']> | undefined = undefined

  export let playerMesh: Mesh

  export let collGround : CollisionGroupsBitMask = [15] ;
  export let collObjs : CollisionGroupsBitMask = [0] ;


</script>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<BasicPlayerController
  {position}
  speed={3}
  radius={0.3}
  height={1.8}
  jumpStrength={2}
  groundCollisionGroups={collGround}
  playerCollisionGroups={collObjs}
>

  <T.Mesh
    bind:ref={playerMesh}
    position.y={0.9}
    geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
    material={new MeshStandardMaterial({opacity : 0.1})}
  >

  </T.Mesh>
</BasicPlayerController>
