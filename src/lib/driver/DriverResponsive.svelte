<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'driver.js/dist/driver.css';
	import { closeModal, friendPage, openAddFriend, openBurger } from './storeDriver';
	import { driver } from './driver';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { innerWidthStore } from '$lib/stores/innerScreen.store';

	onMount(async () => {
		const mod = await import('driver.js');
		const createDriver = mod.driver;

		const driverResponsive = createDriver({
			allowClose: true,
			showProgress: true,

			onDestroyed: async () => {
				const response = await fetch('/auth/friends?/completeFirstLogin', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					body: ''
				});
				const json = await response.json();
				const data = JSON.parse(JSON.parse(json.data));
				if (data.success) {
					invalidateAll().then(() => {
						toast.success('Tutoriel complété !');
						goto('/auth/event', { invalidateAll: true });
					});
				} else if ('error' in data) {
					toast.error("Une erreur s'est produite");
				}
			},

			steps: [
				{
					popover: {
						title: 'Bienvenue sur Evift',
						description:
							"Bienvenue sur Evift, l'application qui vous permet de créer et de gérer vos événements facilement. Nous allons faire un petit tour de démonstration pour vous montrer comment utiliser l'application."
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
							"Voici la page évènement. Comme vous le voyez, vous participez à l'évènement d'anniversaire de Jean.",
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/event');
					}
				},
				{
					element: '#fakeevent2',
					popover: {
						title: "Accès à l'événement",
						description:
							"En cliquant sur \"Accéder\" vous pourrez accéder à l'événement d'anniversaire pour pouvoir discuter, consulter la liste de cadeaux du/des concerné(s), et bien d'autres...",
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/event');
					}
				},
				{
					element: '#createEventButton',
					popover: {
						title: 'Créer un évènement',
						description: 'En cliquant ici vous pourrez créer un nouvel évènement.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/event');
					}
				},

				// Burger
				{
					element: '#navbar-responsive',
					popover: {
						title: 'Menu',
						description:
							"C'est ici que vous retrouvez la navigation pour accéder aux autres pages.",
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/event');
						openBurger.set(false);
					}
				},

				{
					element: '#gift-auth-responsive',
					popover: {
						title: 'Listes de cadeaux',
						description: 'Cliquons sur la liste de cadeaux pour voir comment ça fonctionne.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/event');
					},
					onDeselected: () => {
						goto('/auth/gift');
					}
				},

				// Gifts

				{
					onHighlightStarted: async () => {
						goto('/auth/gift');
						openBurger.set(false);
						await new Promise((resolve) => setTimeout(resolve, 200));
						driverResponsive.moveNext();
					}
				},
				{
					element: '#fakelist',
					popover: {
						title: "Cadeaux d'anniversaires",
						description:
							'Par exemple, voici une liste que nous avons créée. Nous avons mis comme titre "Birthday Gifts" pour nous rappeler que ce sont les cadeaux désirés pour notre anniversaire. Nous constatons à côté que nous avons 2 cadeaux dans cette liste.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: async () => {
						goto('/auth/gift');
					}
				},

				// Notifications
				{
					element: '#invitation-auth-responsive',
					popover: {
						title: 'Invitations',
						description: 'Maintenant dirigeons nous vers la page des invitations.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},
				{
					popover: {
						title: 'Invitations',
						description:
							'Sur cette page vous retrouverez toutes les invitations. Que ce soit pour les évènements ou pour les listes de cadeaux.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},
				{
					element: '#invitationNav',
					popover: {
						title: 'Navigation',
						description:
							"Vous retrouverez ici la navigation permettant de voir les invitations pour les évènements ou les demandes d'amis.",
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},
				{
					element: '#fakeEventInvit',
					popover: {
						title: 'Invitation à un évènement',
						description:
							'Voici une invitation à un évènement. On y retrouve toutes les informations nécessaires pour participer à un évènement.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},

				{
					element: '#fakeEventInvitButton',
					popover: {
						title: "Répondre à l'invitation",
						description: 'Et ici vous pourrez accepter ou refuser cette invitation.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
						friendPage.set(false);
					}
				},
				{
					element: '#friendsInvitation',
					popover: {
						title: "Invitation d'amis",
						description: 'Cliquez ici pour voir qui vous demande en amis.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
						friendPage.set(true);
					}
				},
				{
					element: '#fakeUserInvitation',
					popover: {
						title: "Invitation d'amis",
						description:
							'Voici une invitation d’un utilisateur. Vous pouvez voir ses informations afin de savoir si vous souhaitez l’accepter ou non.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},
				{
					element: '#fakeUserInvitation2',
					popover: {
						title: "Répondre à l'invitation",
						description: 'Avec évidemment la possibilité de l’accepter ou de la refuser.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/invitation');
					}
				},

				// Friends
				{
					element: '#friends-auth-responsive',
					popover: {
						title: 'Amis',
						description: 'Et enfin, vous pourrez gérer vos amis.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/friends');
					}
				},

				{
					popover: {
						title: 'Amis',
						description:
							'Sur cette page, vous aurez la possibilité de voir vos amis. Vous pouvez également en ajouter de nouveaux. Vos amis pourront être invités à vos événements.',
						side: 'left',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/friends');
					}
				},

				{
					element: '#fakeFriendIdDriver',
					popover: {
						title: 'Amis',
						description: 'Voici votre amie Alice Smith.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/friends');
					}
				},
				{
					element: '#addFriendButton',
					popover: {
						title: 'Ajouter un ami',
						description: 'Et voici notre bouton pour ajouter un ami.',
						side: 'bottom',
						align: 'start'
					},
					disableActiveInteraction: true,
					onHighlightStarted: () => {
						goto('/auth/friends');
						openAddFriend.set(false);
						closeModal.set(false);
					},
					onDeselected: () => {
						openAddFriend.set(true);
					}
				},
				{
					onHighlightStarted: () => {
						const interval = setInterval(() => {
							if (document.querySelector('#addFriendModal')) {
								clearInterval(interval);
								driver.moveNext();
							}
						}, 100);

						return false;
					},
					disableActiveInteraction: true
				},
				{
					element: '#addFriendModal',
					popover: {
						title: 'Ajouter un ami',
						description: 'Et voici notre modal pour ajouter un ami.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
					},
					disableActiveInteraction: true
				},
				{
					element: '#fakeUser',
					popover: {
						title: 'John',
						description:
							'Vous avez réussi à trouver votre ami John Doe grâce à son adresse e-mail !',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
					},
					disableActiveInteraction: true
				},
				{
					element: '#addFriendForm',
					popover: {
						title: "L'inviter",
						description:
							'Vous pouvez donc lui faire une demande d\'amis en cliquant sur le bouton "Ajouter". John recevra une notification pour accepter la demande.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
						openAddFriend.set(true);
						closeModal.set(false);
					},
					disableActiveInteraction: true
				},
				{
					element: '#logout-button',
					popover: {
						title: "Une dernière chose",
						description:
							'En cliquant sur ce dernier bouton, vous aurez la possibilité de voir vos informations. et de vous déconnecter. Pratique, non ?',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
						openAddFriend.set(false);
						closeModal.set(true);
					},
					disableActiveInteraction: true
				},
				{
					popover: {
						title: 'Fin du tutoriel',
						description:
							'Félicitations, vous venez de compléter le tutoriel ! Vous savez maintenant utiliser Evift.',
						side: 'bottom',
						align: 'start'
					},
					onHighlightStarted: () => {
						goto('/auth/friends');
					},
					disableActiveInteraction: true
				}
			]
		});
		if (!browser) return;

		if ($innerWidthStore && $innerWidthStore <= 1150) {
			driverResponsive.drive();
		} else {
			driver.destroy();
		}
	});
</script>
