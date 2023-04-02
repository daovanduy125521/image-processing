import sharp from 'sharp';
import path from 'path';
import { promises as fsPromise } from 'fs';

async function readImageExist(fileName: string, width: string, height: string): Promise<string> {
    const imagesThumbPath = path.resolve(__dirname, '../assets/thumb/');
    const newImage = `${fileName}(${width}x${height}).jpg`;
    const imageFiles = await fsPromise.readdir(imagesThumbPath);
    const savePath = `${imagesThumbPath}/${fileName}(${width}x${height}).jpg`;
    const filenames = imageFiles.map((file: string) => path.basename(file));
    if (filenames.includes(newImage)) {
        return `${savePath}`;
    } else {
        return 'false';
    }
}

async function resizedImage(fileName: string, width: string, height: string): Promise<string> {
    const newImage = `${fileName}(${width}x${height}).jpg`;
    const imagesThumbPath = path.resolve(__dirname, '../assets/thumb/');
    const imagesFullPath = path.resolve(__dirname, '../assets/full');
    const imagePath = `${imagesFullPath}/${fileName}.jpg`;
    const savePath = `${imagesThumbPath}/${fileName}(${width}x${height}).jpg`;
    const resizedImage = await sharp(imagePath)
        .resize(parseInt(width), parseInt(height))
        .toBuffer();
    await fsPromise.writeFile(savePath, resizedImage);
    return `${savePath}`;
}

export default { readImageExist, resizedImage };
