import fs from 'node:fs';
import os from 'node:os';
import { Transform } from 'node:stream';
import { stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';
import { resolvePath } from '../../helper.js';

export default async function cat(currentDir, args) {
    const filePath = resolvePath(currentDir, args[0]);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('error', (error) => {
        console.log(`Operation failed: ${error}`);
    });

    readStream.on('end', () => {
        process.stdout.write(os.EOL);
    });

    await pipeline(readStream, stdout, { end: false });
}
