<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import Ground from '../common/Ground.svelte';
  import { commandStore } from '../ui-dashboard/commandStore';
  import type { HslColor } from '../models';

  interactivity()
  const scale = spring(1)
  let rotation = 0
  useTask((delta) => {
    rotation += delta
  })

  let groundColor : HslColor | undefined;
  commandStore.subscribe( s => {
    groundColor = s.hsl
    console.log(groundColor)
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 1, 0)
  }}
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

<Ground 
  hslColor={ groundColor }
/>

<!-- <T.Mesh
  rotation.x={-Math.PI / 2}
  receiveShadow
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh> -->
