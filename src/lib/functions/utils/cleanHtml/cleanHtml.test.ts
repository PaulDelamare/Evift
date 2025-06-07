import { describe, it, expect, vi } from 'vitest';
import { getYoutubeData, linkify, matchYoutubeUrl } from './cleanHtml';

describe('linkify', () => {
    it('convertit une URL en balise anchor', () => {
        const input = 'Visit https://example.com';
        const expected = 'Visit <a href="https://example.com" target="_blank">https://example.com</a>';
        expect(linkify(input)).toBe(expected);
    });

    it('ne modifie pas le texte s’il n’y a pas d’URL', () => {
        const input = 'No URL here';
        expect(linkify(input)).toBe('No URL here');
    });

    it('rien n\'est passé dasn la fonction', () => {
        const input = '';
        expect(linkify(input)).toBe('');
    });
});

describe('matchYoutubeUrl', () => {
    it('retourne false pour des URL non YouTube', () => {
        expect(matchYoutubeUrl('https://example.com')).toBe(false);
    });

    it('retourne un lien intégré pour une URL YouTube standard', () => {
        const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const result = matchYoutubeUrl(url);
        expect(result).toContain('dQw4w9WgXcQ');
        expect(result).toContain('target="_blank"');
    });

    it('retourne un lien intégré pour une URL YouTube courte', () => {
        const url = 'https://youtu.be/dQw4w9WgXcQ';
        const result = matchYoutubeUrl(url);
        expect(result).toContain('dQw4w9WgXcQ');
        expect(result).toContain('target="_blank"');
    });

    it('retourne un lien intégré pour une URL mobile YouTube', () => {
        const url = 'https://m.youtube.com/watch?v=dQw4w9WgXcQ';
        const result = matchYoutubeUrl(url);
        expect(result).toContain('dQw4w9WgXcQ');
        expect(result).toContain('target="_blank"');
    });
});

describe('getYoutubeData', () => {
    it('retourne du HTML embed pour une URL YouTube valide', async () => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        const mockResponse = {
            url: youtubeUrl,
            title: 'Test Video',
            thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg'
        };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockResponse)
            } as Response)
        );
        const result = await getYoutubeData(youtubeUrl);
        expect(result).toContain('Test Video');
        expect(result).toContain('img.youtube.com/vi/dQw4w9WgXcQ/0.jpg');
        vi.restoreAllMocks();
    });

    it('retourne false si l’URL ne correspond pas à YouTube', async () => {
        const result = await getYoutubeData('https://example.com');
        expect(result).toBe(false);
    });

    it('gère une erreur réseau', async () => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));
        await expect(getYoutubeData(youtubeUrl)).rejects.toThrow('Network Error');
        vi.restoreAllMocks();
    });
});
