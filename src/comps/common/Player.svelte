<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { AutoColliders,   BasicPlayerController, RigidBody, type CollisionGroupsBitMask } from '@threlte/rapier'
  import { BoxGeometry, CapsuleGeometry, Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'

  export let position: Parameters<Vector3['set']> | undefined = undefined

  export let playerMesh: Mesh

  export let collGround : CollisionGroupsBitMask = [15] ;
  export let collObjs : CollisionGroupsBitMask = [0] ;



  let ballMesh: Mesh

  let rigidBody: RapierRigidBody

  const playerPos = new Vector3()
  const ballPos = new Vector3()
  const maxF = 0.05
  const min = new Vector3(-maxF, 0, -maxF)
  const max = new Vector3(maxF, 0, maxF)

  useTask(() => {
    if (!playerMesh || !ballMesh || !rigidBody) return

    playerMesh.getWorldPosition(playerPos)
    ballMesh.getWorldPosition(ballPos)

    const diff = playerPos.sub(ballPos).divideScalar(2000)
    diff.y = 0

    const f = diff.clamp(min, max)

    rigidBody.applyImpulse(f, true)
  })

  let orientation = {
    position : [0,0,0]
  }
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
    receiveShadow
    castShadow
    geometry={new CapsuleGeometry(0.3, 1.8 - 0.3 * 2)}
    material={new MeshStandardMaterial()}
  >
    <T.Mesh
    position.x={.5}
    position.z={0}
    position.y={1}
    receiveShadow
    castShadow
    geometry={new BoxGeometry( 1 ,0.2, 1)}
    material={new MeshStandardMaterial()}
    />
  </T.Mesh>
</BasicPlayerController>

<T.Group position={[0, 1, -5]}>
  <RigidBody bind:rigidBody>
    <AutoColliders shape={'ball'}>
      <T.Mesh
        bind:ref={ballMesh}
        receiveShadow
        castShadow
        geometry={new SphereGeometry(0.25)}
        material={new MeshStandardMaterial()}
      >
        <slot />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
