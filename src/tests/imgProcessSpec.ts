import processImage from '../imgProcess';


describe('function read a file image exist in folder', () => {
    it('should exist image', async () => {
        const data = await processImage.readImageExist('argentinaa', '200', '200');
        expect(data).toEqual('false');
    });
});

