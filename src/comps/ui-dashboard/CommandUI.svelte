<script lang="ts">
  import type { HslColor } from '../models';
  import { commandStore, setHsl } from './commandStore';


    let hue = 30, sat = 100 , ligh = 50;
    $: {
        const hsl : HslColor = {
            h: hue,
            s: sat,
            l: ligh
        }
        setHsl(hsl)
        console.log(hsl)
    }

</script>

<div class="cont">
    <div class="row">
        <p > HSL </p> 
        <input placeholder="h" type="range" min="0" max="360"  bind:value={hue} />
        <input placeholder="s" type="range" min="0" max="100" bind:value={sat} />
        <input placeholder="l" type="range" min="0" max="100" bind:value={ligh}/>
    </div>
</div>


<style lang="scss">

.cont {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

</style>