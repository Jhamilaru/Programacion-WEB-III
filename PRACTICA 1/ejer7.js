let numeros = [5, 6, 7, 8, 9];

let [a, b, ...resto] = numeros;

console.log("Primero:", a);   // 5
console.log("Segundo:", b);  // 6
console.log("Resto:", resto); // [7,8,9]

