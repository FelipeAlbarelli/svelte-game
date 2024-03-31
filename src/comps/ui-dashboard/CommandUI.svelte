<script lang="ts">
  import type { HslColor } from '../models';
  import { commandStore , changeMsg, setHsl, allMsgs } from './commandStore';

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

    const handleMouseMov = (e : MouseEvent) => {
        const {x , y} = e;
        const { height, width } = window.screen

        // infoText = [ 
        //     `x: ${x}` , 
        //     `y: ${y}` , 
        //     `h: ${height}` , 
        //     `w: ${width}` , 
        // ]
    }

</script>
<svelte:body on:mousemove={handleMouseMov} ></svelte:body>

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
        <p > HSL </p> 
        <input placeholder="h" type="range" min="0" max="360"  bind:value={hue} />
        <input placeholder="s" type="range" min="0" max="100" bind:value={sat} />
        <input placeholder="l" type="range" min="0" max="100" bind:value={ligh}/>
    </div>
</div>
{/if}


<style lang="scss">
.infos {
    display: flex;
    .info {
        display: flex;
        gap: 4px;
        width: 100px;
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