export function convertStringToBoolean(string: string) {
     if (string === 'true') {
          return true;
     } else if (string === 'false') {
          return false;
     } else {
          throw new Error('La chaîne n\'est pas un booléen valide');
     }
}