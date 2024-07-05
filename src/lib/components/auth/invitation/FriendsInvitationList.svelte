<script lang="ts">
	// ! Import
	import type { GetUser } from '$lib/models/user.model';
	import type { ActionData } from '../../../../routes/auth/invitation/$types';
	import User from './User.svelte';

	// Get Data
	export let dataArray: GetUser[] = [];
	export let form: ActionData = null;
	export let button = true;
	export let sizeImg = 'size-32';
	export let shadow =
		'shadow-[31px_31px_82px_0_rgba(190,190,190,1),-31px_-31px_82px_0_rgba(255,255,255,1)]';

	// If form is succes (accept or refuse invitation)
	$: if (form?.successFriend) {
		// Remove invitation from list
		dataArray = dataArray.filter((invitation) => invitation.id !== form.idRemove);
	}

	// If it's friends page
	export let friends = false;
	// When there is no data
	export let nothingMessage = "Vous ne possèder pour l'instant aucun ami";
</script>

<!-- @component
This component is use for invitation listing.render
The component get invitation from the server
@returnServerSide {Invitation[]} dataArray - The list of invitation
@params {ActionData} form - The form
 -->
<!-- Start of component -->
<ul class="column gap-12 {friends ? 'gap-4' : ''}">
	{#if dataArray.length > 0}
		<!-- For each invitation -->
		{#each dataArray as data}
			<User {friends} {data} {button} {shadow} {sizeImg} />
		{/each}
	{:else}
		<h4>{nothingMessage}</h4>
	{/if}
</ul>
