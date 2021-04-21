export interface LogOptions {
    location?: string;
    name?: string;
    doMultiline?: boolean;
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
