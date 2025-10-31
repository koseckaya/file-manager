import fs from 'node:fs/promises';
import { resolvePath } from '../../helper.js';

export default async function add(currentDir, args) {
    const filePath = resolvePath(currentDir, args[0]);

    await fs.writeFile(filePath, '', { flag: 'wx' });

    console.log(`File added successfully ${filePath}`);
}
