/**
 * @module @doinkthederp/logger
 */

import { parse } from 'node:path';
import { inspect } from 'util';

/**
 * @typedef LogOptions
 */
export interface LogOptions {
	location?: string,
	name?: string,
	doMultiline?: boolean,
	console?: ConsoleLike
}

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
	dim: "2", // same as faint
	italic: "3",
	underline: "4",
	blinking: "5",
	flashing: "5", // same as blinking
	inverse: "7",
	reverse: "7", // same as inverse
	invisible: "8"
}

export function Color(name: string, bright: boolean = false) {
	return ("\u001B[" + ColorList[name] + (bright ? ";1m" : "m"));
}

export interface ConsoleLike {
	log(message: any, ...optionalParams: any[]): void,
	info(message: any, ...optionalParams: any[]): void,
	warn(message: any, ...optionalParams: any[]): void,
	error(message: any, ...optionalParams: any[]): void
}

export default class Logger {
	constructor(options: LogOptions) {
		this.console = options.console || globalThis.console;
		this.options = options;
	}
	/**
	 * The options this was instantiated with
	 */
	options: LogOptions

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
	log(message: any | any[], options: LogOptions = {}): this {
		options = applyDefaults(options, this.options);
		if (!Array.isArray(message)) message = [message];

		let prefix = `${Color("reset")}LOG   ❱`
		.concat(options.location ? ` ${options.location}` : "")
		.concat(options.name ? ` (${options.name})` : "")
		.concat((options.location || options.name) ? " ❱" : "")
		.concat(" ", Color("reset"));

		let shortPrefix = `${Color("reset")}      ❱ ${Color("reset")}`;

		this.console.log(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));

		return this;

	}

	/**
	 * Log an error to the console
	 * @param {any | any[]} message - What should be logged to the console
	 * @param {LogOptions} options - The options for this log
	 * @example
	 * error(new Error("Oops!"))
	 */
	error(message: any | any[], options: LogOptions = {}): this {
		options = applyDefaults(options, this.options);
		if (!Array.isArray(message)) message = [message];

		let prefix = `${Color("reset") + Color("red", true)}ERROR ❱`
		.concat(options.location ? ` ${options.location}` : "")
		.concat(options.name ? ` (${options.name})` : "")
		.concat((options.location || options.name) ? " ❱" : "")
		.concat(" ", Color("reset"));

		let shortPrefix = `${Color("reset")}${Color("red", true)}      ❱ ${Color("reset")}`;

		this.console.error(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));

		return this;

	}

	/**
	 * Log non-essential information to the console
	 * @param {any | any[]} message - What should be logged to the console
	 * @param {LogOptions} options - The options for this log
	 * @example
	 * info("There are 12 players connected")
	 */
	info(message: any | any[], options: LogOptions = {}): this {
		options = applyDefaults(options, this.options);
		if (!Array.isArray(message)) message = [message];

		let prefix = `${Color("reset") + Color("blue")}INFO  ❱`
			.concat(options.location ? ` ${options.location}` : "")
			.concat(options.name ? ` (${options.name})` : "")
			.concat((options.location || options.name) ? " ❱" : "")
			.concat(" ", Color("reset"));

		let shortPrefix = `${Color("reset")}${Color("blue")}      ❱ ${Color("reset")}`;

		this.console.info(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));

		return this;

	}

	/**
	 * Log a non-critical error or warning to the console
	 * @param {any | any[]} message - What should be logged to the console
	 * @param {LogOptions} options - The options for this log
	 * @example
	 * warn("Please update to the latest version")
	 */
	warn(message: any | any[], options: LogOptions = {}): this {
		options = applyDefaults(options, this.options);
		if (!Array.isArray(message)) message = [message];

		let prefix = `${Color("reset") + Color("yellow")}WARN  ❱`
		.concat(options.location ? ` ${options.location}` : "")
		.concat(options.name ? ` (${options.name})` : "")
		.concat((options.location || options.name) ? " ❱" : "")
		.concat(" ", Color("reset"));

		let shortPrefix = `${Color("reset")}${Color("yellow")}      ❱ ${Color("reset")}`;

		this.console.warn(prefix + (options.doMultiline ? parseInput(message).join("\n" + shortPrefix) : parseInput(message).join("\n")));

		return this;

	}
}

function parseInput(input: any[]) {
	let output: string[] = [];

	input.forEach(message => {
		if (typeof message === "string") return output.push(message);
		output.push(inspect(message, { colors: true }));
	});

	return (output.join(" ")).split("\n");
}

function applyDefaults(target, defaults) {
	return Object.assign(defaults, target);
}