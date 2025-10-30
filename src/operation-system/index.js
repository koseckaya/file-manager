import os from 'node:os';
import { OS_COMMANDS } from '../commands.js';
import { invalidOsCommand } from '../helper.js';

export default class OperatingSystem {
    run(arg) {
        switch (arg[0]) {
            case OS_COMMANDS.EOL:
                this.#getEOL();
                break;
            case OS_COMMANDS.CPUS:
                this.#getCPUs();
                break;
            case OS_COMMANDS.HOMEDIR:
                this.#getHomeDir();
                break;
            case OS_COMMANDS.USERNAME:
                this.#getUsername();
                break;
            case OS_COMMANDS.ARCHITECTURE:
                this.#getArchitecture();
                break;
            default:
                invalidOsCommand();
                break;
        }
    }

    #getEOL() {
        console.log(`OS EOL: ${JSON.stringify(os.EOL)}`);
    }

    #getCPUs() {
        const cpus = os.cpus();
        const coreCount = os.availableParallelism();
        const cpuInfo = cpus.map((cpu, index) => ({
            number: index + 1,
            model: cpu.model,
            speed: `${(cpu.speed / 1000).toFixed(2)} GHz`,
        }));

        console.log(`Number of cores: ${coreCount}`);
        console.table(cpuInfo);
    }

    #getHomeDir() {
        console.log(`Home dir: ${os.homedir()}`);
    }

    #getUsername() {
        console.log(`User name: ${os.userInfo().username}`);
    }

    #getArchitecture() {
        console.log(`Architecture: ${os.arch()}`);
    }
}
