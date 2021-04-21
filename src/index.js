import { inspect } from 'util';
export const ColorList = {
    reset: "0",
    /* Foreground */
    black: "30",
    red: "31",
    green: "32",
    yellow: "33",
    blue: "34",
    magenta: "35",
    cyan: "36",
    white: "37",
    /* Background */
    blackBg: "40",
    redBg: "41",
    greenBg: "42",
    yellowBg: "43",
    blueBg: "44",
    magentaBg: "45",
    cyanBg: "46",
    whiteBg: "47",
    /* FX */
    bold: "1",
    faint: "2",
    dim: "2",
    italic: "3",
    underline: "4",
    blinking: "5",
    flashing: "5",
    inverse: "7",
    reverse: "7",
    invisible: "8"
};
export function Color(name, bright = false) {
    return ("\u001B[" + ColorList[name] + (bright ? ";1m" : "m"));
}
export default class Console {
    constructor(logger) {
        this.console = logger || console;
    }
    log(message, options = {}) {
        if (!Array.isArray(message))
            message = [message];
        let prefix = `${Color("reset")}LOG   ❱`
            .concat(options.location ? ` ${options.location}` : "")
            .concat(options.name ? ` (${options.name})` : "")
            .concat((options.location || options.name) ? " ❱" : "")
            .concat(" ", Color("reset"));
        let shortPrefix = `${Color("reset")}      ❱ ${Color("reset")}`;
        this.console.log(prefix + (options.tagOnNewLine ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
        return this;
    }
    error(message, options = {}) {
        if (!Array.isArray(message))
            message = [message];
        let prefix = `${Color("reset") + Color("red", true)}ERROR ❱`
            .concat(options.location ? ` ${options.location}` : "")
            .concat(options.name ? ` (${options.name})` : "")
            .concat((options.location || options.name) ? " ❱" : "")
            .concat(" ", Color("reset"));
        let shortPrefix = `${Color("reset")}${Color("red", true)}      ❱ ${Color("reset")}`;
        this.console.error(prefix + (options.tagOnNewLine ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
        return this;
    }
    info(message, options = {}) {
        if (!Array.isArray(message))
            message = [message];
        let prefix = `${Color("reset") + Color("blue")}INFO  ❱`
            .concat(options.location ? ` ${options.location}` : "")
            .concat(options.name ? ` (${options.name})` : "")
            .concat((options.location || options.name) ? " ❱" : "")
            .concat(" ", Color("reset"));
        let shortPrefix = `${Color("reset")}${Color("blue")}      ❱ ${Color("reset")}`;
        this.console.info(prefix + (options.tagOnNewLine ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
        return this;
    }
    warn(message, options = {}) {
        if (!Array.isArray(message))
            message = [message];
        let prefix = `${Color("reset") + Color("yellow")}WARN  ❱`
            .concat(options.location ? ` ${options.location}` : "")
            .concat(options.name ? ` (${options.name})` : "")
            .concat((options.location || options.name) ? " ❱" : "")
            .concat(" ", Color("reset"));
        let shortPrefix = `${Color("reset")}${Color("yellow")}      ❱ ${Color("reset")}`;
        this.console.warn(prefix + (options.tagOnNewLine ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
        return this;
    }
}
function parseInput(input) {
    let output = [];
    input.forEach(message => {
        if (typeof message === "string")
            return output.push(message);
        output.push(inspect(message, { colors: true }));
    });
    return (output.join(" ")).split("\n");
}
