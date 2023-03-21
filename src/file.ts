import { promises as fs } from 'fs';
import path from 'path';
import processImage from './imgProcess';


export default class File {
    static imagesFullPath = path.resolve(__dirname, '../assets/images/full');
    static imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');

    static async isImageAvailable(filename: any) {
        if (!filename) {
            return false;
        }
        return (await File.getAvailableImageNames()).includes(filename);
    }

    static async getAvailableImageNames() {
        return (await fs.readdir(File.imagesFullPath)).map(
            (filename: string): string => filename.split('.')[0]
        );
    }

    static async isThumbAvailable(params: any): Promise<boolean> {
        if (!params.filename || !params.width || !params.height) {
            return false;
        }

        const filePath: string = path.resolve(
            File.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
        );

        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    static async createThumb(params: any): Promise<null | string> {
        if (!params.filename || !params.width || !params.height) {
            return null;
        }

        const filePathFull: string = `${File.imagesFullPath}\\${params.filename}.jpg`;
        const filePathThumb: string = `${File.imagesThumbPath}\\${params.filename}-${params.width}x${params.height}.jpg`;

        return await processImage({
            source: filePathFull,
            target: filePathThumb,
            width: parseInt(params.width),
            height: parseInt(params.height)
        });
    }

    static async getImagePath(params: any): Promise<null | string> {
        const filePath: string = `${File.imagesThumbPath}\\${params.filename}-${params.width}x${params.height}.jpg`

        try {
            await fs.access(filePath);
            return filePath;
        } catch {
            return null;
        }
    }
}
