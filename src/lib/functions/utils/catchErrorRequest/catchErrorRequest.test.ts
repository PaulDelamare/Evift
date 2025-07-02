import { describe, it, expect, vi } from 'vitest';
import { catchErrorRequest } from './catchErrorRequest';

describe('catchErrorRequest', () => {
    it('loggue une erreur standard avec contexte', () => {
        const error = new Error('Erreur standard');
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        catchErrorRequest(error, 'test-contexte');

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0]).toContain('[test-contexte]');
        expect(spy.mock.calls[0][1]).toMatchObject({
            name: 'Error',
            message: 'Erreur standard',
        });

        spy.mockRestore();
    });

    it('loggue une erreur enrichie avec code, request et response', () => {
        const error = Object.assign(new Error('Erreur enrichie'), {
            code: 'ERR001',
            request: { url: '/api' },
            response: { status: 500 },
        });
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        catchErrorRequest(error);

        expect(spy).toHaveBeenCalledOnce();
        const [, logged] = spy.mock.calls[0];
        expect(logged).toMatchObject({
            code: 'ERR001',
            request: { url: '/api' },
            response: { status: 500 },
        });

        spy.mockRestore();
    });

    it('loggue un objet inconnu', () => {
        const error = { message: 'Oops', code: 123 };
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        catchErrorRequest(error);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0]).toContain('Erreur objet:');
        expect(spy.mock.calls[0][1]).toContain('"code": 123');

        spy.mockRestore();
    });

    it('loggue une erreur primitive', () => {
        const error = 'Erreur string';
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

        catchErrorRequest(error);

        expect(spy).toHaveBeenCalledOnce();
        expect(spy.mock.calls[0][0]).toContain('Erreur inconnue:');
        expect(spy.mock.calls[0][1]).toBe('Erreur string');

        spy.mockRestore();
    });
});
