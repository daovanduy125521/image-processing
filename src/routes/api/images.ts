import express from 'express';
import File from './../../file';
const images = express.Router();

images.get('/', async (req, res): Promise<void> => {
    if (!(await File.isImageAvailable(req.query['filename'])) || !req.query['width'] || !req.query['height']) {
        res.send(`Url is wrong`);
        return;
    } else {
        if (!(await File.isThumbAvailable(req.query))) {
            await File.createThumb(req.query);
        }
    }

    const path: null | string = await File.getImagePath(req.query);

    if (path) {
        res.sendFile(path);
    } else {
        res.send('Url is wrong');
    }
});

export = images;