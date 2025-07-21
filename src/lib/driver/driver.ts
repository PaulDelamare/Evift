import { goto, invalidateAll } from "$app/navigation";
import toast from "svelte-french-toast";
import { closeModal, friendPage, openAddFriend } from "./storeDriver";

const mod = await import('driver.js');
const createDriver = mod.driver;

export const driver = createDriver({
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
                    setTimeout(() => {
                         goto('/auth/event', {invalidateAll: true})
                    }, 500);
               });
          } else if ('error' in data) {
               toast.error("Une erreur s'est produite");
          }
     },

     steps: [

          // Page Evenement
          {
               popover: {
                    title: 'Bienvenue sur Evift',
                    description: 'Bienvenue sur Evift, l\'application qui vous permet de créer et de gérer vos événements facilement. Nous allons faire un petit tour de démonstration pour vous montrer comment utiliser l\'application.',
               },
               onHighlightStarted: () => {
                    goto('/auth/event');
               }
          },
          {
               element: '#event-auth',
               popover: {
                    title: 'Évènements',
                    description: 'Ici, vous retrouverez la liste des événements auxquels vous avez accès.',
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
                         "Comme vous le voyez, vous êtes invité à l'anniversaire de Jean. Nous avons l'adresse, la date et l'heure de l'événement.",
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
                    title: "Accés à l'évènements",
                    description:
                         "En cliquant ici, vous pourrez accéder à l'événement d'anniversaire pour pouvoir discuter, consulter la liste de cadeaux du/des concerné(s), et bien d'autres...",
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
                    title: "Créer un évènement",
                    description:
                         "En cliquant ici, vous pourrez créer un nouvel événement.",
                    side: 'bottom',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/event');
               }
          },

          // Page Gift
          {
               element: '#gift-auth',
               popover: {
                    title: 'Liste des cadeaux',
                    description:
                         "C'est ici que vous retrouverez toutes les listes de cadeaux que vous créerez. Ce sont ces listes que vous pourrez par la suite partager lors d'un événement.",
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    goto('/auth/gift');
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
               onHighlightStarted: () => {
                    goto('/auth/gift');
               }
          },

          // Page Invitation
          {
               popover: {
                    title: 'Invitations',
                    description:
                         'Voici la page Invitations, accessible via le menu présenté précédemment. Sur cette page, vous retrouverez toutes les invitations, que ce soit pour les événements ou pour les listes de cadeaux.',
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    goto('/auth/invitation');
               }
          },
          {
               element: '#notificationNumber',
               popover: {
                    title: 'Notifications',
                    description:
                         'Nous pouvons voir ici que nous avons 2 notifications. Cela indique que nous avons deux invitations en attente.',
                    side: 'left',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/invitation');
               }
          },
          {
               element: '#invitationNav',
               popover: {
                    title: 'Navigation',
                    description:
                         "Vous retrouverez ici la navigation permettant de voir les invitations pour les événements ou les demandes d'amis.",
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
                         'Voici une invitation à un événement. On y retrouve toutes les informations nécessaires pour participer à un événement.',
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
                    description: 'Et ici, vous pourrez accepter ou refuser cette invitation.',
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
                    description: 'Cliquez ici pour voir qui vous a demandé en ami.',
                    side: 'bottom',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/invitation');
                    friendPage.set(true);
               },
          },
          {
               element: '#fakeUserInvitation',
               popover: {
                    title: "Invitation d'amis",
                    description: 'Voici une invitation d’un utilisateur. Vous pouvez voir ses informations afin de savoir si vous souhaitez l’accepter ou non.',
                    side: 'left',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/invitation');
               },
          },
          {
               element: '#fakeUserInvitation2',
               popover: {
                    title: "Répondre à l'invitation",
                    description: 'Avec, évidemment, la possibilité de l’accepter ou de la refuser.',
                    side: 'left',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/invitation');
               },
          },

          // Page Friends
          {
               element: '#friends-auth',
               popover: {
                    title: 'Amis',
                    description: 'Sur cette page, vous aurez la possibilité de voir vos amis. Vous pouvez également en ajouter de nouveaux. Vos amis pourront être invités à vos événements.',
                    side: 'left',
                    align: 'start'
               },
               disableActiveInteraction: true,
               onHighlightStarted: () => {
                    goto('/auth/friends');
               },

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
               },
          },
          {
               element: '#addFriendButton',
               popover: {
                    title: 'Ajouter un ami',
                    description: 'Et voici le bouton pour ajouter un ami.',
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
               disableActiveInteraction: true,
          },
          {
               element: '#addFriendModal',
               popover: {
                    title: 'Ajouter un ami',
                    description: 'Et voici la fenêtre modale pour ajouter un ami.',
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    goto('/auth/friends');
               },
               disableActiveInteraction: true,
          },
          {
               element: '#fakeUser',
               popover: {
                    title: 'John',
                    description: 'Vous avez réussi à trouver votre ami John Doe grâce à son adresse e-mail !',
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    goto('/auth/friends');
               },
               disableActiveInteraction: true,
          },
          {
               element: '#addFriendForm',
               popover: {
                    title: 'L\'inviter',
                    description: 'Vous pouvez donc lui faire une demande d\'ami en cliquant sur le bouton "Ajouter". John recevra une notification pour accepter la demande.',
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    goto('/auth/friends');
                    openAddFriend.set(true);
                    closeModal.set(false);
               },
               disableActiveInteraction: true,
          },
          {
               popover: {
                    title: 'Fin du tutoriel',
                    description: 'Félicitations, vous venez de compléter le tutoriel ! Vous savez maintenant utiliser Evift.',
                    side: 'bottom',
                    align: 'start'
               },
               onHighlightStarted: () => {
                    openAddFriend.set(false);
                    closeModal.set(true);
                    goto('/auth/friends');
               },
               disableActiveInteraction: true
          }
     ]
});