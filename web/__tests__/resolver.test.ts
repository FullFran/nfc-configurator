import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET as resolverGET } from '../app/t/[publicId]/route';
import { NextRequest } from 'next/server';

// Mock the signMessage function
vi.mock('@/lib/crypto', () => ({
    signMessage: vi.fn(() => Promise.resolve('mocked-signature')),
    createMsgToSign: vi.fn(() => 'mocked-message'),
    verifySignature: vi.fn(() => Promise.resolve(true)),
}));

// Mock global fetch
global.fetch = vi.fn();

describe('Edge Resolver GET /t/[publicId]', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('redirects to destinationUrl when status is ACTIVE', async () => {
        const publicId = 'test-id';
        const destinationUrl = 'https://example.com/target';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ status: 'ACTIVE', destinationUrl }),
        });

        const req = new NextRequest(`http://localhost/t/${publicId}`);
        const response = await resolverGET(req, { params: Promise.resolve({ publicId }) });

        expect(response.status).toBe(307); // NextResponse.redirect uses 307 by default
        expect(response.headers.get('location')).toBe(destinationUrl);
    });

    it('redirects to /activar when status is NO_CLAIMED', async () => {
        const publicId = 'test-id';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ status: 'NO_CLAIMED' }),
        });

        const req = new NextRequest(`http://localhost/t/${publicId}`);
        const response = await resolverGET(req, { params: Promise.resolve({ publicId }) });

        expect(response.status).toBe(307);
        expect(response.headers.get('location')).toContain(`/activar?id=${publicId}`);
    });

    it('redirects to /error/disabled when status is DISABLED', async () => {
        const publicId = 'test-id';

        (global.fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({ status: 'DISABLED' }),
        });

        const req = new NextRequest(`http://localhost/t/${publicId}`);
        const response = await resolverGET(req, { params: Promise.resolve({ publicId }) });

        expect(response.status).toBe(307);
        expect(response.headers.get('location')).toContain('/error/disabled');
    });

    it('redirects to /404 when internal API returns 404', async () => {
        const publicId = 'invalid-id';

        (global.fetch as any).mockResolvedValue({
            ok: false,
            status: 404,
        });

        const req = new NextRequest(`http://localhost/t/${publicId}`);
        const response = await resolverGET(req, { params: Promise.resolve({ publicId }) });

        expect(response.status).toBe(307);
        expect(response.headers.get('location')).toContain('/404');
    });
});
