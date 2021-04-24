// @ts-check
/**
 * @module @doinkthederp/logger
 */

 const { inspect } = require('util');
 
 module.exports = class Logger {
     constructor(options = {}) {
         this.console = options.console || globalThis.console;
         this.options = options;
     }
     options;
 
     console;
 
     log(message, options = {}) {
         options = applyDefaults(options, this.options);
         if (!Array.isArray(message)) message = [message];
 
         let prefix = `${Logger.Color("reset")}LOG   ❱`
         .concat(options.location ? ` ${options.location}` : "")
         .concat(options.name ? ` (${options.name})` : "")
         .concat((options.location || options.name) ? " ❱" : "")
         .concat(" ", Logger.Color("reset"));
 
         let shortPrefix = `${Logger.Color("reset")}      ❱ ${Logger.Color("reset")}`;
 
         this.console.log(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
 
         return this;
 
     }
 
     error(message, options = {}) {
         options = applyDefaults(options, this.options);
         if (!Array.isArray(message)) message = [message];
 
         let prefix = `${Logger.Color("reset") + Logger.Color("red", true)}ERROR ❱`
         .concat(options.location ? ` ${options.location}` : "")
         .concat(options.name ? ` (${options.name})` : "")
         .concat((options.location || options.name) ? " ❱" : "")
         .concat(" ", Logger.Color("reset"));
 
         let shortPrefix = `${Logger.Color("reset")}${Logger.Color("red", true)}      ❱ ${Logger.Color("reset")}`;
 
         this.console.error(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
 
         return this;
 
     }
 
     info(message, options = {}) {
         options = applyDefaults(options, this.options);
         if (!Array.isArray(message)) message = [message];
 
         let prefix = `${Logger.Color("reset") + Logger.Color("black", true)}INFO  ❱`
             .concat(options.location ? ` ${options.location}` : "")
             .concat(options.name ? ` (${options.name})` : "")
             .concat((options.location || options.name) ? " ❱" : "")
             .concat(" ", Logger.Color("reset"));
 
         let shortPrefix = `${Logger.Color("reset")}${Logger.Color("black", true)}      ❱ ${Logger.Color("reset")}`;
 
         this.console.info(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
 
         return this;
 
     }
 
     warn(message, options = {}) {
         options = applyDefaults(options, this.options);
         if (!Array.isArray(message)) message = [message];
 
         let prefix = `${Logger.Color("reset") + Logger.Color("yellow")}WARN  ❱`
         .concat(options.location ? ` ${options.location}` : "")
         .concat(options.name ? ` (${options.name})` : "")
         .concat((options.location || options.name) ? " ❱" : "")
         .concat(" ", Logger.Color("reset"));
 
         let shortPrefix = `${Logger.Color("reset")}${Logger.Color("yellow")}      ❱ ${Logger.Color("reset")}`;
 
         this.console.warn(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));
 
         return this;
 
     }

    static Color(name, bright = false) {
        return ("\u001B[" + Logger.ColorList[name] + (bright ? ";1m" : "m"));
     }

    static ColorList = {
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
        dim: "2", // same as faint
        italic: "3",
        underline: "4",
        blinking: "5",
        flashing: "5", // same as blinking
        inverse: "7",
        reverse: "7", // same as inverse
        invisible: "8"
    }
 }
 
 /**
  * Parses an array of anything to an array of strings
  * @param {any[]} input The inputs to parse to strings
  * @returns string[]
  */
 function parseInput(input) {
     /** @type {string[]} */
     let output = [];
 
     input.forEach(message => {
         if (typeof message === "string") return output.push(message);
         output.push(inspect(message, { colors: true }));
     });
 
     return (output.join(" ")).split("\n");
 }
 
 /**
  * Takes an object and defaults and parses them
  * @param {object} target
  * @param {object} defaults
  */
 function applyDefaults(target, defaults) {
     return Object.assign(defaults, target);
 }