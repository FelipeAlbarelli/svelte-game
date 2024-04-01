<script lang="ts">
  import type { HslColor } from '../models';
  import { commandStore , changeMsg, setHsl, allMsgs, type CommandState } from './commandStore';

    let showForm = false;
    let hue = 30, sat = 100 , ligh = 50;
    $: {
        const hsl : HslColor = {
            h: hue,
            s: sat,
            l: ligh
        }
        setHsl(hsl)
    }


        let offSetX = 0;
        let offSetZ = 0;
        let fov = 20;
        let invertZoom = true;
        let zoom = 2
        let positionX = 4
        let positionY = 2
        let positionZ = 0


    $: {
        const mouseProps = {fov  , offSetX  , offSetZ , 
            zoom : invertZoom ? (1 / zoom) : zoom , 
            positionY , positionZ , positionX}
        commandStore.update( prev => ({
            ...prev,
            cameraProps: {
                ...prev.cameraProps,
                ...mouseProps
            }
        }))
    }


</script>


<div class="infos">
    {#each $allMsgs as info}
    <div class="info">
        <span>{info[0]}</span>
        <p>{info[1]}</p>
    </div>
    {/each}
</div>

<button on:click={() => showForm = !showForm} >toggle</button>

{#if showForm}
<div class="cont">
    <div class="row">
        <p > Cam </p> 
        <input placeholder="x" type="range" min={-10} max="10" step="0.05"  bind:value={offSetX} />
        <input placeholder="z" type="range" min={-2} max="2" step="0.05"  bind:value={offSetZ} />

        <input placeholder="x" type="range"min={-10} max="10" step="0.05"  bind:value={positionX} />
        <input placeholder="y" type="range"min={-10} max="10" step="0.05"  bind:value={positionY} />
        <input placeholder="z" type="range"min={-10} max="10" step="0.05"  bind:value={positionZ} />

        <input placeholder="fov" type="range" min="0" max="100"  bind:value={fov} />
        <input type="checkbox" bind:value={invertZoom}  />
        <input placeholder="zoom" type="range" min="1" max="10" step="0.05"  bind:value={zoom} />
    </div>
    <!-- <div class="row">
        <p > HSL </p> 
        <input placeholder="h" type="range" min="0" max="360"  bind:value={hue} />
        <input placeholder="s" type="range" min="0" max="100" bind:value={sat} />
        <input placeholder="l" type="range" min="0" max="100" bind:value={ligh}/>
    </div> -->
</div>
{/if}


<style lang="scss">
.infos {
    display: flex;
    .info {
        display: flex;
        gap: 4px;
        width: 200px;
        span {
        }
    }
}
.cont {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

</style>