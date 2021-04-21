export interface LogOptions {
    location?: string;
    name?: string;
    tagOnNewLine?: boolean;
}
export declare const ColorList: {
    [key: string]: string;
};
export declare function Color(name: string, bright?: boolean): string;
export interface ConsoleLike {
    log(message: any, ...optionalParams: any[]): void;
    info(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
}
export declare class Console {
    constructor(logger?: ConsoleLike);
    /**
     * The node console this was instantiated with
     */
    console: ConsoleLike;
    /**
     * Log something to the console
     * @example
     * log("Connected!")
     */
    log(messages: any[], options?: LogOptions): this;
    /**
     * Log an error to the console
     * @example
     * error(new Error("Oops!"))
     */
    error(messages: any[], options?: LogOptions): this;
    /**
     * Log non-essential information to the console
     * @example
     * info("There are 12 players connected")
     */
    info(messages: any[], options?: LogOptions): this;
    /**
     * Log a non-critical error or warning to the console
     * @example
     * warn("Please update to the latest version")
     */
    warn(messages: any[], options?: LogOptions): this;
}
