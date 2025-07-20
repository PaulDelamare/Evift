<script lang="ts">
	import type { GetUser } from '$lib/models/user.model';
	import User from './User.svelte';

	export let dataArray: GetUser[] = [];
	export let button = true;
	export let sizeImg = 'size-32';
	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';

	export let friends = false;
	export let nothingMessage = "Vous ne possédez pour l'instant aucun ami.";
</script>

<!-- @component
This component is use for invitation listing.render
The component get invitation from the server
@returnServerSide {Invitation[]} dataArray - The list of invitation
@params {ActionData} form - The form
 -->
<ul class="column gap-12 {friends ? 'gap-4' : ''}">
	{#each dataArray as data}
		<User canDelete {friends} {data} {button} {shadow} {sizeImg} />
	{:else}
		<h4>{nothingMessage}</h4>
	{/each}
</ul>
