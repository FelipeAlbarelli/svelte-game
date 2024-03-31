<script lang="ts">
	import { scenes, setScene, type MyScenes } from './global';


    const click = (x: MyScenes) => {
        setScene(x);
        console.log(x)
    }

</script>

<nav>
{#each scenes as txt }
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <p on:click={ () => click(txt) } >{txt}</p>
{/each}
</nav>




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