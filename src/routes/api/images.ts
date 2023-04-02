import express from 'express';
import processImage from './../../imgProcess';
const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
    let path: string;
    if (Number.isNaN(Number(req.query['height'])) || Number(req.query['height']) < 1) {
        res.status(500).send('Error: URL with height is missing');
    } else if (Number.isNaN(Number(req.query['width'])) || Number(req.query['width']) < 1) {
        res.status(500).send('Error: URL with width is missing');
    } else {
        try {
            const imageExist = await processImage.readImageExist(
                req.query['filename'] as string,
                req.query['width'] as string,
                req.query['height'] as string
            );
            if (imageExist !== 'false') {
                path = imageExist;
            } else {
                path = await processImage.resizedImage(
                    req.query['filename'] as string,
                    req.query['width'] as string,
                    req.query['height'] as string
                );
            }
        } catch (error) {
            path = '';
        }
        if (path) {
            res.status(200).sendFile(path);
        } else {
            res.status(500).send('Error: URL is missing');
        }
    }
});

export = images;