import express from 'express';
import processImage from './../../imgProcess';
const images = express.Router();

images.get('/', async (req, res) => {
    let path: string;
    try {
        const imageExist = await processImage.readImageExist(
            req.query['filename'] as string,
            req.query['width'] as string,
            req.query['height'] as string
        );
        if (imageExist) {
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
});

export = images;