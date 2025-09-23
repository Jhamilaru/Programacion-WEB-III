function mayorMenor(arr) {
    return {
        mayor: Math.max(...arr),
        menor: Math.min(...arr)
    };
}

let obj4 = mayorMenor([3,1,5,4,2]);
console.log(obj4); // { mayor: 5, menor: 1 }
