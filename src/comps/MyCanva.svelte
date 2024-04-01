<script lang="ts">
	import { Canvas, useTask } from '@threlte/core'
	import Scene from './Scene.svelte'
	import { World } from '@threlte/rapier'
	import NavBar from './NavBar.svelte';
	import CommandUi from './ui-dashboard/CommandUI.svelte';
	let size = {width: 600 , height : 400}
	export let aspectRatio = .5


	let scenes : '3rdPerson' | 'firstPerson' = '3rdPerson'


</script>
<!-- size={{ width, height }} -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
	class="canva-cont"
	>
	<Canvas
	>
		<World>
		
			<Scene
				bind:size
				bind:aspectRatio
			/>
		</World>
	</Canvas>
</div>

<div class="overlay">
	<NavBar />
	<CommandUi/>
</div>


<style lang="scss">
	.canva-cont {
		background-color: white;
		// aspect-ratio: 2 / 1;
		width: 100%;
		max-width: 100vw;
		height: calc( 100vw * 0.5 );
	}

.overlay {
	position: absolute;
	filter: invert(1);
		display: flex;
		top: 20px;
		width: 100%;
		justify-content: center;
}


</style>