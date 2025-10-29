import cat from './commands/cat.js';

export default class FileOperation {
    async cat(currentDir, args) {
        return await cat(currentDir, args);
    }

    async add(currentDir, args) {
        return await add(currentDir, args);
    }

    async mkdir(currentDir, args) {
        return await mkdir(currentDir, args);
    }
}
