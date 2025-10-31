import path from 'node:path';
import os from 'node:os';
import { COMMANDS_MAP } from './commands.js';
import { OS_COMMANDS } from './commands.js';

export function resolvePath(currentDir, filePath) {
    return path.isAbsolute(filePath)
        ? filePath
        : path.resolve(currentDir, filePath);
}

export const extractAllArguments = (command, userInput) => {
    const commandConfig = Object.values(COMMANDS_MAP).find(
        (cmd) => cmd.name === command
    );

    if (!commandConfig) {
        return;
    }

    const args = extractArguments(userInput);
    const providedArgsCount = args.length - 1;

    if (providedArgsCount !== commandConfig.arg_count) {
        console.error(
            `Incorrect number of arguments provided. Expected ${commandConfig.arg_count} arguments.`
        );
        return null;
    }
    return args.slice(1);
};

export const extractArguments = (userInput) => {
    return (
        userInput
            .trim()
            .match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
            .map((arg) => {
                if (
                    (arg.startsWith('"') && arg.endsWith('"')) ||
                    (arg.startsWith("'") && arg.endsWith("'"))
                ) {
                    return arg.slice(1, -1);
                }
                return arg;
            }) || []
    );
};

export const extractArgument = (userInput, argNumber) => {
    const args = extractArguments(userInput);
    let argument = args[argNumber] || '';
    if (argument.startsWith('"') && argument.endsWith('"')) {
        argument = argument.substring(1, argument.length - 1);
    }

    return argument;
};

export const parseInput = (userInput) => {
    const command = extractArgument(userInput, 0);
    const args = extractAllArguments(command, userInput);
    if (!args || !command) {
        return { command: null, args: null };
    }

    return { command, args };
};

export function invalidCommand() {
    console.log(`${os.EOL} Unknown command. Available commands:`);
    console.table(
        Object.values(COMMANDS_MAP).map((cmd) => ({
            Command: cmd.name,
            Description: cmd.description,
            Example: cmd.example,
        }))
    );
}

export function invalidOsCommand() {
    console.log(`${os.EOL} Unknown OS command. Available OS commands`);
    console.table(
        Object.entries(OS_COMMANDS).map(([key, value]) => ({
            Command: value,
            Description: `Get ${key.toLowerCase()} information`,
            Example: `os ${value}`,
        }))
    );
}
