import fs from 'fs';
import { resolvePath } from '../../helper';

export default function rm(currentDir, args) {
    return new Promise((resolve) => {
        if (!args || args.length === 0) {
            console.error('Invalid input');
            resolve();
        }

        try {
            const filePath = resolvePath(currentDir, args[0]);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Operation failed:${err}`);
                }
                resolve();
            });
        } catch (error) {
            console.error(`Operation failed:${error}`);
            resolve();
        }
    });
}
