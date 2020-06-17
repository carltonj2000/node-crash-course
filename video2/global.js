setTimeout(() => console.log("in the timeout\n", global), 1000);

const int = setInterval(() => {
  console.log("hi");
}, 1000);

setTimeout(() => clearInterval(int), 5000);

console.log(__dirname);
console.log(__filename);
