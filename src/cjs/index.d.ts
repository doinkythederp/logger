/**
 * @module @doinkthederp/logger
 */
/**
 * @typedef LogOptions
 */
export interface LogOptions {
    location?: string;
    name?: string;
    doMultiline?: boolean;
    console?: ConsoleLike;
}
export declare const ColorList: {
    reset: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    blackBg: string;
    redBg: string;
    greenBg: string;
    yellowBg: string;
    blueBg: string;
    magentaBg: string;
    cyanBg: string;
    whiteBg: string;
    bold: string;
    faint: string;
    dim: string;
    italic: string;
    underline: string;
    blinking: string;
    flashing: string;
    inverse: string;
    reverse: string;
    invisible: string;
};
export declare function Color(name: string, bright?: boolean): string;
export interface ConsoleLike {
    log(message: any, ...optionalParams: any[]): void;
    info(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
}
export default class Logger {
    constructor(options: LogOptions);
    /**
     * The options this was instantiated with
     */
    options: LogOptions;
    /**
     * The node console this was instantiated with
     */
    console: ConsoleLike;
    /**
     * Log something to the console
     * @param {any | any[]} message - What should be logged to the console
     * @param {LogOptions} options - The options for this log
     * @example
     * log("Connected!")
     */
    log(message: any | any[], options?: LogOptions): this;
    /**
     * Log an error to the console
     * @param {any | any[]} message - What should be logged to the console
     * @param {LogOptions} options - The options for this log
     * @example
     * error(new Error("Oops!"))
     */
    error(message: any | any[], options?: LogOptions): this;
    /**
     * Log non-essential information to the console
     * @param {any | any[]} message - What should be logged to the console
     * @param {LogOptions} options - The options for this log
     * @example
     * info("There are 12 players connected")
     */
    info(message: any | any[], options?: LogOptions): this;
    /**
     * Log a non-critical error or warning to the console
     * @param {any | any[]} message - What should be logged to the console
     * @param {LogOptions} options - The options for this log
     * @example
     * warn("Please update to the latest version")
     */
    warn(message: any | any[], options?: LogOptions): this;
}
