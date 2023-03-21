import sharp from 'sharp';

const processImage = async (
    params: any
): Promise<null | string> => {
    await sharp(params.source)
        .resize(params.width, params.height)
        .toFormat('jpeg')
        .toFile(params.target);
    return null;
};

export default processImage;
