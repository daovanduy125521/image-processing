
import supertest from 'supertest';
import app from '../main';

const request = supertest(app);
describe('endpoint: /api/images', () => {
    it('gets /api/images?filename=argentina&width=199&height=199', async () => {
        const response: supertest.Response = await request.get(
            '/api/images?filename=argentina&width=199&height=199'
        );
        expect(response.status).toBe(200);
    });

    it('gets /api/images?filename=argentina&width=199', async () => {
        const response = await request.get('/api/images?filename=argentina&width=199');
        expect(response.status).toBe(500);
    });
});