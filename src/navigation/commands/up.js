import path from 'node:path';
import { chdir } from 'node:process';

export default function goUp(currentDir) {
    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
        return currentDir;
    }

    try {
        chdir(parentDir);
    } catch (error) {
        console.error('Operation failed');
    }
    return parentDir;
}
