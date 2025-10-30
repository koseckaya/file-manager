import fs from 'node:fs/promises';
import { resolvePath } from '../../helper';

export default async function rm(currentDir, args) {
    const filePath = resolvePath(currentDir, args[0]);

    await fs.unlink(filePath);
}
