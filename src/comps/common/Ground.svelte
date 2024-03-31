<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'
  import { Color } from 'three';

  export let yPosition = -0.5;

  export let height = 100
  export let width = 100

  export let hslColor = {h : 0 , s : 100 , l : 50};

  $:color = new Color(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`);

</script>

<T.Group position={[0, yPosition, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[height, 1, width]} />
      <T.MeshStandardMaterial color={color} />
    </T.Mesh>
  </AutoColliders>
</T.Group>
