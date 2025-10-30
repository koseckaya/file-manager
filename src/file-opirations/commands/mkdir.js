import fs from 'fs';
import { resolvePath } from '../../helper';

export default function mkdir(currentDir, args) {
    return new Promise((resolve, reject) => {
        if (!args || args.length === 0) {
            console.error('Invalid input');
            resolve();
            return;
        }

        try {
            const dirPath = resolvePath(currentDir, args[0]);

            fs.mkdir(dirPath, (err) => {
                if (err) {
                    console.error('Operation failed');
                    resolve();
                    return;
                }
                resolve();
            });
        } catch (error) {
            console.error('Operation failed');
            resolve();
        }
    });
}
