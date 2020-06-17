const xyz = require("./people");

console.log(xyz);
console.log(xyz.people);
console.log(xyz.ages);

const { people } = xyz;

console.log(people);

const os = require("os");

console.log(os.platform(), os.homedir());
