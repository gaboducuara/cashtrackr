export declare const hasPassword: (password: string) => Promise<string>;
export declare const checkPassword: (password: string, hashedPassword: string) => Promise<boolean>;
