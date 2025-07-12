/**
 * Fonction utilitaire à utiliser dans le catch d'un try/catch pour les requêtes.
 * Elle logge un maximum d'informations pour faciliter le debug.
 */
type ErrorWithExtra = Error & {
     response?: unknown;
     request?: unknown;
     code?: unknown;
};

export function catchErrorRequest(error: unknown, context?: string): void {
     // Construit un message de contexte si fourni
     const contextMsg = context ? `[${context}] ` : '';

     if (error instanceof Error) {
          const err = error as ErrorWithExtra;
          // Erreur standard JS
          console.error(`${contextMsg} Erreur:`, {
               name: err.name,
               message: err.message,
               stack: err.stack,
               ...((typeof err.response === 'object' && err.response !== null) ? { response: err.response } : {}),
               ...((typeof err.request === 'object' && err.request !== null) ? { request: err.request } : {}),
               ...(typeof err.code !== 'undefined' ? { code: err.code } : {}),
          });
     } else if (typeof error === 'object' && error !== null) {
          // Erreur type Axios ou autre objet
          console.error(`${contextMsg} Erreur objet:`, JSON.stringify(error, null, 2));
     } else {
          // Erreur primitive (string, number, etc.)
          console.error(`${contextMsg} Erreur inconnue:`, error);
     }
}
