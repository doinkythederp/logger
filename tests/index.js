import { Console, Color } from "../src/index.js";
var options;
// Vanilla
console.log("\nVanilla:");

console.info("info!");
console.error("error!");
console.log("log!");
console.warn("warning!");

// No location/name
console.log("\nStandard:");

new Console()
	.info("info!")
	.error("error!")
	.log("log!")
	.warn("warning!");

// With location
console.log("\nLocations:")

options = {
	location: "test/test.js"
}
new Console()
	.info("info!", options)
	.error("error!", options)
	.log("log!", options)
	.warn("warning!", options);

// With nickname
console.log("\nNicknames:")

options = {
	name: "test"
}
new Console()
	.info("info!", options)
	.error("error!", options)
	.log("log!", options)
	.warn("warning!", options);

// With nickname and location
console.log("\nNicknames & Locations:")

options = {
	name: "test",
	location: "test/test.js"
}
new Console()
	.info("info!", options)
	.error("error!", options)
	.log("log!", options)
	.warn("warning!", options);

// Objects
console.log("\nObjects:")

new Console()
	.info({ isInfo: true, message: "info!"})
	.error(new Error("Something went wrong!"))
	.log({ isInfo: false, message: "log!"})
	.warn([["incorrect", "try again"]]);