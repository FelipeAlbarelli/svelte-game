<script lang="ts">
  import { T } from '@threlte/core'
	import { RAD2DEG } from 'three/src/math/MathUtils.js';

  export let color: string = 'blue'
  export let height = 1
  export let width = 2
  export let depth = 0
  export let posX = 0
  export let posZ = 4
</script>

<T.Mesh
    position.x={posX}
    position.z={posZ}
  renderOrder={depth}
>
  <T.PlaneGeometry args={[width, height]} />
    <T.MeshBasicMaterial
      {color}
      transparent
      opacity={0.6}
    />
</T.Mesh>
