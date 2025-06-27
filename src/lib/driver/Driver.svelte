<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'driver.js/dist/driver.css';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';

	onMount(async () => {
		if (!browser) return;

		const mod = await import('driver.js');
		const createDriver = mod.driver;

		const driver = createDriver({
			allowClose: false,
			showProgress: true,

			steps: [
				{
					element: '#event-auth',
					popover: {
						title: 'Évènements',
						description: 'Ici vous retrouverez la liste des évènements auxquels vous avez accès.',
						side: 'left',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/event');
					}
				},
				{
					element: '#fakeevent',
					popover: {
						title: 'Anniversaire de Jean',
						description:
							"Comme vous le voyez, vous êtes invité à l'anniversaire de Jean. Nous avons l'adresse, la date et l'heure de l'évènement.",
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true
				},
				{
					element: '#fakeevent2',
					popover: {
						title: "Accés à l'évènements",
						description:
							"En cliquant ici vous pourrez accéder à l'évènements d'anniversaire pour pouvoir discuter, consulter la liste de cadeaux du/des concernés, et bien d'autres...",
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true
				},
				{
					element: '#gift-auth',
					popover: {
						title: 'Import the Library',
						description: 'It works the same in vanilla JavaScript as well as frameworks.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/gift');
					}
				},
				{
					element: '#invitation-auth',
					popover: {
						title: 'Importing CSS',
						description:
							'Import the CSS which gives you the default styling for popover and overlay.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},
				{
					element: '#friends-auth',
					popover: {
						title: 'Create Driver',
						description: 'Simply call the driver function to create a driver.js instance',
						side: 'left',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
					},
					onDeselected: async () => {
						const response = await fetch('?/completeFirstLogin', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							body: ''
						});
						const json = await response.json();
						const data = JSON.parse(JSON.parse(json.data));
						console.log(data);
						if (data.success) {
							invalidateAll().then(() => {
								toast.success('Tutoriel complété !');
								return goto('/auth/event');
							});
						} else if ('error' in data) {
							toast.error("Une erreur c'est produite");
						}
					}
				}
			]
		});

		driver.drive();
	});
</script>
