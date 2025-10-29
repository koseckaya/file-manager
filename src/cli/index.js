import process from 'process';
import User from '../user/index.js';
import Navigation from '../navigation/index.js';
import FileOperation from '../file-operation/index.js';

export default class Cli {
    constructor() {
        this.user = new User();
        this.navigation = new Navigation();
        this.fileOperation = new FileOperation();
        this.#setupInputHandler();
        this.#printCurrentDirectory();
    }

    #printCurrentDirectory() {
        console.log(
            `You are currently in ${this.navigation.getCurrentDirectory()}`
        );
    }

    #setupInputHandler() {
        process.stdin.on('data', async (data) => {
            const input = data.toString().trim();
            const [command, ...args] = input.split(' ');

            switch (command) {
                case 'up':
                    this.navigation.up();
                    break;
                case 'cd':
                    this.navigation.cd(args);
                    break;
                case 'ls':
                    this.navigation.ls();
                    break;
                case 'cat':
                    await this.fileOperation.cat(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                case 'add':
                    await this.fileOperation.add(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                case 'mkdir':
                    await this.fileOperation.mkdir(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                case 'rn':
                    await this.fileOperation.rn(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                case 'cp':
                    await this.fileOperation.cp(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                case 'mv':
                    await this.fileOperation.mv(
                        this.navigation.getCurrentDirectory(),
                        args
                    );
                    break;
                default:
                    console.log('Unknown command');
            }
            this.#printCurrentDirectory();
        });
    }
}
