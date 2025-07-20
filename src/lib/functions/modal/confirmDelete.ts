import type { ModalSettings, ModalStore } from '@skeletonlabs/skeleton';
import toast from 'svelte-french-toast';

export async function confirmDelete(
     event: SubmitEvent,
     modalStore: ModalStore,
     message: string
): Promise<{ success: boolean }> {
     event.preventDefault();

     return new Promise(resolve => {
          modalStore.trigger({
               type: 'confirm',
               title: 'Confirmation',
               body: message,
               buttonTextConfirm: 'Confirmer',
               buttonTextCancel: 'Annuler',
               modalClasses: 'confirmButton !rounded-md',
               response: async (confirmed: boolean) => {
                    if (!confirmed) {
                         toast.error('Suppression annulée.');
                         return resolve({ success: false });
                    }

                    try {
                         const form = event.target as HTMLFormElement;
                         const response = await fetch(form.action, {
                              method: form.method,
                              body: new FormData(form),
                         });
                         const { data } = await response.json();
                         const result = JSON.parse(JSON.parse(data));

                         if (result.error) {
                              toast.error(result.error);
                              return resolve({ success: false });
                         }

                         toast.success('Suppression réussie.');
                         resolve({ success: true });
                    } catch (error) {
                         let errorMessage = 'Erreur lors de la suppression.';

                         if (
                              typeof error === 'object' &&
                              error !== null &&
                              'data' in error
                         ) {
                              try {
                                   const err = JSON.parse(JSON.parse((error as { data?: string }).data || '{}'));
                                   errorMessage = err.error || errorMessage;
                              } catch {
                                   // ignore parsing errors
                              }
                         }

                         toast.error(errorMessage);
                         resolve({ success: false });
                    }
               },
          } as ModalSettings);
     });
}
