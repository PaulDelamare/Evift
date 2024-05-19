<script lang="ts">
    // Import SVG Component
	import Instagram from "../../svg/Network/Instagram.svelte";
	import Linkedin from "../../svg/Network/Linkedin.svelte";
	import Youtube from "../../svg/Network/Youtube.svelte";

    // Variable
    // Define Network name/icon/hover effect/link
    const networks = [
        {
            name: 'Instagram',
            icon: Instagram,
            hover: 'hover:text-[#D62D79]',
            link: '/'
        },
        {
            name: 'Linkedin',
            icon: Linkedin,
            hover: 'hover:text-[#007AB5]',
            link: '/'
        },
        {
            name: 'Youtube',
            icon: Youtube,
            hover: 'hover:text-[#F60002]',
            link: '/'
        }
    ]

</script>

<!-- Network Bloc -->
<div class="column gap-4">
    <!-- Network Title -->
    <h3 class="nav text-surface-500">Nos réseaux</h3>
    <!-- Network bar for separate -->
    <div class="bar bg-surface-500"></div>
    <!-- Display Network -->
    {#each networks as network}
    <!-- Link for Network -->
        <a href="{network.link}" class="nav between justify-start gap-6 w-full group !custom-transition {network.hover} text-surface-500 !duration-300">
            <!-- Display Network Icon -->
            <svelte:component this={network.icon} />
            <!-- Display Network Name -->
            {network.name}
        </a>
    {/each}
</div>
