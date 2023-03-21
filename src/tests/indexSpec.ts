import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';
import app from '../main';
import supertest from 'supertest';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test image processing via sharp', (): void => {


    it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
        await File.createThumb({ filename: 'argentina', width: '99', height: '99' });

        const resizedImagePath: string = path.resolve(
            File.imagesThumbPath,
            `argentina-99x99.jpg`
        );
        let errorFile: null | string = '';

        try {
            await fs.access(resizedImagePath);
            errorFile = null;
        } catch {
            errorFile = 'File was not created';
        }

        expect(errorFile).toBeNull();
    });
});

describe('endpoint: /api/images', (): void => {

    it('gets /api/images?filename=argentina&width=199&height=199 (valid args)', async (): Promise<void> => {
        const response: supertest.Response = await request.get(
            '/api/images?filename=argentina&width=199&height=199'
        );

        expect(response.status).toBe(200);
    });

    it('gets /api/images (no arguments)', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/api/images');

        expect(response.status).toBe(200);
    });
});
