import { randomBytes, pbkdf2Sync, createHash } from 'node:crypto';

export const hashPassword = (password: string): string =>  {
    const salt = randomBytes(16).toString('hex');
    const iterations: number = 100000;
    const hash: string = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    const process: string = `${iterations}:${salt}:${hash}`;
    return process;
};

export const comparePassword = (inputPassword: string, storedProcess: string) => {
    const [iterations, salt, storedHash] = storedProcess.split(':');

    const inputHash: string = pbkdf2Sync(
        inputPassword,
        salt,
        parseInt(iterations),
        64,
        'sha512'
    ).toString('hex');

    return inputHash === storedHash;
};