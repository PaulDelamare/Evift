import { describe, it, expect } from 'vitest';
import { formatDate, formatTime } from './formatDate';

describe('formatDate', () => {
    // Cas basiques avec des dates valides
    it('formate correctement une date standard en dd/mm/yyyy', () => {
        const date = new Date(2025, 2, 7); // 07/03/2025 (mois = 0-indexé)
        expect(formatDate(date)).toBe('07/03/2025');
    });

    it('ajoute un zéro devant les jours et mois à un chiffre', () => {
        const date = new Date(2023, 3, 5); // 05/04/2023
        expect(formatDate(date)).toBe('05/04/2023');
    });

    it('formate la date d\'époque (Unix Epoch)', () => {
        const date = new Date(0); // 01/01/1970
        expect(formatDate(date)).toBe('01/01/1970');
    });

    it('formate correctement une date passée sous forme de chaîne valide', () => {
        const date = new Date('2020-12-31T23:59:59');
        const expected = new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        expect(formatDate(date)).toBe(expected);
    });

    // Tests de correspondance du format (pattern dd/mm/yyyy)
    it('renvoie une chaîne respectant le format dd/mm/yyyy', () => {
        const date = new Date(2022, 10, 15);
        const formatted = formatDate(date);
        expect(formatted).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it('gère null comme une date (new Date(null) renvoie 01/01/1970)', () => {
        const date = new Date(null);
        expect(formatDate(date)).toBe('01/01/1970');
    });

    it('formate correctement une date créée à partir d\'un timestamp numérique', () => {
        const timestamp = 123456789;
        const date = new Date(timestamp);
        const expected = new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        expect(formatDate(date)).toBe(expected);
    });

    it('ne modifie pas l\'objet Date passé en argument', () => {
        const date = new Date(2023, 5, 10);
        const copy = new Date(date);
        formatDate(date);
        expect(date.getTime()).toBe(copy.getTime());
    });
});



describe('formatTime', () => {
    it('formate correctement une heure avec heures et minutes à deux chiffres', () => {
        // Exemple : 08:05
        const date = new Date(2023, 0, 1, 8, 5);
        const result = formatTime(date);
        // On vérifie le format HH:MM
        expect(result).toMatch(/^\d{2}:\d{2}$/);
        // Pour fr-FR, cela devrait renvoyer "08:05"
        expect(result).toBe('08:05');
    });

    it('formate correctement minuit (00:00)', () => {
        const date = new Date(2023, 0, 1, 0, 0);
        const result = formatTime(date);
        expect(result).toMatch(/^00:00$/);
    });

    it('formate correctement midi (12:00)', () => {
        const date = new Date(2023, 0, 1, 12, 0);
        const result = formatTime(date);
        expect(result).toMatch(/^12:00$/);
    });
    
    it('formate correctement une heure en après-midi (16:45)', () => {
        const date = new Date(2023, 5, 15, 16, 45);
        const result = formatTime(date);
        expect(result).toMatch(/^16:45$/);
    });
});