<script lang="ts">
  import { T, useThrelte ,useTask ,  } from '@threlte/core'
  import type { PerspectiveCamera } from 'three';
  export let size = {width: 600 , height : 400}
  const { renderer } = useThrelte()
  export let aspectRatio = .5

  let camera : PerspectiveCamera | undefined;

  useTask( (delta) => {
    const { width , height } = window.screen

      // size = {width , height : height * aspectRatio }
      // renderer.setSize(size.width , size.height)
      // if (camera) {
      //   camera.aspect = aspectRatio
      // }

  })

    // camera.aspect = canvas.clientWidth / canvas.clientHeight;
    // camera.updateProjectionMatrix();


</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
    camera = ref
  }}
/>
<T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh>