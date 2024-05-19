<script lang="ts">

    // Imports
	import LogoSvg from "../extra/logo/LogoSvg.svelte";

    // Import Variable
    export let gradient = false;
    export let white = false;
    export let color = '';
    export let widthSvg = 50;
    export let text = false;
    export let link = false;
    export let h1 = false;

</script>

<!-- Logo bloc -->
<div class="flex items-end gap-2">
    <!-- If Logo need to be a link -->
    {#if link}
    <!-- Define Logo in Link -->
        <a  href="/">
            <LogoSvg {widthSvg} fill = {gradient ? 'fill-[url(#paint0_linear_2)]' : (white ? 'fill-surface-500' : (color ? `fill-[${color}]` : ''))} />
        </a>
        <!-- If Site Name need to be h1 -->
        {#if h1}
        <!-- Define Site name in h1 -->
            <h1 class="{text ? '' : 'hidden'} {gradient ? 'gradient-text' : ''} {white ? 'text-surface-500' : ''} {color ? `text-[${color}]` : ''}">Evift</h1>
        {:else}
        <!-- Else Define Site name in span -->
            <span class="h1 {text ? '' : 'hidden'} {gradient ? 'gradient-text' : ''} {white ? 'text-surface-500' : ''} {color ? `text-[${color}]` : ''}">Evift</span>
        {/if}
    {:else}
    <!-- Else Define Logo in Div -->
        <div class="flex items-end gap-2">
            <!-- Define Logo -->
            <LogoSvg {widthSvg} fill = {gradient ? 'fill-[url(#paint0_linear_2)]' : (white ? 'fill-surface-500' : (color ? `fill-[${color}]` : ''))} />
            <!-- If Site Name need to be h1 -->
            {#if h1}
            <!-- Define Site name in h1 -->
                <h1 class="{text ? '' : 'hidden'} {gradient ? 'gradient-text' : ''} {white ? 'text-surface-500' : ''} {color ? `text-[${color}]` : ''}">Evift</h1>
            {:else}
            <!-- Else Define Site name in span -->
                <span class="h1 {text ? '' : 'hidden'} {gradient ? 'gradient-text' : ''} {white ? 'text-surface-500' : ''} {color ? `text-[${color}]` : ''}">Evift</span>
            {/if}
        </div>
    {/if}
</div>
