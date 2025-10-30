import fs from 'node:fs/promises';
import { resolvePath } from '../../helper';

export default async function mkdir(currentDir, args) {
    const dirPath = resolvePath(currentDir, args[0]);

    await fs.mkdir(dirPath, { recursive: false });

    console.log(`Directory created successfull ${dirPath}`);
}
