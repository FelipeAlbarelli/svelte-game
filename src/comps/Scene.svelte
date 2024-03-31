<script lang="ts">
  import { T, useThrelte ,useTask ,  } from '@threlte/core'
  import type { PerspectiveCamera } from 'three';
  import Example1 from './scenes/Example1.svelte';
	import { interactivity } from '@threlte/extras';
	import { changeMsg } from './ui-dashboard/commandStore';
	import type { ThreeJSEvent } from './models';
	import { globalStore } from './global';
  export let size = {width: 600 , height : 400}
  const { renderer } = useThrelte()
  export let aspectRatio = .5

  let camera : PerspectiveCamera | undefined;
  interactivity()
	const pointerMove = (e : ThreeJSEvent) => {
		const { pointer , point } = e;

    globalStore.update(prev => ({
      ...prev,
      point3D : point,
      pointer2D : pointer
    }))
	}

</script>

<T.Mesh on:pointermove={pointerMove} > 
  
  <Example1  />
</T.Mesh>

<!-- <T.PerspectiveCamera
  position={[10, 10, 10]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0);
    camera = ref
  }}
/>
<T.Mesh>
  <T.BoxGeometry args={[1, 1, 1]} />
  <T.MeshBasicMaterial color="red" />
</T.Mesh> -->