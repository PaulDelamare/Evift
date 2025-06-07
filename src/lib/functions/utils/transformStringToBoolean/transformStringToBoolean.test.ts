import { describe, it, expect } from 'vitest';
import { convertStringToBoolean } from './transformStringToBoolean';

describe('convertStringToBoolean', () => {
    it('retourne true pour "true"', () => {
        expect(convertStringToBoolean('true')).toBe(true);
    });

    it('retourne false pour "false"', () => {
        expect(convertStringToBoolean('false')).toBe(false);
    });

    it('lève une erreur pour une chaîne invalide', () => {
        expect(() => convertStringToBoolean('yes')).toThrow("La chaîne n'est pas un booléen valide");
    });

    it('lève une erreur pour une chaîne vide', () => {
        expect(() => convertStringToBoolean('')).toThrow("La chaîne n'est pas un booléen valide");
    });

    it('lève une erreur pour des variations de casse', () => {
        expect(() => convertStringToBoolean('True')).toThrow("La chaîne n'est pas un booléen valide");
        expect(() => convertStringToBoolean('FALSE')).toThrow("La chaîne n'est pas un booléen valide");
        expect(() => convertStringToBoolean('TrUe')).toThrow("La chaîne n'est pas un booléen valide");
    });
});
